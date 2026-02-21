// Constituency as returned from GraphQL
export interface Constituency {
    id: number;
    name: string;
    state: string;
    ac_number: number;
    number_of_polling_stations: number;
    created_at: string;
}

export interface ConstituenciesData {
    constituencies: Constituency[];
}

export interface ConstituenciesByStateData {
    constituenciesByState: Constituency[];
}

// Election as returned from GraphQL
export interface Election {
    id: number;
    name: string;
    start_date: string;
    end_date: string;
    year: number;
    constituency_id: number;
    total_voters: number;
    male_voters: number;
    female_voters: number;
    type: string;
    created_at: string;
}

export interface ElectionsData {
    elections: Election[];
}

export interface StateOption {
    value: string;
    label: string;
}

export interface ElectionDetailData {
    electionByConstituencyAndYear: Election | null;
    constituency: Constituency | null;
}

export interface ElectionsTrendData {
    electionsByConstituencyId: Pick<Election, 'year' | 'total_voters'>[];
}

// Candidate fields as resolved via ElectionCandidate → candidate field resolver
export interface ElectionCandidateDetail {
    id: number;
    votes_polled: number;
    criminal_cases: number;
    assets: number;
    candidate: {
        id: number;
        name: string;
        candidate_image: string | null;
        party: string;
        education_category: string | null;

    };
    party: {
        id: number;
        name: string;
        short_name: string;
    };
}

export interface ConstituencyCandidatesData {
    constituency_candidates: ElectionCandidateDetail[];
}

export interface ElectionResultDetail {
    id: number;
    election_candidate_id: number;
    votes_polled: number;
    position: number;
    status: string;
    election_candidate: {
        id: number;
        candidate: {
            id: number;
            name: string;
            candidate_image: string | null;
        };
        party: {
            id: number;
            name: string;
            short_name: string;
        };
    };
}

export interface ConstituencyResultsData {
    constituency_results: ElectionResultDetail[];
}

// Shape consumed by CandidateRow 
export interface CandidateRowData {
    id: number;
    name: string;
    party: string;
    partyShortName: string;
    education: string;
    votes_polled: number;
    criminalCasesLabel: string;
    projectedShare: string;
    partyColor: string;
    imageUrl?: string;
}