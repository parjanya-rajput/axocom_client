// Raw candidate as it comes from the API
// if needed zod schema can be added here after discussion
// add caste here
export interface RawCandidate {
    id: number
    neta_id: number
    name: string
    so_do_wo?: string | null
    age?: number | null
    candidate_image?: string | null
    assembly_constituency?: string | null
    party?: string | null
    name_enrolled_as_voter_in?: string | null
    self_profession?: string | null
    spouse_profession?: string | null
    criminal_cases?: number | null
    assets?: number | null
    liabilities?: number | null
    education_category?: string | null
    university_name?: string | null
    pan_itr?: Record<string, any> | null
    social_profiles?: {
        twitter?: string
        facebook?: string
        instagram?: string
    } | null
}

export interface CandidatesData {
    candidates: RawCandidate[];
}

export interface CandidateData {
    candidate: RawCandidate | null;
}

