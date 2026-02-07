// will be decoupled into a separate module for fetching candidates with hooks and query
// trial run if the data fetching is working

import { gql, type TypedDocumentNode } from "@apollo/client";
import { useReadQuery } from "@apollo/client/react";
import { useLoaderData } from "react-router";
import type { Route } from "./+types/candidates";
import { apolloLoader } from "~/lib/api";

interface Candidate {
    id: number;
    name: string;
    age: number;
    party: string;
    assembly_constituency: string;
    assets: string;
    liabilities: string;
    criminal_cases: number;
}

interface CandidatesData {
    candidates: Candidate[];
}

const GET_CANDIDATES: TypedDocumentNode<CandidatesData> = gql`
  query GetCandidates {
    candidates {
      id
      name
      age
      party
      assembly_constituency
      assets
      liabilities
      criminal_cases
    }
  }
`;

export const loader = apolloLoader<Route.LoaderArgs>()(({ preloadQuery }) => {
    const candidatesRef = preloadQuery(GET_CANDIDATES);
    return { candidatesRef };
});

export default function CandidatesPage() {
    const { candidatesRef } = useLoaderData<typeof loader>();
    const { data } = useReadQuery(candidatesRef);

    return (
        <div>
            <h1>Candidates</h1>
            <ul>
                {data.candidates.map((c) => (
                    <li key={c.id}>{c.name} - {c.party}</li>
                ))}
            </ul>
        </div>
    );
}