import { candidatesLoader, useCandidates } from "~/features/candidates/hooks";

export const loader = candidatesLoader;

export default function CandidatesPage() {
    const { data, error } = useCandidates();

    if (error) return <div>Something went wrong.</div>;

    return (
        <div>
            <h1>Candidates</h1>
            <ul>
                {data.candidates.map((c) => (
                    <li key={c.id}>
                        {c.name} – {c.party}
                        <br />
                        {c.so_do_wo}
                        <br />
                        {c.candidate_image}
                        <br />
                        {c.age}
                        <br />
                        {c.party}
                        <br />
                        {c.assembly_constituency}
                        <br />
                        {c.name_enrolled_as_voter_in}
                        <br />
                        {c.self_profession}
                        <br />
                        {c.spouse_profession}
                        <br />
                        {c.criminal_cases}
                        <br />
                        {c.assets}
                        <br />
                        {c.liabilities}
                        <br />
                        {c.education_category}
                        <br />
                        {c.university_name}
                        <br />
                        {c.created_at}
                    </li>
                ))}
            </ul>
        </div>
    );
}