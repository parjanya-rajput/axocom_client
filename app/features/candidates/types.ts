// Raw candidate as it comes from the API
// if needed zod schema can be added here after discussion
export interface Candidate {
    id: number;
    neta_id: number;
    name: string;
    so_do_wo: string;
    age: number;
    candidate_image: string | null;
    assembly_constituency: string;
    party: string;
    name_enrolled_as_voter_in: string;
    self_profession: string;
    spouse_profession: string | null;
    criminal_cases: number;
    assets: string;
    liabilities: string;
    education_category: string;
    university_name: string | null;
    pan_itr: string | null;
    details_of_criminal_cases: JSON;
    details_of_movable_assets: JSON;
    details_of_immovable_assets: JSON;
    details_of_liabilities: JSON;
    source_of_income: JSON;
    contracts: JSON;
    social_profiles: JSON
    created_at: string;

}

export interface CandidatesData {
    candidates: Candidate[];
}

