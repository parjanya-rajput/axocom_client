import { useQuery } from "@apollo/client/react";
import { useMemo, useState } from "react";
import { GET_CANDIDATES_LIST } from "../services";
import type { CandidateListVM, RawCandidate } from "../types";

export function useCandidateList() {
    const { data, loading, error } = useQuery(GET_CANDIDATES_LIST);

    const [searchName, setSearchName] = useState("");
    const [constituency, setConstituency] = useState("ALL");
    const [caste, setCaste] = useState("ALL");
    const [party, setParty] = useState("ALL");

    const allCandidates: CandidateListVM[] = useMemo(() => {
        if (!data?.candidates) {
            return [];
        }

        return data.candidates.map((c: RawCandidate) => ({
            dbId: c.id,
            name: c.name,
            avatar:
                c.candidate_image ??
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    c.name
                )}&background=e2e8f0`,
            party: c.party ?? "IND",
            constituency: c.assembly_constituency ?? "Unknown",
            state: "Uttar Pradesh", // default state based on ui context
            age: c.age ?? "N/A",
            education: c.education_category ?? "Not specified",
            caste: c.caste ?? "Unknown",
        }));
    }, [data]);

    const candidates = useMemo(() => {
        return allCandidates.filter((c) => {
            if (searchName && !c.name.toLowerCase().includes(searchName.toLowerCase())) return false;
            if (constituency !== "ALL" && c.constituency !== constituency) return false;
            if (caste !== "ALL" && c.caste !== caste) return false;
            if (party !== "ALL" && c.party !== party) return false;
            return true;
        });
    }, [allCandidates, searchName, constituency, caste, party]);

    const options = useMemo(() => {
        const constituencies = new Set<string>();
        const castes = new Set<string>();
        const parties = new Set<string>();

        allCandidates.forEach((c) => {
            if (c.constituency !== "Unknown") constituencies.add(c.constituency);
            if (c.caste !== "Unknown") castes.add(c.caste);
            parties.add(c.party);
        });

        return {
            constituencies: Array.from(constituencies).sort(),
            castes: Array.from(castes).sort(),
            parties: Array.from(parties).sort(),
        };
    }, [allCandidates]);

    return {
        candidates,
        loading,
        error,
        searchName,
        setSearchName,
        constituency,
        setConstituency,
        caste,
        setCaste,
        party,
        setParty,
        options,
    };
}
