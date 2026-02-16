import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { GRAPHQL_ENDPOINT } from "~/types/constant";

export const apolloClient = new ApolloClient({
    link: new HttpLink({
        uri: GRAPHQL_ENDPOINT,
    }),
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    // Add field-level cache policies as needed
                    // e.g., pagination for candidates, voters, etc.
                },
            },
        },
    }),
});