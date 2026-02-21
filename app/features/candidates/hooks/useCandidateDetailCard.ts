import { useMemo } from "react"
import type { CandidateProfileVM, IdentityVM, MetaDetail, RawCandidate } from "../types"


export function useCandidateProfile(
    candidate: RawCandidate | null | undefined
): CandidateProfileVM {
    return useMemo(() => {
        if (!candidate) {
            return {
                identity: {
                    name: "",
                    image: "",
                    party: "",
                    location: "",
                    age: 0,
                    socialLinks: {},
                },
                metaDetails: [],
            }
        }

        const identity: IdentityVM = {
            name: candidate.name ?? "",
            image:
                candidate.candidate_image ??
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    candidate.name
                )}&background=e2e8f0&size=256`,
            party: candidate.party ?? "",
            location: candidate.assembly_constituency ?? "",
            age: candidate.age ?? 0,
            socialLinks: candidate.social_profiles ?? {},
        }

        const metaDetails: MetaDetail[] = [
            {
                label: "Father/Husband Name",
                value: candidate.so_do_wo ?? "-",
            },
            {
                label: "Primary Education",
                value: candidate.education_category ?? "-",
            },
            {
                label: "Latest University",
                value: candidate.university_name ?? "-",
            },
            {
                label: "Profession",
                value: candidate.self_profession ?? "-",
            },
            {
                label: "Spouse Profession",
                value: candidate.spouse_profession ?? "-",
            },
            {
                label: "Voter Enrollment",
                value: candidate.name_enrolled_as_voter_in ?? "-",
            },
            {
                label: "Constituency",
                value: candidate.assembly_constituency ?? "-",
            },
        ]

        return { identity, metaDetails }
    }, [candidate])
}
