// different query variations can be added here
import { gql, type TypedDocumentNode } from "@apollo/client";
import type { CandidatesData } from "../types";

export const GET_CANDIDATES_FULL: TypedDocumentNode<CandidatesData> = gql`
  query GetCandidates {
    candidates {
      id
      name
      so_do_wo
      candidate_image
      age
      party
      assembly_constituency
      name_enrolled_as_voter_in
      self_profession
      spouse_profession
      criminal_cases
      assets
      liabilities
      education_category
      university_name
      pan_itr
      details_of_criminal_cases
      details_of_movable_assets
      details_of_immovable_assets
      details_of_liabilities
      source_of_income
      contracts
      social_profiles
      created_at
    }
  }
`;

// add variation of the query to get the candidates with the full data / half data