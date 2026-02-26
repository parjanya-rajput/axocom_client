import * as React from "react";
import {
    TableRow,
    TableCell,
} from "~/components/ui/table";
import { Badge } from "~/components/ui/badge";

export type CandidateRowProps = {
    name: string;
    party: string;
    education: string;
    projectedShare: string;
    votesPolled: number;
    /** Tailwind color keyword used in text/bg classes, e.g. "orange" | "blue" */
    partyColor: string;
    /** Optional profile image URL; falls back to a gray circle if not provided */
    profileImageUrl?: string;
    /** Called when "View Profile" is clicked */
    onViewProfile?: () => void;
};

export const CandidateRow: React.FC<CandidateRowProps> = ({
    name,
    party,
    education,
    projectedShare,
    votesPolled,
    partyColor,
    profileImageUrl,
    onViewProfile,
}) => {
    const partyBadgeClasses = `text-${partyColor}-600 bg-${partyColor}-50 border-${partyColor}-100 font-black text-xs`;

    return (
        <TableRow className="border-gray-50">
            <TableCell className="font-bold flex items-center gap-3 py-4">
                {profileImageUrl ? (
                    <img
                        src={profileImageUrl}
                        alt={name}
                        className="size-8 rounded-full object-cover"
                    />
                ) : (
                    <div className="size-8 bg-gray-200 rounded-full" />
                )}
                {name}
            </TableCell>

            <TableCell>
                <Badge variant="outline" className={partyBadgeClasses}>
                    ● {party}
                </Badge>
            </TableCell>

            <TableCell className="text-gray-500 font-medium text-xs">
                {education}
            </TableCell>

            <TableCell className="font-black text-sm">
                {projectedShare}
            </TableCell>

            <TableCell className="font-black text-sm text-middle">
                {votesPolled}
            </TableCell>

            <TableCell className="text-right">
                <button
                    type="button"
                    onClick={onViewProfile}
                    className="text-blue-600 font-bold text-xs hover:underline"
                >
                    View Profile
                </button>
            </TableCell>
        </TableRow>
    );
};