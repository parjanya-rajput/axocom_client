import * as React from "react";
import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

type DonutPieDatum = {
    name: string;
    value: number;
    color?: string;
};

type DonutPieChartProps = {
    title: string;
    subtitle?: string;
    /** Big number in the center */
    centerValue?: string;
    /** Small label under the center value */
    centerLabel?: string;
    /** Slice data – can be any categories (gender, age, etc.) */
    data: DonutPieDatum[];
    /** Suffix for values in tooltips / legend */
    valueSuffix?: string;
    /** Optional className for the outer Card */
    className?: string;
    /** Show legend line for each slice below the chart */
    showLegend?: boolean;
};

const DEFAULT_COLORS = ["#2563eb", "#ec4899", "#f97316", "#22c55e", "#6366f1"];

export const DonutPieChart: React.FC<DonutPieChartProps> = ({
    title,
    subtitle,
    centerValue,
    centerLabel,
    data,
    valueSuffix,
    className,
    showLegend = true,
}) => {
    return (
        <Card className={`border-none shadow-sm ${className ?? ""}`}>
            <CardHeader>
                <CardTitle className="text-base font-bold">{title}</CardTitle>
                {subtitle ? (
                    <p className="text-xs text-gray-400 font-medium">{subtitle}</p>
                ) : null}
            </CardHeader>

            <CardContent className="flex flex-col items-center">
                <div className="relative size-56 flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                dataKey="value"
                                nameKey="name"
                                innerRadius="70%"
                                outerRadius="90%"
                                paddingAngle={2}
                            >
                                {data.map((entry, index) => (
                                    <Cell
                                        key={`cell-${entry.name}-${index}`}
                                        fill={entry.color ?? DEFAULT_COLORS[index % DEFAULT_COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip
                                formatter={(value, name) => {
                                    const v = Array.isArray(value) ? value[0] : value;
                                    const display =
                                        valueSuffix && typeof v !== "undefined"
                                            ? `${v}${valueSuffix}`
                                            : String(v);
                                    return [display, String(name)];
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>

                    {(centerValue || centerLabel) && (
                        <div className="absolute text-center">
                            {centerValue && (
                                <div className="text-xl font-black">{centerValue}</div>
                            )}
                            {centerLabel && (
                                <div className="text-[9px] font-bold text-gray-400 leading-tight">
                                    {centerLabel}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {showLegend && (
                    <div className="flex gap-4 mt-6 w-full justify-center flex-wrap">
                        {data.map((item, index) => {
                            const color =
                                item.color ?? DEFAULT_COLORS[index % DEFAULT_COLORS.length];
                            const valueText =
                                valueSuffix != null
                                    ? `${item.value}${valueSuffix}`
                                    : String(item.value);
                            return (
                                <div
                                    key={item.name}
                                    className="flex items-center gap-2 text-[10px] font-bold text-gray-500"
                                >
                                    <div
                                        className="size-2 rounded-full"
                                        style={{ backgroundColor: color }}
                                    />
                                    <span>
                                        {item.name} {valueText}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                )}
            </CardContent>
        </Card>
    );
};