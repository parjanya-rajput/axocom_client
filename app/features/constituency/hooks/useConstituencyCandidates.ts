import { useMemo } from "react";
import { useLazyQuery } from "@apollo/client/react";
import { GET_CONSTITUENCY_CANDIDATES } from "../services";
import type { CandidateRowData } from "../types";

// Simple party → color mapping (extend as needed)
const PARTY_COLORS: Record<string, string> = {
    BJP: "orange",
    INC: "blue",
    AAP: "teal",
    JDS: "green",
    BSP: "purple",
    TMC: "green",
    SP: "red",
};

function getPartyColor(partyName: string): string {
    // Check short_name or full name against known parties
    const upper = partyName.toUpperCase();
    for (const [key, color] of Object.entries(PARTY_COLORS)) {
        if (upper.includes(key)) return color;
    }
    return "blue"; // default
}


export function useConstituencyCandidates(totalVoters: number | undefined) {
    const [fetchCandidates, { data: candidatesData, loading }] = useLazyQuery(
        GET_CONSTITUENCY_CANDIDATES
    );

    // Transform raw GraphQL data into CandidateRow-friendly shape
    const candidates: CandidateRowData[] = useMemo(() => {
        if (!candidatesData?.constituency_candidates) return [];

        return candidatesData.constituency_candidates.map((ec) => ({
            id: ec.id,
            name: ec.candidate.name,
            party: ec.party.short_name || ec.party.name,
            partyShortName: ec.party.short_name,
            education: ec.candidate.education_category ?? "N/A",
            votes_polled: ec.votes_polled,
            projectedShare: totalVoters ? `${(ec.votes_polled / totalVoters * 100).toFixed(2)}%` : "—",
            partyColor: getPartyColor(ec.party.short_name || ec.party.name),
            imageUrl: ec.candidate.candidate_image ?? undefined,
        }));
    }, [candidatesData, totalVoters]);

    const totalCandidates = candidates.length;

    // Exposed so other hooks/components can trigger the fetch
    const loadCandidates = (constituencyId: number, electionYear: number) => {
        fetchCandidates({
            variables: { constituencyId, electionYear },
        });
    };

    return {
        candidates,
        totalCandidates,
        loadCandidates,
        candidatesLoading: loading,
        // Expose raw data for other hooks that need it
        rawCandidatesData: candidatesData?.constituency_candidates ?? [],
    };
}