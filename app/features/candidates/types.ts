// Raw candidate as it comes from the API
// if needed zod schema can be added here after discussion
// Static candidate — from candidates table
export interface RawCandidate {
    id: number
    name: string
    caste?: string | null
    so_do_wo?: string | null
    age?: number | null
    candidate_image?: string | null
    assembly_constituency?: string | null
    party?: string | null
    name_enrolled_as_voter_in?: string | null
    self_profession?: string | null
    spouse_profession?: string | null
    education_history?: Record<string, any> | null
    education_category?: string | null
    university_name?: string | null
    source_of_income?: Record<string, any> | null
    contracts?: Record<string, any> | null
    social_profiles?: {
        twitter?: string
        facebook?: string
        instagram?: string
    } | null
}

// Year-specific data — from election_candidate table
export interface ElectionCandidateEntry {
    id: number
    year: number
    assets: number
    liabilities: number
    criminal_cases: number
    pan_itr?: Record<string, any> | null
    details_of_criminal_cases?: Record<string, string>[] | null
    details_of_movable_assets?: Record<string, string>[] | null
    details_of_immovable_assets?: Record<string, string>[] | null
    details_of_liabilities?: Record<string, string>[] | null
    votes_polled: number
    candidate_id: number
}

export interface CandidateElectionsData {
    candidate_elections: ElectionCandidateEntry[]
}

export interface CandidatesData {
    candidates: RawCandidate[];
}

export interface CandidateData {
    candidate: RawCandidate | null;
}

export interface IdentityVM {
    name: string
    image: string
    party: string
    location: string
    age: number
    socialLinks: {
        twitter?: string
        facebook?: string
        instagram?: string
    }
}

export interface MetaDetail {
    label: string
    value: string
}

export interface CandidateProfileVM {
    identity: IdentityVM
    metaDetails: MetaDetail[]
}

export interface FinancialSummaryData {
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

export interface CandidateListVM {
    dbId: number;
    name: string;
    avatar: string;
    party: string;
    constituency: string;
    state: string;
    age: number | string;
    education: string;
    caste: string;
}
