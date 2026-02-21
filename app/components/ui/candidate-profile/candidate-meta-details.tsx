import { ProfileData } from "./candidate-profile-data"

interface DetailItem {
    label: string
    value: string
}

interface CandidateMetaDetailsProps {
    details: DetailItem[]
}

export function CandidateMetaDetails({
    details,
}: CandidateMetaDetailsProps) {
    return (
        <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-6">
            {details.map((item) => (
                <ProfileData
                    key={item.label}
                    label={item.label}
                    value={item.value}
                />
            ))}
        </div>
    )
}
