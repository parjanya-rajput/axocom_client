import { useMemo } from "react";
import type { FinancialSummaryData, ElectionCandidateEntry } from "../types";
import { formatCurrency } from "../utils/formatCurrency";

/**
 * Business logic hook that transforms raw candidate data into financial summary format
 * for the FinancialSummary component.
 * 
 * @param candidate - Raw candidate data from useCandidatesProfile
 * @returns Formatted financial summary data (assets, liabilities, net worth)
 */
export function useFinancialSummary(
    entry: ElectionCandidateEntry | null | undefined
): FinancialSummaryData {
    return useMemo(() => {
        if (!entry) {
            return {
                assets: { value: "₹0" },
                liabilities: { value: "₹0" },
                netWorth: { value: "₹0" },
            };
        }

        const assets = entry.assets ?? 0;
        const liabilities = entry.liabilities ?? 0;
        const netWorthValue = assets - liabilities;

        return {
            assets: { value: formatCurrency(assets) },
            liabilities: { value: formatCurrency(liabilities) },
            netWorth: {
                value: formatCurrency(netWorthValue),
                affidavitLabel: `${entry.year} AFFIDAVIT`,
            },
        };
    }, [entry]);
}