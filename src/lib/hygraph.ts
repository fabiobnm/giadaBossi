import { GraphQLClient } from "graphql-request";

const endpoint = process.env.HYGRAPH_ENDPOINT;

if (!endpoint || !endpoint.startsWith("http")) {
  throw new Error(
    `HYGRAPH_ENDPOINT non valida: ${
      endpoint === undefined ? "undefined" : endpoint
    }`
  );
}

export const hygraph = new GraphQLClient(endpoint);