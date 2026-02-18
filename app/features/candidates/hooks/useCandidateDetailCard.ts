import { useMemo } from "react"
import type { RawCandidate } from "../types"

interface IdentityVM {
    name: string
    image: string
    party: string
    location: string
    age: number
    criminalCases: number
    netWorth: string
    itrCompliant: boolean
    socialLinks: {
        twitter?: string
        facebook?: string
        instagram?: string
    }
}

interface MetaDetail {
    label: string
    value: string
}

interface CandidateProfileVM {
    identity: IdentityVM
    metaDetails: MetaDetail[]
}

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
                    criminalCases: 0,
                    netWorth: "₹0",
                    itrCompliant: false,
                    socialLinks: {},
                },
                metaDetails: [],
            }
        }

        const formatCurrency = (amount: number) => {
            if (!amount) return "₹0"

            if (amount >= 1_00_00_000) {
                return `₹${(amount / 1_00_00_000).toFixed(2)} Cr`
            }

            if (amount >= 1_00_000) {
                return `₹${(amount / 1_00_000).toFixed(2)} L`
            }

            return `₹${amount.toLocaleString("en-IN")}`
        }

        const assets = candidate.assets ?? 0
        const liabilities = candidate.liabilities ?? 0
        const netWorthValue = assets - liabilities

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
            criminalCases: candidate.criminal_cases ?? 0,
            netWorth: formatCurrency(netWorthValue),
            itrCompliant:
                candidate.pan_itr ?
                    Object.keys(candidate.pan_itr).length > 0 : false,
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
