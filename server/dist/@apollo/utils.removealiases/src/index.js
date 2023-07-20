// removeAliases gets rid of GraphQL aliases, a feature by which you can tell a
// server to return a field's data under a different name from the field name.
// Maybe this is useful if somebody somewhere inserts random aliases into their
// queries. Note that this function makes no guarantees about the output and its
// validity as a GraphQL operation, for example:
// { x(a: 1) alias: x(a:2) } (valid) will yield
// { x(a:1) x(a:2) } (invalid)
import { visit } from "graphql";
export function removeAliases(ast) {
    return visit(ast, {
        Field(node) {
            const { alias, ...rest } = node;
            return rest;
        },
    });
}
