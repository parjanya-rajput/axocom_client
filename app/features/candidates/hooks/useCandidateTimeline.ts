import { useCallback, useEffect, useMemo, useState } from "react";
import { useLazyQuery } from "@apollo/client/react";
import { GET_CANDIDATE_ELECTIONS } from "../services";
import type { ElectionCandidateEntry } from "../types";

export function useCandidateTimeline(candidateId: number | null) {
    const [fetchElections, { data, loading }] = useLazyQuery(GET_CANDIDATE_ELECTIONS);
    const [selectedYear, setSelectedYear] = useState<number | null>(null);

    const loadTimeline = useCallback(
        (id: number) => {
            fetchElections({ variables: { candidate_id: id } });
        },
        [fetchElections]
    );

    // Trigger fetch when candidateId is available
    useEffect(() => {
        if (candidateId) {
            loadTimeline(candidateId);
        }
    }, [candidateId, loadTimeline]);

    const entries: ElectionCandidateEntry[] = useMemo(() => {
        return data?.candidate_elections ?? [];
    }, [data]);

    // Available years sorted descending
    const availableYears: number[] = useMemo(() => {
        return [...new Set(entries.map((e) => e.year))].sort((a, b) => b - a);
    }, [entries]);

    // Auto-select the latest year when data arrives
    useEffect(() => {
        if (availableYears.length > 0 && selectedYear === null) {
            setSelectedYear(availableYears[0]);
        }
    }, [availableYears, selectedYear]);

    // The election_candidate entry for the selected year
    const selectedEntry: ElectionCandidateEntry | null = useMemo(() => {
        if (!selectedYear) return null;
        return entries.find((e) => e.year === selectedYear) ?? null;
    }, [entries, selectedYear]);

    return {
        availableYears,
        selectedYear,
        setSelectedYear,
        selectedEntry,
        loading,
        entries,
    };
}