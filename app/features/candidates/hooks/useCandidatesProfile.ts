import { useLazyQuery } from "@apollo/client/react";
import { useCallback, useEffect, useMemo } from "react";
import { GET_CANDIDATE_BY_ID } from "../services";
import type { RawCandidate } from "../types";

export function useCandidatesProfile(candidateId: number) {
    const [fetchCandidate, { data, loading }] = useLazyQuery(
        GET_CANDIDATE_BY_ID
    );

    const loadCandidate = useCallback(
        (candidateId: number) => {
            fetchCandidate({ variables: { id: candidateId } });
        },
        [fetchCandidate]
    );

    useEffect(() => {
        if (candidateId) {
            loadCandidate(candidateId);
        }
    }, [candidateId, loadCandidate]);

    const candidate: RawCandidate | null = useMemo(() => {
        return data?.candidate ?? null;
    }, [data]);

    return {
        candidate,
        loading,
        loadCandidate,
        rawCandidateData: data?.candidate ?? null,
    };
}