import React from "react"

interface FinCardProps {
    label: string
    value: string | number
    icon?: React.ReactNode
    sub?: string
    subColor?: string
    className?: string
}

export function FinCard({
    label,
    value,
    icon,
    sub,
    subColor = "text-slate-500",
    className = "",
}: FinCardProps) {
    return (
        <div
            className={`bg-white p-5 rounded-xl border border-slate-200 shadow-sm ${className}`}
        >
            <div className="flex justify-between mb-2">
                <span className="text-xs font-bold text-slate-400 uppercase">
                    {label}
                </span>
                {icon}
            </div>

            <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-slate-900">
                    {value}
                </span>

                {sub && (
                    <span className={`text-xs font-bold ${subColor}`}>
                        {sub}
                    </span>
                )}
            </div>
        </div>
    )
}
