import { useMemo } from "react";
import type { ElectionCandidateEntry } from "../types";
import { formatCurrency } from "../utils/formatCurrency";

export interface NetWorthBar {
    year: number;
    netWorth: number;
    formattedNetWorth: string;
}

/**
 * Builds chart-ready net worth data from timeline entries (one bar per year).
 * Use with entries from useCandidateTimeline.
 */
export function useNetworthCharts(
    entries: ElectionCandidateEntry[] | null | undefined
): { bars: NetWorthBar[]; maxNetWorth: number } {
    return useMemo(() => {
        if (!entries?.length) {
            return { bars: [], maxNetWorth: 0 };
        }

        const bars: NetWorthBar[] = entries
            .map((e) => {
                const assets = e.assets ?? 0;
                const liabilities = e.liabilities ?? 0;
                const netWorth = Math.max(0, assets - liabilities);
                return {
                    year: e.year,
                    netWorth,
                    formattedNetWorth: formatCurrency(netWorth),
                };
            })
            .sort((a, b) => a.year - b.year);

        const maxNetWorth = Math.max(1, ...bars.map((b) => b.netWorth));

        return { bars, maxNetWorth };
    }, [entries]);
}