// @BinaryBitBytes [https://dmitripavlutin.com/ecmascript-modules-dynamic-import/] //!<----Source---
import * as GQL from "graphql-tag";
const express = await import("express");
export default express;
//gql //!Known
const { gql } = GQL;
export { gql };
//apollo-server //!Known
const { apolloServer } = await import("apollo-server");
export { apolloServer };
//apollo-server-express //!Known
const { apolloServerExpress } = await import("apollo-server-express");
export { apolloServerExpress };
