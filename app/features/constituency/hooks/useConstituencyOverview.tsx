import { useMemo } from "react";
import { Users, Vote, MapPin, Building2 } from "lucide-react";
import type { ElectionDetailData } from "../types";
import type { StatCardProps } from "~/components/molecules/stat-card";

function formatNumber(n: number): string {
    return n.toLocaleString("en-IN");
}

export function useConstituencyOverview(detailData: ElectionDetailData | undefined) {
    const election = detailData?.electionByConstituencyAndYear ?? null;
    const constituency = detailData?.constituency ?? null;

    const titleSection = useMemo(() => {
        if (!constituency || !election) {
            return {
                breadcrumb: ["—", "—", "—"] as [string, string, string],
                title: "Select a constituency",
                description: "Use the filters above and click Update View.",
            };
        }

        return {
            breadcrumb: [
                constituency.state,
                election.type,
                constituency.name,
            ] as [string, string, string],
            title: `${constituency.name} (${constituency.ac_number})`,
            description: `${election.name} — ${election.type} Election, ${constituency.state}`,
        };
    }, [election, constituency]);

    const stats = useMemo((): StatCardProps[] => {
        if (!election || !constituency) return [];

        return [
            {
                icon: <MapPin size={18} />,
                label: "State & Region",
                value: constituency.state,
                sub: `${constituency.name} District`,
                color: "blue",
                active: true,
            },
            {
                icon: <Building2 size={18} />,
                label: "AC Number",
                value: `#${constituency.ac_number}`,
                sub: `${election.type} Constituency`,
                color: "purple",
            },
            {
                icon: <Users size={18} />,
                label: "Total Voters",
                value: formatNumber(election.total_voters),
                sub: `Updated ${new Date(election.start_date).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}`,
                color: "orange",
            },
            {
                icon: <Users size={18} />,
                label: "Polling Stations",
                value: formatNumber(constituency.number_of_polling_stations),
                sub: `Avg ${formatNumber(Math.round(election.total_voters / constituency.number_of_polling_stations))} voters/station`,
                color: "teal",
            },
        ];
    }, [election, constituency]);

    return { titleSection, stats };
}