import * as React from "react";
import { Badge } from "~/components/ui/badge";

type CandidateSummaryCardProps = {
    /** Small label above the name, e.g. "Incumbent MP" */
    roleLabel: string;
    /** Candidate name, e.g. "Tejasvi Surya" */
    name: string;
    /** Party name, e.g. "Bharatiya Janata Party" */
    party: string;
    /** URL to profile photo; if empty, fallback circle is shown */
    avatarUrl?: string;
    /** Right-side badge text, e.g. "Won by 27.8%" */
    badgeText?: string;
    /** Tailwind classes for badge color, e.g. "bg-green-100 text-green-700" */
    badgeClassName?: string;
    className?: string;
};

export const CandidateSummaryCard: React.FC<CandidateSummaryCardProps> = ({
    roleLabel,
    name,
    party,
    avatarUrl,
    badgeText,
    badgeClassName = "bg-green-100 text-green-700 hover:bg-green-100 border-none font-bold text-xs",
    className,
}) => {
    return (
        <div className={`bg-gray-50 p-4 rounded-xl flex items-center justify-between ${className ?? ""}`}>
            <div className="flex items-center gap-3">
                {avatarUrl ? (
                    <img
                        src={avatarUrl}
                        alt={name}
                        className="size-10 rounded-full object-cover"
                    />
                ) : (
                    <div className="size-10 bg-gray-300 rounded-full overflow-hidden" />
                )}

                <div>
                    <p className="text-xs font-bold text-gray-400">{roleLabel}</p>
                    <p className="font-bold text-sm">{name}</p>
                    <p className="text-xs text-gray-500">{party}</p>
                </div>
            </div>

            {badgeText && (
                <Badge className={badgeClassName}>
                    {badgeText}
                </Badge>
            )}
        </div>
    );
};