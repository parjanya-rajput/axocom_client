
import { useMemo } from "react";
import type { RawCandidate } from "../types";
import type { EducationRowData } from "~/components/ui/candidate-profile/education-table-row";

/** Backend shape – only used in this hook */
type RawEducationEntry = {
    degree: string;
    institution: string;
    year: string;
    status?: string;
};

export function useEducationHistory(candidate: RawCandidate | null | undefined): EducationRowData[] {
    return useMemo(() => {
        if (!candidate?.education_history) return [];

        const raw = candidate.education_history as unknown as RawEducationEntry[];

        if (!Array.isArray(raw)) return [];

        return raw.map((entry) => ({
            degree: entry?.degree ?? "—",
            institution: entry?.institution ?? "—",
            year: entry?.year ?? "—",
            ...(entry?.status != null && entry.status !== "" && { status: entry.status }),
        }));
    }, [candidate]);
}