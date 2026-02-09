import { useReadQuery } from "@apollo/client/react";
import type { Route } from "~/routes/+types/candidates";
import { useLoaderData } from "react-router";
import { GET_CANDIDATES_FULL } from "../services";
import { apolloLoader } from "~/lib/api";

// Route loader that preloads the query 
export const candidatesLoader =
    apolloLoader<Route.LoaderArgs>()(({ preloadQuery }) => {
        const candidatesRef = preloadQuery(GET_CANDIDATES_FULL);
        return { candidatesRef };
    });

// Hook used inside React components
export function useCandidates() {
    const { candidatesRef } = useLoaderData<typeof candidatesLoader>();
    const { data, error } = useReadQuery(candidatesRef);

    return { data, error };
}