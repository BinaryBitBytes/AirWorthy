// We'll only fetch the `ListIteratee` type from the `@types/lodash`, but get
// `sortBy` from the modularized version of the package to avoid bringing in
// all of `lodash`.
import { visit, } from "graphql";
import sortBy from "lodash.sortby";
// sortAST sorts most multi-child nodes alphabetically. Using this as part of
// your signature calculation function may make it easier to tell the difference
// between queries that are similar to each other, and if for some reason your
// GraphQL client generates query strings with elements in nondeterministic
// order, it can make sure the queries are treated as identical.
export function sortAST(ast) {
    return visit(ast, {
        Document(node) {
            return {
                ...node,
                // The sort on "kind" places fragments before operations within the document
                definitions: sortBy(node.definitions, "kind", "name.value"),
            };
        },
        OperationDefinition(node) {
            return sortVariableDefinitions(node);
        },
        SelectionSet(node) {
            return {
                ...node,
                // Define an ordering for field names in a SelectionSet.  Field first,
                // then FragmentSpread, then InlineFragment.  By a lovely coincidence,
                // the order we want them to appear in is alphabetical by node.kind.
                // Use sortBy instead of sorted because 'selections' is not optional.
                selections: sortBy(node.selections, "kind", "name.value"),
            };
        },
        Field(node) {
            return sortArguments(node);
        },
        FragmentSpread(node) {
            return sortDirectives(node);
        },
        InlineFragment(node) {
            return sortDirectives(node);
        },
        FragmentDefinition(node) {
            return sortDirectives(sortVariableDefinitions(node));
        },
        Directive(node) {
            return sortArguments(node);
        },
    });
}
function sortDirectives(node) {
    return "directives" in node
        ? { ...node, directives: sortBy(node.directives, "name.value") }
        : node;
}
function sortArguments(node) {
    return "arguments" in node
        ? { ...node, arguments: sortBy(node.arguments, "name.value") }
        : node;
}
function sortVariableDefinitions(node) {
    return "variableDefinitions" in node
        ? {
            ...node,
            variableDefinitions: sortBy(node.variableDefinitions, "variable.name.value"),
        }
        : node;
}
