import * as React from "react";
import { Card } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";

export type StatCardColor =
    | "blue"
    | "purple"
    | "orange"
    | "teal"
    | "red"
    | "green";

export type StatCardProps = {
    icon?: React.ReactNode;
    label: string;
    value: string | number;
    sub?: string;
    active?: boolean;
    color?: StatCardColor;
    trend?: string;
    className?: string;
};

export const StatCard: React.FC<StatCardProps> = ({
    icon,
    label,
    value,
    sub,
    active,
    color = "blue",
    trend,
    className,
}) => {
    const colorBase = `bg-${color}-50 text-${color}-600`;

    return (
        <Card
            className={`border-none shadow-sm p-5 space-y-3 ${className ?? ""}`}
        >
            <div className="flex justify-between items-start">
                {icon && (
                    <div className={`p-2 rounded-lg ${colorBase}`}>
                        {icon}
                    </div>
                )}

                {active && (
                    <Badge className="bg-green-500 text-[9px] font-black h-5 px-1.5 border-none">
                        Active
                    </Badge>
                )}

                {trend && (
                    <span className="text-green-600 text-[11px] font-bold">
                        {trend}
                    </span>
                )}
            </div>

            <div>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">
                    {label}
                </p>
                <h4 className="text-2xl font-black">{value}</h4>
                {sub && (
                    <p className="text-xs text-gray-400 font-medium">{sub}</p>
                )}
            </div>
        </Card>
    );
};