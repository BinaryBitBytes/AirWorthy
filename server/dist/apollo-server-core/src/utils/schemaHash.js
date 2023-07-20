import { parse } from 'graphql/language';
import { execute } from 'graphql/execution';
import { getIntrospectionQuery } from 'graphql/utilities';
import stableStringify from 'fast-json-stable-stringify';
import createSHA from './createSHA';
/*
 * This function returns a not particularly stable schema hash derived from a
 * GraphQLSchema object. It works by running the `graphql-js` default
 * introspection query against the schema and taking a SHA of a JSON encoding of
 * the result. It is dependent on the precise introspection query returned by
 * `graphql-js` and some of the details of how that library returns its data, so
 * upgrading `graphql-js` can change its value. It was created for use in
 * apollo-server-plugin-operation-registry (now @apollo/server-plugin-operation-registry) * but it is no longer used there. It is *not* the same as the hash used in
 * schema and usage reporting, which is just a hash of the schema SDL document.
 *
 * For backwards-compatibility reasons, it is still calculated and passed to all
 * plugin hooks, but it is not a good idea to use it for anything.
 */
export function generateSchemaHash(schema) {
    const introspectionQuery = getIntrospectionQuery();
    const document = parse(introspectionQuery);
    const result = execute({
        schema,
        document,
    });
    // If the execution of an introspection query results in a then-able, it
    // indicates that one or more of its resolvers is behaving in an asynchronous
    // manner.  This is not the expected behavior of a introspection query
    // which does not have any asynchronous resolvers.
    if (result &&
        typeof result.then === 'function') {
        throw new Error([
            'The introspection query is resolving asynchronously; execution of an introspection query is not expected to return a `Promise`.',
            '',
            'Wrapped type resolvers should maintain the existing execution dynamics of the resolvers they wrap (i.e. async vs sync) or introspection types should be excluded from wrapping by checking them with `graphql/type`s, `isIntrospectionType` predicate function prior to wrapping.',
        ].join('\n'));
    }
    if (!result || !result.data || !result.data.__schema) {
        throw new Error('Unable to generate server introspection document.');
    }
    const introspectionSchema = result.data.__schema;
    // It's important that we perform a deterministic stringification here
    // since, depending on changes in the underlying `graphql-js` execution
    // layer, varying orders of the properties in the introspection
    const stringifiedSchema = stableStringify(introspectionSchema);
    return createSHA('sha512')
        .update(stringifiedSchema)
        .digest('hex');
}
