import { Kind, } from "graphql";
export function isNode(maybeNode) {
    return maybeNode && typeof maybeNode.kind === "string";
}
export function isDocumentNode(node) {
    return isNode(node) && node.kind === Kind.DOCUMENT;
}
