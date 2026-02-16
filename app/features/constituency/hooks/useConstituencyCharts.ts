import { useMemo } from "react";
import { useLazyQuery } from "@apollo/client/react";
import { GET_ELECTIONS_BY_CONSTITUENCY } from "../services";
import type { ElectionDetailData } from "../types";

function formatNumber(n: number): string {
    return n.toLocaleString("en-IN");
}

export function useConstituencyCharts(
    detailData: ElectionDetailData | undefined,
    selectedConstituencyId: number | null
) {
    // Lazy query for voter trend (all years for a constituency)
    const [fetchTrend, { data: trendData }] = useLazyQuery(
        GET_ELECTIONS_BY_CONSTITUENCY
    );

    // Call this when constituency changes or on update view
    const loadTrend = (constituencyId: number) => {
        fetchTrend({ variables: { constituencyId } });
    };

    //  Trend Area Chart: total voters across years 
    const turnoutChart = useMemo(() => {
        const elections = trendData?.electionsByConstituencyId ?? [];

        // Sort by year ascending (should already be, but ensure)
        const sorted = [...elections].sort((a, b) => a.year - b.year);

        const data = sorted.map((e) => ({
            year: String(e.year),
            voters: e.total_voters,
        }));

        // Compute headline from the latest data point
        const latest = sorted[sorted.length - 1];
        const prev = sorted.length >= 2 ? sorted[sorted.length - 2] : null;

        let headlineDelta: string | undefined;
        if (latest && prev && prev.total_voters > 0) {
            const pct = ((latest.total_voters - prev.total_voters) / prev.total_voters * 100).toFixed(1);
            const sign = Number(pct) >= 0 ? "+" : "";
            headlineDelta = `${sign}${pct}%`;
        }

        return {
            title: "Voter Turnout Trend",
            subtitle: "Total registered voters across election years",
            headlineValue: latest ? formatNumber(latest.total_voters) : "—",
            headlineDelta,
            data,
            xKey: "year",
            yKey: "voters",
            yDomain: undefined as [number, number] | undefined,
            valueSuffix: "",
        };
    }, [trendData]);

    //  Donut Pie Chart: gender split from detail data 
    const genderChart = useMemo(() => {
        const election = detailData?.electionByConstituencyAndYear;

        if (!election) {
            return {
                title: "Gender Distribution",
                subtitle: "Male vs Female voter ratio",
                centerValue: "—",
                centerLabel: "Total",
                data: [],
                valueSuffix: "%",
            };
        }

        const total = election.total_voters;
        const malePct = parseFloat(((election.male_voters / total) * 100).toFixed(1));
        const femalePct = parseFloat(((election.female_voters / total) * 100).toFixed(1));

        return {
            title: "Gender Distribution",
            subtitle: `${election.year} voter demographics`,
            centerValue: formatNumber(total),
            centerLabel: "Total Voters",
            data: [
                { name: "Male", value: malePct, color: "#2563eb" },
                { name: "Female", value: femalePct, color: "#ec4899" },
            ],
            valueSuffix: "%",
        };
    }, [detailData]);

    return { turnoutChart, genderChart, loadTrend };
}