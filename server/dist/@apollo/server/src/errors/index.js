import { GraphQLError } from 'graphql';
export var ApolloServerErrorCode;
(function (ApolloServerErrorCode) {
    ApolloServerErrorCode["INTERNAL_SERVER_ERROR"] = "INTERNAL_SERVER_ERROR";
    ApolloServerErrorCode["GRAPHQL_PARSE_FAILED"] = "GRAPHQL_PARSE_FAILED";
    ApolloServerErrorCode["GRAPHQL_VALIDATION_FAILED"] = "GRAPHQL_VALIDATION_FAILED";
    ApolloServerErrorCode["PERSISTED_QUERY_NOT_FOUND"] = "PERSISTED_QUERY_NOT_FOUND";
    ApolloServerErrorCode["PERSISTED_QUERY_NOT_SUPPORTED"] = "PERSISTED_QUERY_NOT_SUPPORTED";
    ApolloServerErrorCode["BAD_USER_INPUT"] = "BAD_USER_INPUT";
    ApolloServerErrorCode["OPERATION_RESOLUTION_FAILURE"] = "OPERATION_RESOLUTION_FAILURE";
    ApolloServerErrorCode["BAD_REQUEST"] = "BAD_REQUEST";
})(ApolloServerErrorCode || (ApolloServerErrorCode = {}));
export var ApolloServerValidationErrorCode;
(function (ApolloServerValidationErrorCode) {
    ApolloServerValidationErrorCode["INTROSPECTION_DISABLED"] = "INTROSPECTION_DISABLED";
})(ApolloServerValidationErrorCode || (ApolloServerValidationErrorCode = {}));
/**
 * unwrapResolverError is a useful helper function for `formatError` hooks.
 * Errors thrown in resolvers are wrapped by graphql-js in a GraphQLError that
 * adds context such as the `path` to the field in the operation. If you'd like
 * to look directly at the original error thrown in the resolver (with whatever
 * data is on that error object, but without fields like `path`), you can use
 * this function. Note that other GraphQLErrors that contain `originalError`
 * (like parse errors) are not unwrapped by this function.
 */
export function unwrapResolverError(error) {
    if (error instanceof GraphQLError && error.path && error.originalError) {
        return error.originalError;
    }
    return error;
}
