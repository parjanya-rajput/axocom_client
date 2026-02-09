import * as React from "react";
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

type TrendAreaChartDatum = {
    [key: string]: string | number;
};

type TrendAreaChartProps = {
    title: string;
    subtitle?: string;
    /** Main metric shown on the right" */
    headlineValue?: string;
    /** Optional small delta badge */
    headlineDelta?: string;
    /** Array of data objects – can be any length */
    data: TrendAreaChartDatum[];
    /** Key in data objects for the X axis (e.g. "year") */
    xKey: string;
    /** Key in data objects for the Y value (e.g. "turnout") */
    yKey: string;
    /** Optional fixed domain to control vertical zoom, e.g. [60, 70] */
    yDomain?: [number, number];
    /** Optional suffix for tooltip values, e.g. "%" */
    valueSuffix?: string;
    /** Optional className for outer Card */
    className?: string;
};

export const TrendAreaChart: React.FC<TrendAreaChartProps> = ({
    title,
    subtitle,
    headlineValue,
    headlineDelta,
    data,
    xKey,
    yKey,
    yDomain,
    valueSuffix,
    className,
}) => {
    return (
        <Card className={`border-none shadow-sm overflow-hidden ${className ?? ""}`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                    <CardTitle className="text-base font-bold">{title}</CardTitle>
                    {subtitle ? (
                        <p className="text-xs text-gray-400 font-medium">{subtitle}</p>
                    ) : null}
                </div>
                {(headlineValue || headlineDelta) && (
                    <div className="text-right">
                        <div className="text-2xl font-black">
                            {headlineValue}
                            {headlineDelta && (
                                <span className="text-xs text-green-500 font-bold ml-1">
                                    {headlineDelta}
                                </span>
                            )}
                        </div>
                    </div>
                )}
            </CardHeader>

            <CardContent className="h-48 flex items-end px-0">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={data}
                        margin={{ top: 4, right: 12, left: 0, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id="trendAreaFill" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1} />
                                <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                            </linearGradient>
                        </defs>

                        <XAxis
                            dataKey={xKey}
                            tickLine={false}
                            axisLine={false}
                            tick={{ fontSize: 10, fill: "#9ca3af" }}
                        />
                        <YAxis
                            hide
                            domain={yDomain}
                            scale="linear"
                        />

                        <Tooltip
                            cursor={{ stroke: "#e5e7eb", strokeWidth: 1 }}
                            formatter={(value) => {
                                const v = Array.isArray(value) ? value[0] : value;
                                return [
                                    valueSuffix ? `${v}${valueSuffix}` : String(v),
                                    title,
                                ];
                            }}
                            labelFormatter={(label) => String(label)}
                        />

                        <Area
                            type="monotone"
                            dataKey={yKey}
                            stroke="#2563eb"
                            strokeWidth={2.5}
                            fill="url(#trendAreaFill)"
                            dot={false}
                            activeDot={{ r: 3 }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};