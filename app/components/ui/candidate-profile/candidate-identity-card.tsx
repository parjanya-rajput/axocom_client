
import { MapPin, Gavel, Wallet, BadgeCheck } from "lucide-react"
import { Badge } from "./badge"
import {
    TwitterIcon,
    FacebookIcon,
    InstagramIcon,
} from "~/components/ui/social-icons"

interface CandidateIdentityProps {
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

export function CandidateIdentityCard({
    name,
    image,
    party,
    partyColor = "bg-orange-100 text-orange-700",
    location,
    age,
    criminalCases,
    netWorth,
    itrCompliant,
    socialLinks,
}: CandidateIdentityProps) {
    return (
        <div className="p-6 flex flex-col gap-6">
            <div className="flex gap-6">
                <div className="h-32 w-32 rounded-lg bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                    <img src={image} alt={name} className="h-full w-full object-cover" />
                </div>

                <div className="flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-1">
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                            {name}
                        </h2>
                        <span
                            className={`rounded px-2 py-0.5 text-[10px] font-bold ${partyColor}`}
                        >
                            {party}
                        </span>
                    </div>

                    <p className="text-slate-500 text-sm font-medium flex items-center gap-1 mb-3">
                        <MapPin size={14} /> {location} • {age} Years
                    </p>

                    <div className="flex items-center gap-4">
                        {socialLinks?.twitter && (
                            <a
                                href={socialLinks.twitter}
                                className="text-slate-400 hover:text-blue-500 transition-colors"
                            >
                                <TwitterIcon />
                            </a>
                        )}
                        {socialLinks?.facebook && (
                            <a
                                href={socialLinks.facebook}
                                className="text-slate-400 hover:text-blue-700 transition-colors"
                            >
                                <FacebookIcon />
                            </a>
                        )}
                        {socialLinks?.instagram && (
                            <a
                                href={socialLinks.instagram}
                                className="text-slate-400 hover:text-pink-600 transition-colors"
                            >
                                <InstagramIcon />
                            </a>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap gap-2">
                <Badge variant="red" icon={<Gavel size={12} />}>
                    {criminalCases} CRIMINAL CASES
                </Badge>

                <Badge variant="green" icon={<Wallet size={12} />}>
                    {netWorth} NET WORTH
                </Badge>

                {itrCompliant && (
                    <Badge variant="blue" icon={<BadgeCheck size={12} />}>
                        ITR COMPLIANT
                    </Badge>
                )}
            </div>
        </div>
    )
}
