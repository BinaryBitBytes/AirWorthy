import { visit } from "graphql";
// Hide sensitive string and numeric literals. Optionally hide list and object literals with the option `hideListAndObjectLiterals: true`.
export function stripSensitiveLiterals(ast, options = {
    hideListAndObjectLiterals: false,
}) {
    const listAndObjectVisitorIfEnabled = options.hideListAndObjectLiterals
        ? {
            ListValue(node) {
                return { ...node, values: [] };
            },
            ObjectValue(node) {
                return { ...node, fields: [] };
            },
        }
        : {};
    return visit(ast, {
        IntValue(node) {
            return { ...node, value: "0" };
        },
        FloatValue(node) {
            return { ...node, value: "0" };
        },
        StringValue(node) {
            return { ...node, value: "", block: false };
        },
        ...listAndObjectVisitorIfEnabled,
    });
}
