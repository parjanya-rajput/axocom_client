import * as React from "react";
import { Badge } from "~/components/ui/badge";


type ConstituencyTitleSectionProps = {
    /** Breadcrumb segments: [state, region, constituencyName]. Last item is highlighted. */
    breadcrumb: [string, string, string];
    /** Main title e.g. "Bangalore South (172)" */
    title: string;
    /** Optional. If true, shows "Live Tracking" badge */
    liveTracking?: boolean;
    /** Description below the title */
    description: string;
    /** Optional right-side actions (e.g. Share, Export) */
    actions?: React.ReactNode;
    className?: string;
};

export const ConstituencyTitleSection: React.FC<ConstituencyTitleSectionProps> = ({
    breadcrumb: [state, region, constituencyName],
    title,
    liveTracking = true,
    description,
    actions,
    className = "",
}) => {
    return (
        <div
            className={`flex flex-col md:flex-row justify-between items-start md:items-end gap-4 ${className}`}
        >
            <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                    <span>{state}</span> <span className="text-gray-300">/</span>
                    <span>{region}</span> <span className="text-gray-300">/</span>
                    <span className="text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                        {constituencyName}
                    </span>
                </div>
                <div className="flex items-center gap-3">
                    <h2 className="text-3xl font-black tracking-tight">{title}</h2>
                    {liveTracking && (
                        <Badge
                            variant="outline"
                            className="text-xs font-bold uppercase border-green-200 text-green-600 bg-green-50 px-2 py-0.5"
                        >
                            <span className="size-1.5 bg-green-500 rounded-full mr-1.5 animate-pulse" />{" "}
                            Live Tracking
                        </Badge>
                    )}
                </div>
                <p className="text-gray-500 text-sm mt-1">{description}</p>
            </div>
            {actions != null && <div className="flex gap-2">{actions}</div>}
        </div>
    );
};