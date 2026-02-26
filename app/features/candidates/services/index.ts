// different query variations can be added here
import { gql, type TypedDocumentNode } from "@apollo/client";
import type { CandidateData, CandidateElectionsData } from "../types";

export const GET_CANDIDATE_BY_ID: TypedDocumentNode<
  CandidateData,
  { id: number }
> = gql`
  query GetCandidateById($id: Int!) {
    candidate(id: $id) {
      id
      name
      caste
      so_do_wo
      age
      candidate_image
      assembly_constituency
      party
      name_enrolled_as_voter_in
      self_profession
      spouse_profession
      education_category
      education_history
      university_name
      source_of_income
      contracts
      social_profiles
      created_at
    }
  }
`;

export const GET_CANDIDATE_ELECTIONS: TypedDocumentNode<
  CandidateElectionsData,
  { candidate_id: number }
> = gql`
  query GetCandidateElections($candidate_id: Int!) {
    candidate_elections(candidate_id: $candidate_id) {
      id
      year
      assets
      liabilities
      criminal_cases
      pan_itr
      details_of_criminal_cases
      details_of_movable_assets
      details_of_immovable_assets
      details_of_liabilities
      votes_polled
      candidate_id
    }
  }
`;

// add variation of the query to get the candidates with the full data / half data
export const GET_CANDIDATES_LIST: TypedDocumentNode<
  { candidates: import("../types").RawCandidate[] },
  Record<string, never>
> = gql`
  query GetCandidatesList {
    candidates {
      id
      name
      caste
      age
      candidate_image
      assembly_constituency
      party
      education_category
    }
  }
`;