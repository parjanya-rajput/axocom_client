import { cn } from "~/lib/utils";

type YearSegmentControlProps = {
    years: number[];
    selectedYear: number | null;
    onYearChange: (year: number) => void;
    className?: string;
};

export function YearSegmentControl({
    years,
    selectedYear,
    onYearChange,
    className,
}: YearSegmentControlProps) {
    if (years.length === 0) return null;

    return (
        <div className={cn("flex items-center justify-center", className)}>
            <div className="inline-flex p-1 bg-slate-200/50 rounded-lg border border-slate-200">
                {years.map((year) => (
                    <button
                        key={year}
                        type="button"
                        onClick={() => onYearChange(year)}
                        className={cn(
                            "px-8 py-1.5 text-xs font-bold rounded-md transition-all",
                            selectedYear === year
                                ? "bg-white text-blue-600 shadow-sm ring-1 ring-slate-200"
                                : "text-slate-500 hover:text-slate-800"
                        )}
                    >
                        {year}
                    </button>
                ))}
            </div>
        </div>
    );
}