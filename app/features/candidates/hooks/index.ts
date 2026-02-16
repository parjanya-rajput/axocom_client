import { useQuery } from "@apollo/client/react";
import { GET_CANDIDATES_FULL } from "../services";

// Hook used inside React components
export function useCandidates() {
    const { data, error, loading } = useQuery(GET_CANDIDATES_FULL);

    return { data, error, loading };
}