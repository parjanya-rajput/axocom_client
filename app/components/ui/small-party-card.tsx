import * as React from "react";

export type SmallPartyCardProps = {
    /** Small label at the top, e.g. "Winning Party" */
    label: string;
    /** Main value text, e.g. "BJP" */
    value: string;
    /** Small subtitle, e.g. "Held since 1991" */
    subtitle?: string;
    /** Tailwind classes for background + border, e.g. "bg-[#fff7ed] border border-orange-100" */
    containerClassName?: string;
    /** Tailwind class for label text color, e.g. "text-orange-800" */
    labelColorClassName?: string;
    /** Tailwind class for value text color, e.g. "text-orange-600" */
    valueColorClassName?: string;
};

export const SmallPartyCard: React.FC<SmallPartyCardProps> = ({
    label,
    value,
    subtitle,
    containerClassName = "",
    labelColorClassName = "text-gray-800",
    valueColorClassName = "text-gray-900",
}) => {
    return (
        <div
            className={`p-4 rounded-lg text-center ${containerClassName}`}
        >
            <p
                className={`text-xs font-bold uppercase opacity-60 ${labelColorClassName}`}
            >
                {label}
            </p>
            <p className={`text-xl font-black ${valueColorClassName}`}>{value}</p>
            {subtitle && (
                <p className="text-xs text-gray-500 font-medium">{subtitle}</p>
            )}
        </div>
    );
};