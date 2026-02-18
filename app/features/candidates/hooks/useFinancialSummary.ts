import { useMemo } from "react";
import type { RawCandidate } from "../types";

interface FinancialSummaryData {
    assets: {
        value: string;
        sub?: string;
        subColor?: string;
    };
    liabilities: {
        value: string;
        sub?: string;
        subColor?: string;
    };
    netWorth: {
        value: string;
        affidavitLabel?: string;
    };
}

/**
 * Formats currency amount to Indian format (Cr for crores, L for lakhs)
 */
function formatCurrency(amount: number): string {
    if (!amount || amount === 0) return "₹0";

    // Format in crores if >= 1 crore
    if (amount >= 1_00_00_000) {
        return `₹${(amount / 1_00_00_000).toFixed(2)} Cr`;
    }

    // Format in lakhs if >= 1 lakh
    if (amount >= 1_00_000) {
        return `₹${(amount / 1_00_000).toFixed(2)} L`;
    }

    // Format with Indian number formatting for smaller amounts
    return `₹${amount.toLocaleString("en-IN")}`;
}

/**
 * Business logic hook that transforms raw candidate data into financial summary format
 * for the FinancialSummary component.
 * 
 * @param candidate - Raw candidate data from useCandidatesProfile
 * @returns Formatted financial summary data (assets, liabilities, net worth)
 */
export function useFinancialSummary(
    candidate: RawCandidate | null | undefined
): FinancialSummaryData {
    return useMemo(() => {
        // Default values when candidate is null/undefined
        if (!candidate) {
            return {
                assets: {
                    value: "₹0",
                },
                liabilities: {
                    value: "₹0",
                },
                netWorth: {
                    value: "₹0",
                },
            };
        }

        const assets = candidate.assets ?? 0;
        const liabilities = candidate.liabilities ?? 0;
        const netWorthValue = assets - liabilities;

        return {
            assets: {
                value: formatCurrency(assets),
                // sub and subColor can be added later if growth percentage data is available
                // e.g., sub: "+12%", subColor: "text-green-600"
            },
            liabilities: {
                value: formatCurrency(liabilities),
                // sub and subColor can be added later if needed
                // e.g., sub: "Stable", subColor: "text-slate-400"
            },
            netWorth: {
                value: formatCurrency(netWorthValue),
                // affidavitLabel can be added later if election year data is available
                // e.g., affidavitLabel: "2024 AFFIDAVIT"
            },
        };
    }, [candidate]);
}