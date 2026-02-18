import { Card } from "~/components/ui/card"
import { CandidateIdentityCard } from "~/components/ui/candidate-profile/candidate-identity-card"
import { CandidateMetaDetails } from "~/components/ui/candidate-profile/candidate-meta-details"

interface IdentityData {
    name: string
    image: string
    party: string
    partyColor?: string
    location: string
    age: number
    criminalCases: number
    netWorth: string
    itrCompliant: boolean
    socialLinks?: {
        twitter?: string
        facebook?: string
        instagram?: string
    }
}

interface DetailItem {
    label: string
    value: string
}

interface CandidateProfileCardProps {
    identity: IdentityData
    metaDetails: DetailItem[]
}

export function CandidateProfileCard({
    identity,
    metaDetails,
}: CandidateProfileCardProps) {
    return (
        <Card className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col lg:flex-row">
            <div className="lg:w-2/5 border-b lg:border-b-0 lg:border-r border-slate-100">
                <CandidateIdentityCard {...identity} />
            </div>

            <div className="lg:w-3/5">
                <CandidateMetaDetails details={metaDetails} />
            </div>
        </Card>
    )
}
