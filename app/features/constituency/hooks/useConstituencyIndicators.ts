import { useMemo } from "react";
import { useLazyQuery } from "@apollo/client/react";
import { GET_CONSTITUENCY_RESULTS } from "../services";
import type { ElectionCandidateDetail } from "../types";
import type { IndicatorProps } from "~/components/ui/indicator";
import type { SmallPartyCardProps } from "~/components/ui/small-party-card";

// Party color mappings
const PARTY_COLORS: Record<string, { bg: string; label: string; value: string }> = {
    BJP: { bg: "bg-[#fff7ed] border border-orange-100", label: "text-orange-800", value: "text-orange-600" },
    INC: { bg: "bg-[#eff6ff] border border-blue-100", label: "text-blue-800", value: "text-blue-600" },
    AAP: { bg: "bg-[#f0fdf4] border border-green-100", label: "text-green-800", value: "text-green-600" },
    JDS: { bg: "bg-[#f0fdf4] border border-green-100", label: "text-green-800", value: "text-green-600" },
    BSP: { bg: "bg-[#faf5ff] border border-purple-100", label: "text-purple-800", value: "text-purple-600" },
    SP: { bg: "bg-[#fef2f2] border border-red-100", label: "text-red-800", value: "text-red-600" },
};

const DEFAULT_PARTY_STYLE = { bg: "bg-gray-50 border border-gray-200", label: "text-gray-800", value: "text-gray-600" };

function getPartyStyle(shortName: string) {
    const upper = shortName.toUpperCase();
    for (const [key, style] of Object.entries(PARTY_COLORS)) {
        if (upper.includes(key)) return style;
    }
    return DEFAULT_PARTY_STYLE;
}

function formatNumber(n: number): string {
    return n.toLocaleString("en-IN");
}

export function useConstituencyIndicators(
    rawCandidatesData: ElectionCandidateDetail[]
) {
    const [fetchResults, { data: resultsData }] = useLazyQuery(
        GET_CONSTITUENCY_RESULTS
    );

    // ── Political Quality Indicators (from candidates data) ─────
    const indicators = useMemo((): IndicatorProps[] => {
        if (!rawCandidatesData.length) return [];

        const total = rawCandidatesData.length;

        // Criminal cases rate
        const withCases = rawCandidatesData.filter(
            (ec) => ec.criminal_cases && ec.criminal_cases > 0
        ).length;
        const criminalPct = Math.round((withCases / total) * 100);

        // Education: candidates with some education listed
        const educated = rawCandidatesData.filter(
            (ec) => ec.candidate.education_category &&
                ec.candidate.education_category !== "N/A" &&
                ec.candidate.education_category !== "Not Given" &&
                ec.candidate.education_category !== "Illiterate"
        ).length;
        const educationPct = Math.round((educated / total) * 100);

        // Average assets (in crores)
        const assetsSum = rawCandidatesData.reduce(
            (sum, ec) => sum + ec.assets, 0
        );
        const avgAssets = assetsSum / total;
        // Normalize to 0-100 for the bar (cap at 50Cr = 100%)
        const assetsPct = Math.min(Math.round((avgAssets / 5_00_00_000) * 100), 100);

        return [
            {
                label: "Criminal Cases",
                value: `${criminalPct}% (${withCases}/${total})`,
                sub: `${withCases} candidates with criminal cases`,
                color: criminalPct > 30 ? "bg-red-500" : criminalPct > 15 ? "bg-yellow-500" : "bg-green-500",
                percent: criminalPct,
                valueColorClassName: criminalPct > 30 ? "text-red-600" : criminalPct > 15 ? "text-yellow-600" : "text-green-600",
            },
            {
                label: "Education Level",
                value: `${educationPct}% Educated`,
                sub: `${educated} of ${total} candidates have formal education`,
                color: educationPct > 70 ? "bg-green-500" : educationPct > 40 ? "bg-blue-600" : "bg-yellow-500",
                percent: educationPct,
                valueColorClassName: educationPct > 70 ? "text-green-600" : educationPct > 40 ? "text-blue-600" : "text-yellow-600",
            },
            {
                label: "Avg. Candidate Assets",
                value: `₹${(avgAssets / 1_00_00_000).toFixed(1)} Cr`,
                sub: `Average across ${total} candidates`,
                color: "bg-blue-600",
                percent: assetsPct,
                valueColorClassName: "text-blue-600",
            },
        ];
    }, [rawCandidatesData]);

    // ── Historical Control (from election results) ──────────────
    const results = resultsData?.constituency_results ?? [];
    const winner = results.find((r) => r.position === 1) ?? null;
    const runnerUp = results.find((r) => r.position === 2) ?? null;

    const historicalControl = useMemo((): SmallPartyCardProps[] => {
        if (!winner) return [];

        const winnerStyle = getPartyStyle(
            winner.election_candidate.party.short_name || winner.election_candidate.party.name
        );
        const winnerPartyName = winner.election_candidate.party.short_name || winner.election_candidate.party.name;

        const cards: SmallPartyCardProps[] = [
            {
                label: "Winning Party",
                value: winnerPartyName,
                subtitle: `${formatNumber(winner.votes_polled)} votes`,
                containerClassName: winnerStyle.bg,
                labelColorClassName: winnerStyle.label,
                valueColorClassName: winnerStyle.value,
            },
        ];

        if (runnerUp) {
            const runnerStyle = getPartyStyle(
                runnerUp.election_candidate.party.short_name || runnerUp.election_candidate.party.name
            );
            const runnerPartyName = runnerUp.election_candidate.party.short_name || runnerUp.election_candidate.party.name;
            const margin = winner.votes_polled - runnerUp.votes_polled;

            cards.push({
                label: "Runner Up",
                value: runnerPartyName,
                subtitle: `Margin: ${formatNumber(margin)} votes`,
                containerClassName: runnerStyle.bg,
                labelColorClassName: runnerStyle.label,
                valueColorClassName: runnerStyle.value,
            });
        }

        return cards;
    }, [results]);

    const incumbent = useMemo(() => {
        if (!winner) {
            return {
                roleLabel: "Incumbent",
                name: "—",
                party: "—",
                avatarUrl: undefined as string | undefined,
                badgeText: undefined as string | undefined,
            };
        }

        const margin = runnerUp
            ? ((winner.votes_polled - runnerUp.votes_polled) / winner.votes_polled * 100).toFixed(1)
            : null;

        return {
            roleLabel: "Incumbent Winner",
            name: winner.election_candidate.candidate.name,
            party: winner.election_candidate.party.name,
            avatarUrl: winner.election_candidate.candidate.candidate_image ?? undefined,
            badgeText: margin ? `Won by ${margin}%` : `${formatNumber(winner.votes_polled)} votes`,
        };
    }, [results]);

    // Expose loader for triggering from the page
    const loadResults = (constituencyId: number, electionYear: number) => {
        fetchResults({
            variables: { constituencyId, electionYear },
        });
    };

    return { indicators, historicalControl, incumbent, loadResults };
}