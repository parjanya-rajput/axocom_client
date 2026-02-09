import { HttpLink, InMemoryCache } from "@apollo/client";
import {
    ApolloClient,
    createApolloLoaderHandler,
} from "@apollo/client-integration-react-router";
import { GRAPHQL_ENDPOINT } from "~/types/constant";

/**
 * Creates an Apollo Client instance.
 *
 * IMPORTANT: ApolloClient is imported from @apollo/client-integration-react-router,
 * NOT from @apollo/client, to ensure proper SSR hydration.
 *
 * @param request - Available on the server during SSR/loaders, undefined in the browser
 */
export const makeClient = (request?: Request) => {
    const httpLink = new HttpLink({
        uri: GRAPHQL_ENDPOINT,
        // If using HttpOnly cookies for auth (preferred):
        // credentials: "include",
    });

    return new ApolloClient({
        cache: new InMemoryCache({
            typePolicies: {
                Query: {
                    fields: {
                        // Add field-level cache policies as needed
                        // e.g., pagination for candidates, voters, etc.
                    },
                },
                // Configure keyFields for types that don't use standard `id`
                // All your backend types use `id: Int!` so defaults should work
            },
        }),
        link: httpLink,
    });
};
export const apolloLoader = createApolloLoaderHandler(makeClient);
