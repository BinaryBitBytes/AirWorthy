// This class is a helper for ApolloServerPluginUsageReporting and
// ApolloServerPluginInlineTrace.
import { GraphQLError } from 'graphql';
import { Trace, google } from 'apollo-reporting-protobuf';
function internalError(message) {
    return new Error(`[internal apollo-server error] ${message}`);
}
export class TraceTreeBuilder {
    constructor(options) {
        this.rootNode = new Trace.Node();
        this.logger = console;
        this.trace = new Trace({
            root: this.rootNode,
            // By default, each trace counts as one operation for the sake of field
            // execution counts. If we end up calling the fieldLevelInstrumentation
            // callback (once we've successfully resolved the operation) then we
            // may set this to a higher number; but we'll start it at 1 so that traces
            // that don't successfully resolve the operation (eg parse failures) or
            // where we don't call the callback because a plugin set captureTraces to
            // true have a reasonable default.
            fieldExecutionWeight: 1,
        });
        this.stopped = false;
        this.nodes = new Map([
            [responsePathAsString(), this.rootNode],
        ]);
        this.rewriteError = options.rewriteError;
        if (options.logger)
            this.logger = options.logger;
    }
    startTiming() {
        if (this.startHrTime) {
            throw internalError('startTiming called twice!');
        }
        if (this.stopped) {
            throw internalError('startTiming called after stopTiming!');
        }
        this.trace.startTime = dateToProtoTimestamp(new Date());
        this.startHrTime = process.hrtime();
    }
    stopTiming() {
        if (!this.startHrTime) {
            throw internalError('stopTiming called before startTiming!');
        }
        if (this.stopped) {
            throw internalError('stopTiming called twice!');
        }
        this.trace.durationNs = durationHrTimeToNanos(process.hrtime(this.startHrTime));
        this.trace.endTime = dateToProtoTimestamp(new Date());
        this.stopped = true;
    }
    willResolveField(info) {
        if (!this.startHrTime) {
            throw internalError('willResolveField called before startTiming!');
        }
        if (this.stopped) {
            // We've been stopped, which means execution is done... and yet we're
            // still resolving more fields? How can that be? Shouldn't we throw an
            // error or something?
            //
            // Well... we used to do exactly that. But this "shouldn't happen" error
            // showed up in practice! Turns out that graphql-js can actually continue
            // to execute more fields indefinitely long after `execute()` resolves!
            // That's because parallelism on a selection set is implemented using
            // `Promise.all`, and as soon as one of its arguments (ie, one field)
            // throws an error, the combined Promise resolves, but there's no
            // "cancellation" of the Promises that are the other arguments to
            // `Promise.all`. So the code contributing to those Promises keeps on
            // chugging away indefinitely.
            //
            // Concrete example: let’s say you have
            //
            //    { x y { ARBITRARY_SELECTION_SET } }
            //
            // where x has a non-null return type, and x and y both have resolvers
            // that return Promises. And let’s say that x returns a Promise that
            // rejects (or resolves to null). What this means is that we’re going to
            // eventually end up with `data: null` (nothing under y will actually
            // matter), but graphql-js execution will continue running whatever is
            // under ARBITRARY_SELECTION_SET without any sort of short circuiting. In
            // fact, the Promise returned from execute itself can happily resolve
            // while execution is still chugging away on an arbitrary amount of fields
            // under that ARBITRARY_SELECTION_SET. There’s no way to detect from the
            // outside "all the execution related to this operation is done", nor to
            // "short-circuit" execution so that it stops going.
            //
            // So, um. We will record any field whose execution we manage to observe
            // before we "stop" the TraceTreeBuilder (whether it is one that actually
            // ends up in the response or whether it gets thrown away due to null
            // bubbling), but if we get any more fields afterwards, we just ignore
            // them rather than throwing a confusing error.
            //
            // (That said, the error we used to throw here generally was hidden
            // anyway, for the same reason: it comes from a branch of execution that
            // ends up not being included in the response. But
            // https://github.com/graphql/graphql-js/pull/3529 means that this
            // sometimes crashed execution anyway. Our error never caught any actual
            // problematic cases, so keeping it around doesn't really help.)
            return () => { };
        }
        const path = info.path;
        const node = this.newNode(path);
        node.type = info.returnType.toString();
        node.parentType = info.parentType.toString();
        node.startTime = durationHrTimeToNanos(process.hrtime(this.startHrTime));
        if (typeof path.key === 'string' && path.key !== info.fieldName) {
            // This field was aliased; send the original field name too (for FieldStats).
            node.originalFieldName = info.fieldName;
        }
        return () => {
            node.endTime = durationHrTimeToNanos(process.hrtime(this.startHrTime));
        };
    }
    didEncounterErrors(errors) {
        errors.forEach((err) => {
            // This is an error from a federated service. We will already be reporting
            // it in the nested Trace in the query plan.
            //
            // XXX This probably shouldn't skip query or validation errors, which are
            //      not in nested Traces because format() isn't called in this case! Or
            //      maybe format() should be called in that case?
            if (err.extensions?.serviceName) {
                return;
            }
            // In terms of reporting, errors can be re-written by the user by
            // utilizing the `rewriteError` parameter.  This allows changing
            // the message or stack to remove potentially sensitive information.
            // Returning `null` will result in the error not being reported at all.
            const errorForReporting = this.rewriteAndNormalizeError(err);
            if (errorForReporting === null) {
                return;
            }
            this.addProtobufError(errorForReporting.path, errorToProtobufError(errorForReporting));
        });
    }
    addProtobufError(path, error) {
        if (!this.startHrTime) {
            throw internalError('addProtobufError called before startTiming!');
        }
        if (this.stopped) {
            throw internalError('addProtobufError called after stopTiming!');
        }
        // By default, put errors on the root node.
        let node = this.rootNode;
        // If a non-GraphQLError Error sneaks in here somehow with a non-array
        // path, don't crash.
        if (Array.isArray(path)) {
            const specificNode = this.nodes.get(path.join('.'));
            if (specificNode) {
                node = specificNode;
            }
            else {
                this.logger.warn(`Could not find node with path ${path.join('.')}; defaulting to put errors on root node.`);
            }
        }
        node.error.push(error);
    }
    newNode(path) {
        const node = new Trace.Node();
        const id = path.key;
        if (typeof id === 'number') {
            node.index = id;
        }
        else {
            node.responseName = id;
        }
        this.nodes.set(responsePathAsString(path), node);
        const parentNode = this.ensureParentNode(path);
        parentNode.child.push(node);
        return node;
    }
    ensureParentNode(path) {
        const parentPath = responsePathAsString(path.prev);
        const parentNode = this.nodes.get(parentPath);
        if (parentNode) {
            return parentNode;
        }
        // Because we set up the root path when creating this.nodes, we now know
        // that path.prev isn't undefined.
        return this.newNode(path.prev);
    }
    rewriteAndNormalizeError(err) {
        if (this.rewriteError) {
            // Before passing the error to the user-provided `rewriteError` function,
            // we'll make a shadow copy of the error so the user is free to change
            // the object as they see fit.
            // At this stage, this error is only for the purposes of reporting, but
            // this is even more important since this is still a reference to the
            // original error object and changing it would also change the error which
            // is returned in the response to the client.
            // For the clone, we'll create a new object which utilizes the exact same
            // prototype of the error being reported.
            const clonedError = Object.assign(Object.create(Object.getPrototypeOf(err)), err);
            const rewrittenError = this.rewriteError(clonedError);
            // Returning an explicit `null` means the user is requesting that the error
            // not be reported to Apollo.
            if (rewrittenError === null) {
                return null;
            }
            // We don't want users to be inadvertently not reporting errors, so if
            // they haven't returned an explicit `GraphQLError` (or `null`, handled
            // above), then we'll report the error as usual.
            if (!(rewrittenError instanceof GraphQLError)) {
                return err;
            }
            // We only allow rewriteError to change the message and extensions of the
            // error; we keep everything else the same. That way people don't have to
            // do extra work to keep the error on the same trace node. We also keep
            // extensions the same if it isn't explicitly changed (to, eg, {}). (Note
            // that many of the fields of GraphQLError are not enumerable and won't
            // show up in the trace (even in the json field) anyway.)
            return new GraphQLError(rewrittenError.message, err.nodes, err.source, err.positions, err.path, err.originalError, rewrittenError.extensions || err.extensions);
        }
        return err;
    }
}
// Converts an hrtime array (as returned from process.hrtime) to nanoseconds.
//
// ONLY CALL THIS ON VALUES REPRESENTING DELTAS, NOT ON THE RAW RETURN VALUE
// FROM process.hrtime() WITH NO ARGUMENTS.
//
// The entire point of the hrtime data structure is that the JavaScript Number
// type can't represent all int64 values without loss of precision:
// Number.MAX_SAFE_INTEGER nanoseconds is about 104 days. Calling this function
// on a duration that represents a value less than 104 days is fine. Calling
// this function on an absolute time (which is generally roughly time since
// system boot) is not a good idea.
//
// XXX We should probably use google.protobuf.Duration on the wire instead of
// ever trying to store durations in a single number.
function durationHrTimeToNanos(hrtime) {
    return hrtime[0] * 1e9 + hrtime[1];
}
// Convert from the linked-list ResponsePath format to a dot-joined
// string. Includes the full path (field names and array indices).
function responsePathAsString(p) {
    if (p === undefined) {
        return '';
    }
    // A previous implementation used `responsePathAsArray` from `graphql-js/execution`,
    // however, that employed an approach that created new arrays unnecessarily.
    let res = String(p.key);
    while ((p = p.prev) !== undefined) {
        res = `${p.key}.${res}`;
    }
    return res;
}
function errorToProtobufError(error) {
    return new Trace.Error({
        message: error.message,
        location: (error.locations || []).map(({ line, column }) => new Trace.Location({ line, column })),
        json: JSON.stringify(error),
    });
}
// Converts a JS Date into a Timestamp.
export function dateToProtoTimestamp(date) {
    const totalMillis = +date;
    const millis = totalMillis % 1000;
    return new google.protobuf.Timestamp({
        seconds: (totalMillis - millis) / 1000,
        nanos: millis * 1e6,
    });
}
