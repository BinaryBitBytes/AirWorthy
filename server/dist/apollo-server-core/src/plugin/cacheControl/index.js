import { getNamedType, isCompositeType, isInterfaceType, isObjectType, responsePathAsArray, } from 'graphql';
import { newCachePolicy } from '../../cachePolicy';
import LRUCache from 'lru-cache';
export function ApolloServerPluginCacheControl(options = Object.create(null)) {
    const typeAnnotationCache = new LRUCache();
    const fieldAnnotationCache = new LRUCache();
    function memoizedCacheAnnotationFromType(t) {
        const existing = typeAnnotationCache.get(t);
        if (existing) {
            return existing;
        }
        const annotation = cacheAnnotationFromType(t);
        typeAnnotationCache.set(t, annotation);
        return annotation;
    }
    function memoizedCacheAnnotationFromField(field) {
        const existing = fieldAnnotationCache.get(field);
        if (existing) {
            return existing;
        }
        const annotation = cacheAnnotationFromField(field);
        fieldAnnotationCache.set(field, annotation);
        return annotation;
    }
    return {
        __internal_plugin_id__() {
            return 'CacheControl';
        },
        async serverWillStart({ schema }) {
            // Set the size of the caches to be equal to the number of composite types
            // and fields in the schema respectively. This generally means that the
            // cache will always have room for all the cache hints in the active
            // schema but we won't have a memory leak as schemas are replaced in a
            // gateway. (Once we're comfortable breaking compatibility with
            // versions of Gateway older than 0.35.0, we should also run this code
            // from a schemaDidLoadOrUpdate instead of serverWillStart. Using
            // schemaDidLoadOrUpdate throws when combined with old gateways.)
            typeAnnotationCache.max = Object.values(schema.getTypeMap()).filter(isCompositeType).length;
            fieldAnnotationCache.max =
                Object.values(schema.getTypeMap())
                    .filter(isObjectType)
                    .flatMap((t) => Object.values(t.getFields())).length +
                    Object.values(schema.getTypeMap())
                        .filter(isInterfaceType)
                        .flatMap((t) => Object.values(t.getFields())).length;
            return undefined;
        },
        async requestDidStart(requestContext) {
            const defaultMaxAge = options.defaultMaxAge ?? 0;
            const calculateHttpHeaders = options.calculateHttpHeaders ?? true;
            const { __testing__cacheHints } = options;
            return {
                async executionDidStart() {
                    // Did something set the overall cache policy before we've even
                    // started? If so, consider that as an override and don't touch it.
                    // Just put set up fake `info.cacheControl` objects and otherwise
                    // don't track cache policy.
                    //
                    // (This doesn't happen in practice using the core plugins: the main
                    // use case for restricting overallCachePolicy outside of this plugin
                    // is apollo-server-plugin-response-cache, but when it sets the policy
                    // we never get to execution at all.)
                    if (isRestricted(requestContext.overallCachePolicy)) {
                        // This is "fake" in the sense that it never actually affects
                        // requestContext.overallCachePolicy.
                        const fakeFieldPolicy = newCachePolicy();
                        return {
                            willResolveField({ info }) {
                                info.cacheControl = {
                                    setCacheHint: (dynamicHint) => {
                                        fakeFieldPolicy.replace(dynamicHint);
                                    },
                                    cacheHint: fakeFieldPolicy,
                                    cacheHintFromType: memoizedCacheAnnotationFromType,
                                };
                            },
                        };
                    }
                    return {
                        willResolveField({ info }) {
                            const fieldPolicy = newCachePolicy();
                            let inheritMaxAge = false;
                            // If this field's resolver returns an object/interface/union
                            // (maybe wrapped in list/non-null), look for hints on that return
                            // type.
                            const targetType = getNamedType(info.returnType);
                            if (isCompositeType(targetType)) {
                                const typeAnnotation = memoizedCacheAnnotationFromType(targetType);
                                fieldPolicy.replace(typeAnnotation);
                                inheritMaxAge = !!typeAnnotation.inheritMaxAge;
                            }
                            // Look for hints on the field itself (on its parent type), taking
                            // precedence over previously calculated hints.
                            const fieldAnnotation = memoizedCacheAnnotationFromField(info.parentType.getFields()[info.fieldName]);
                            // Note that specifying `@cacheControl(inheritMaxAge: true)` on a
                            // field whose return type defines a `maxAge` gives precedence to
                            // the type's `maxAge`. (Perhaps this should be some sort of
                            // error.)
                            if (fieldAnnotation.inheritMaxAge &&
                                fieldPolicy.maxAge === undefined) {
                                inheritMaxAge = true;
                                // Handle `@cacheControl(inheritMaxAge: true, scope: PRIVATE)`.
                                // (We ignore any specified `maxAge`; perhaps it should be some
                                // sort of error.)
                                if (fieldAnnotation.scope) {
                                    fieldPolicy.replace({ scope: fieldAnnotation.scope });
                                }
                            }
                            else {
                                fieldPolicy.replace(fieldAnnotation);
                            }
                            info.cacheControl = {
                                setCacheHint: (dynamicHint) => {
                                    fieldPolicy.replace(dynamicHint);
                                },
                                cacheHint: fieldPolicy,
                                cacheHintFromType: memoizedCacheAnnotationFromType,
                            };
                            // When the resolver is done, call restrict once. By calling
                            // restrict after the resolver instead of before, we don't need to
                            // "undo" the effect on overallCachePolicy of a static hint that
                            // gets refined by a dynamic hint.
                            return () => {
                                // If this field returns a composite type or is a root field and
                                // we haven't seen an explicit maxAge hint, set the maxAge to 0
                                // (uncached) or the default if specified in the constructor.
                                // (Non-object fields by default are assumed to inherit their
                                // cacheability from their parents. But on the other hand, while
                                // root non-object fields can get explicit hints from their
                                // definition on the Query/Mutation object, if that doesn't
                                // exist then there's no parent field that would assign the
                                // default maxAge, so we do it here.)
                                //
                                // You can disable this on a non-root field by writing
                                // `@cacheControl(inheritMaxAge: true)` on it. If you do this,
                                // then its children will be treated like root paths, since
                                // there is no parent maxAge to inherit.
                                //
                                // We do this in the end hook so that dynamic cache control
                                // prevents it from happening (eg,
                                // `info.cacheControl.cacheHint.restrict({maxAge: 60})` should
                                // work rather than doing nothing because we've already set the
                                // max age to the default of 0). This also lets resolvers assume
                                // any hint in `info.cacheControl.cacheHint` was explicitly set.
                                if (fieldPolicy.maxAge === undefined &&
                                    ((isCompositeType(targetType) && !inheritMaxAge) ||
                                        !info.path.prev)) {
                                    fieldPolicy.restrict({ maxAge: defaultMaxAge });
                                }
                                if (__testing__cacheHints && isRestricted(fieldPolicy)) {
                                    const path = responsePathAsArray(info.path).join('.');
                                    if (__testing__cacheHints.has(path)) {
                                        throw Error("shouldn't happen: addHint should only be called once per path");
                                    }
                                    __testing__cacheHints.set(path, {
                                        maxAge: fieldPolicy.maxAge,
                                        scope: fieldPolicy.scope,
                                    });
                                }
                                requestContext.overallCachePolicy.restrict(fieldPolicy);
                            };
                        },
                    };
                },
                async willSendResponse(requestContext) {
                    const { response, overallCachePolicy, requestIsBatched } = requestContext;
                    const policyIfCacheable = overallCachePolicy.policyIfCacheable();
                    // If the feature is enabled, there is a non-trivial cache policy,
                    // there are no errors, we actually can write headers, and the request
                    // is not batched (because we have no way of merging the header across
                    // operations in AS3), write the header.
                    if (calculateHttpHeaders &&
                        policyIfCacheable &&
                        !response.errors &&
                        response.http &&
                        !requestIsBatched) {
                        response.http.headers.set('Cache-Control', `max-age=${policyIfCacheable.maxAge}, ${policyIfCacheable.scope.toLowerCase()}`);
                    }
                },
            };
        },
    };
}
function cacheAnnotationFromDirectives(directives) {
    if (!directives)
        return undefined;
    const cacheControlDirective = directives.find((directive) => directive.name.value === 'cacheControl');
    if (!cacheControlDirective)
        return undefined;
    if (!cacheControlDirective.arguments)
        return undefined;
    const maxAgeArgument = cacheControlDirective.arguments.find((argument) => argument.name.value === 'maxAge');
    const scopeArgument = cacheControlDirective.arguments.find((argument) => argument.name.value === 'scope');
    const inheritMaxAgeArgument = cacheControlDirective.arguments.find((argument) => argument.name.value === 'inheritMaxAge');
    const scope = scopeArgument?.value?.kind === 'EnumValue'
        ? scopeArgument.value.value
        : undefined;
    if (inheritMaxAgeArgument?.value?.kind === 'BooleanValue' &&
        inheritMaxAgeArgument.value.value) {
        // We ignore maxAge if it is also specified.
        return { inheritMaxAge: true, scope };
    }
    return {
        maxAge: maxAgeArgument?.value?.kind === 'IntValue'
            ? parseInt(maxAgeArgument.value.value)
            : undefined,
        scope,
    };
}
function cacheAnnotationFromType(t) {
    if (t.astNode) {
        const hint = cacheAnnotationFromDirectives(t.astNode.directives);
        if (hint) {
            return hint;
        }
    }
    if (t.extensionASTNodes) {
        for (const node of t.extensionASTNodes) {
            const hint = cacheAnnotationFromDirectives(node.directives);
            if (hint) {
                return hint;
            }
        }
    }
    return {};
}
function cacheAnnotationFromField(field) {
    if (field.astNode) {
        const hint = cacheAnnotationFromDirectives(field.astNode.directives);
        if (hint) {
            return hint;
        }
    }
    return {};
}
function isRestricted(hint) {
    return hint.maxAge !== undefined || hint.scope !== undefined;
}
// This plugin does nothing, but it ensures that ApolloServer won't try
// to add a default ApolloServerPluginCacheControl.
export function ApolloServerPluginCacheControlDisabled() {
    return {
        __internal_plugin_id__() {
            return 'CacheControl';
        },
    };
}
