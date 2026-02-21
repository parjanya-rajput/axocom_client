import { TrendingUp, Info, WalletCards } from "lucide-react"
import { FinCard } from "~/components/ui/candidate-profile/fin-card"
import type { FinancialSummaryData } from "~/features/candidates/types"

export function FinancialSummary({
    assets,
    liabilities,
    netWorth,
}: FinancialSummaryData) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FinCard
                label="Total Assets"
                value={assets.value}
                icon={<TrendingUp size={18} className="text-green-500" />}
                sub={assets.sub}
                subColor={assets.subColor}
            />

            <FinCard
                label="Total Liabilities"
                value={liabilities.value}
                icon={<Info size={18} className="text-red-400" />}
                sub={liabilities.sub}
                subColor={liabilities.subColor}
            />

            <div className="bg-gradient-to-br from-white to-slate-50 p-5 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex justify-between mb-2">
                    <span className="text-xs font-bold text-slate-400 uppercase">
                        Net Worth
                    </span>
                    <WalletCards size={18} className="text-blue-600" />
                </div>

                <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-slate-900">
                        {netWorth.value}
                    </span>

                    {netWorth.affidavitLabel && (
                        <span className="text-[10px] font-bold text-slate-500">
                            {netWorth.affidavitLabel}
                        </span>
                    )}
                </div>
            </div>
        </div>
    )
}
