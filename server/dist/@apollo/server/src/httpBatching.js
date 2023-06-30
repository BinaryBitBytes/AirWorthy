import { newHTTPGraphQLHead, runHttpQuery } from './runHttpQuery.js';
import { BadRequestError } from './internalErrorClasses.js';
async function runBatchedHttpQuery({ server, batchRequest, body, contextValue, schemaDerivedData, internals, }) {
    if (body.length === 0) {
        throw new BadRequestError('No operations found in request.');
    }
    // This single HTTPGraphQLHead is shared across all the operations in the
    // batch. This means that any changes to response headers or status code from
    // one operation can be immediately seen by other operations. Plugins that set
    // response headers or status code can then choose to combine the data they
    // are setting with data that may already be there from another operation as
    // they choose.
    const sharedResponseHTTPGraphQLHead = newHTTPGraphQLHead();
    const responseBodies = await Promise.all(body.map(async (bodyPiece) => {
        const singleRequest = {
            ...batchRequest,
            body: bodyPiece,
        };
        const response = await runHttpQuery({
            server,
            httpRequest: singleRequest,
            contextValue,
            schemaDerivedData,
            internals,
            sharedResponseHTTPGraphQLHead,
        });
        if (response.body.kind === 'chunked') {
            throw Error('Incremental delivery is not implemented for batch requests');
        }
        return response.body.string;
    }));
    return {
        ...sharedResponseHTTPGraphQLHead,
        body: { kind: 'complete', string: `[${responseBodies.join(',')}]` },
    };
}
export async function runPotentiallyBatchedHttpQuery(server, httpGraphQLRequest, contextValue, schemaDerivedData, internals) {
    if (!(httpGraphQLRequest.method === 'POST' &&
        Array.isArray(httpGraphQLRequest.body))) {
        return await runHttpQuery({
            server,
            httpRequest: httpGraphQLRequest,
            contextValue,
            schemaDerivedData,
            internals,
            sharedResponseHTTPGraphQLHead: null,
        });
    }
    if (internals.allowBatchedHttpRequests) {
        return await runBatchedHttpQuery({
            server,
            batchRequest: httpGraphQLRequest,
            body: httpGraphQLRequest.body,
            contextValue,
            schemaDerivedData,
            internals,
        });
    }
    throw new BadRequestError('Operation batching disabled.');
}
