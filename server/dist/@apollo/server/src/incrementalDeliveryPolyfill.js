import { execute, } from 'graphql';
// This starts as undefined and is set to a function or null by running
// tryToLoadGraphQL17(). If graphql-js 17 is installed, it is set to the
// experimentalExecuteIncrementally function from that package; otherwise it is
// set to null.
let graphqlExperimentalExecuteIncrementally = undefined;
async function tryToLoadGraphQL17() {
    if (graphqlExperimentalExecuteIncrementally !== undefined) {
        return;
    }
    const graphql = await import('graphql');
    if ('experimentalExecuteIncrementally' in graphql) {
        graphqlExperimentalExecuteIncrementally = graphql
            .experimentalExecuteIncrementally;
    }
    else {
        graphqlExperimentalExecuteIncrementally = null;
    }
}
export async function executeIncrementally(args) {
    await tryToLoadGraphQL17();
    if (graphqlExperimentalExecuteIncrementally) {
        return graphqlExperimentalExecuteIncrementally(args);
    }
    return execute(args);
}
