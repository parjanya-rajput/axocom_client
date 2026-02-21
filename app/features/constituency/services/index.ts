import { gql, type TypedDocumentNode } from "@apollo/client";
import type {
  ConstituenciesData,
  ConstituenciesByStateData,
  ElectionsData,
  ElectionDetailData,
  ElectionsTrendData,
  ConstituencyCandidatesData,
  ConstituencyResultsData,
} from "../types";

// 1. Lightweight: just fetch distinct states + years for dropdowns
//    (uses the existing `constituencies` and `elections` queries)
export const GET_ALL_CONSTITUENCIES: TypedDocumentNode<ConstituenciesData> = gql`
  query GetConstituencies {
    constituencies {
      id
      name
      state
    }
  }
`;

// 2. Constituencies filtered by state (for the search/autocomplete)
export const GET_CONSTITUENCIES_BY_STATE: TypedDocumentNode<
  ConstituenciesByStateData,
  { state: string }
> = gql`
  query GetConstituenciesByState($state: String!) {
    constituenciesByState(state: $state) {
      id
      name
      state
      ac_number
    }
  }
`;

// 3. Elections query -- years for dropdown
export const GET_ELECTIONS_YEARS: TypedDocumentNode<ElectionsData> = gql`
  query GetElections {
    elections {
      id
      year
      constituency_id
    }
  }
`;

// 4. Full election + constituency detail -- called only on "Update View"
export const GET_ELECTION_BY_CONSTITUENCY_AND_YEAR: TypedDocumentNode<
  ElectionDetailData,
  { constituencyId: number; electionYear: number }
> = gql`
  query GetElectionDetail($constituencyId: Int!, $electionYear: Int!) {
    electionByConstituencyAndYear(constituency_id: $constituencyId, year: $electionYear) {
      id
      name
      start_date
      end_date
      year
      constituency_id
      total_voters
      male_voters
      female_voters
      type
      created_at
    }
    constituency(id: $constituencyId) {
      id
      name
      state
      ac_number
      number_of_polling_stations
      created_at
    }
  }
`;

// 5. Voter trend across years for a constituency -- used by TrendAreaChart
export const GET_ELECTIONS_BY_CONSTITUENCY: TypedDocumentNode<
  ElectionsTrendData,
  { constituencyId: number }
> = gql`
  query GetElectionsByConstituency($constituencyId: Int!) {
    electionsByConstituencyId(constituency_id: $constituencyId) {
      year
      total_voters
    }
  }
`;

// 6. Candidates for a constituency + year -- called on Update View
export const GET_CONSTITUENCY_CANDIDATES: TypedDocumentNode<
  ConstituencyCandidatesData,
  { constituencyId: number; electionYear: number }
> = gql`
  query GetConstituencyCandidates($constituencyId: Int!, $electionYear: Int!) {
    constituency_candidates(constituency_id: $constituencyId, election_year: $electionYear) {
      id
      votes_polled
      criminal_cases
      assets
      candidate {
        id
        name
        candidate_image
        party
        education_category
      }
      party {
        id
        name
        short_name
      }
    }
  }
`;

// 7. Election results for a constituency + year — winner, runner-up, margins
export const GET_CONSTITUENCY_RESULTS: TypedDocumentNode<
  ConstituencyResultsData,
  { constituencyId: number; electionYear: number }
> = gql`
  query GetConstituencyResults($constituencyId: Int!, $electionYear: Int!) {
    constituency_results(constituency_id: $constituencyId, election_year: $electionYear) {
      id
      election_candidate_id
      votes_polled
      position
      status
      election_candidate {
        id
        candidate {
          id
          name
          candidate_image
        }
        party {
          id
          name
          short_name
        }
      }
    }
  }
`;