import * as React from "react";

export type IndicatorColor =
    | "bg-red-500"
    | "bg-blue-600"
    | "bg-yellow-500"
    | "bg-green-500"
    | string; // allow custom Tailwind classes

export type IndicatorProps = {
    label: string;
    /** Right-side value text, e.g. "22% (Critical)" */
    value: string;
    /** Small caption under the bar */
    sub?: string;
    /** Tailwind background class for the bar fill, e.g. "bg-red-500" */
    color: IndicatorColor;
    /** 0–100 width percentage for the bar */
    percent: number;
    /** Optional override for value color (Tailwind class); if omitted, auto-derives from value */
    valueColorClassName?: string;
    className?: string;
};

export const Indicator: React.FC<IndicatorProps> = ({
    label,
    value,
    sub,
    color,
    percent,
    valueColorClassName,
    className,
}) => {
    const colorClass = valueColorClassName ?? "text-blue-600";

    return (
        <div className={`space-y-2 ${className ?? ""}`}>
            <div className="flex justify-between text-sm">
                <span className="font-semibold text-gray-700">{label}</span>
                <span className={`font-bold ${colorClass}`}>{value}</span>
            </div>

            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div
                    className={`h-full ${color}`}
                    style={{ width: `${percent}%` }}
                />
            </div>

            {sub && (
                <p className="text-xs font-bold text-gray-400 tracking-tight">
                    {sub}
                </p>
            )}
        </div>
    );
};