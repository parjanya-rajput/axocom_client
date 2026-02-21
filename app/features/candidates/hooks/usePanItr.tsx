import { useMemo } from "react";
import { CheckCircle2, Info } from "lucide-react";
import type { ElectionCandidateEntry } from "../types";
import type { ColumnDef } from "~/components/molecules/data-table-card";

export type PanItrRow = {
  relationLabel: string;
  panStatus: string;
  panProvided: boolean;
  financialYear: string;
  totalIncome: string;
};

const RELATION_LABELS: Record<string, string> = {
  self: "Self",
  spouse: "Spouse",
  huf: "HUF",
  dependent1: "Dependent 1",
  dependent2: "Dependent 2",
  dependent3: "Dependent 3",
};

function parseLatestIncome(raw: string): string {
  const match = raw.match(/Rs\s+([\d,]+)/);
  return match ? `₹${match[1]}` : "₹0";
}

const PAN_ITR_COLUMNS: ColumnDef<PanItrRow>[] = [
  {
    key: "member",
    header: "Family Member",
    variant: "bold",
    render: (row) => row.relationLabel,
  },
  {
    key: "pan",
    header: "PAN Status",
    render: (row) => (
      <div className={`flex items-center gap-1.5 ${row.panProvided ? "text-green-600" : "text-slate-400"}`}>
        {row.panProvided ? <CheckCircle2 size={14} /> : <Info size={14} />}
        <span className="text-xs font-bold uppercase">{row.panStatus}</span>
      </div>
    ),
  },
  {
    key: "year",
    header: "Year of Last ITR Filed",
    render: (row) => (
      <span className={row.panProvided ? "text-slate-700" : "text-slate-400 italic"}>
        {row.financialYear}
      </span>
    ),
  },
  {
    key: "income",
    header: "Total Income Shown in ITR",
    headerAlign: "right",
    variant: "right-bold",
    render: (row) => row.totalIncome,
  },
];

export function usePanItrTable(entry: ElectionCandidateEntry | null) {
  const rows = useMemo(() => {
    if (!entry?.pan_itr) return [];

    const entries = entry.pan_itr as unknown as Array<{
      pan_given: string;
      relation_type: string;
      financial_year: string;
      total_income_shown_in_itr: string;
    }>;

    return entries.map((e) => ({
      relationLabel: RELATION_LABELS[e.relation_type] ?? e.relation_type,
      panStatus: e.pan_given === "Y" ? "Provided" : "Not Provided",
      panProvided: e.pan_given === "Y",
      financialYear: e.financial_year === "None" ? "N/A" : e.financial_year,
      totalIncome: parseLatestIncome(e.total_income_shown_in_itr),
    }));
  }, [entry]);

  return { rows, columns: PAN_ITR_COLUMNS };
}