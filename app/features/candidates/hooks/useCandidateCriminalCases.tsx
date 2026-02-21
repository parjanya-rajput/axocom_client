
import { useMemo } from "react";
import type { ElectionCandidateEntry } from "../types";
import type { ColumnDef } from "~/components/molecules/data-table-card";

type RawCaseRow = Record<string, string>;

export type CriminalCaseRow = {
  cells: string[];
  isNoCases: boolean;
};

export type CriminalCaseSection = {
  label: string;
  rows: CriminalCaseRow[];
  columns: ColumnDef<CriminalCaseRow>[];
};

const SECTION_LABELS: Record<string, string> = {
  pending_case: "Pending Criminal Cases",
  convicted_case: "Convicted Cases",
};

function cleanCaseCell(raw: string): string {
  if (!raw || raw.trim() === "") return "—";

  // Detect "No Cases" placeholder
  const stripped = raw.replace(/\\-/g, "").replace(/-/g, "").trim();
  if (stripped.toLowerCase().includes("no cases")) return "No Cases";

  return raw.trim();
}

function isNoCasesRow(row: RawCaseRow): boolean {
  const values = Object.values(row);
  return values.some((v) => {
    const clean = (v ?? "").replace(/\\-/g, "").replace(/-/g, "").trim();
    return clean.toLowerCase().includes("no cases");
  });
}

function isHeaderRow(row: RawCaseRow): boolean {
  const col1 = (row.col_1 ?? "").toLowerCase().trim();
  return col1 === "serial no." || col1 === "serial no" || col1 === "sr no.";
}

function parseCaseSection(
  rows: RawCaseRow[]
): { headers: string[]; dataRows: CriminalCaseRow[] } {
  if (rows.length === 0) return { headers: [], dataRows: [] };

  const headerRow = rows[0];
  const colKeys = Object.keys(headerRow)
    .filter((k) => k.startsWith("col_"))
    .sort((a, b) => Number(a.split("_")[1]) - Number(b.split("_")[1]));

  const headers = colKeys
    .map((k) => headerRow[k] ?? "")
    .filter((h) => h !== "");

  const activeKeys = colKeys.slice(0, headers.length);

  const dataRows: CriminalCaseRow[] = rows.slice(1).map((row) => ({
    cells: activeKeys.map((k) => cleanCaseCell(row[k] ?? "")),
    isNoCases: isNoCasesRow(row),
  }));

  return { headers, dataRows };
}

function buildCaseColumns(
  headers: string[]
): ColumnDef<CriminalCaseRow>[] {
  return headers.map((header, idx) => ({
    key: `col_${idx}`,
    header,
    variant: idx === 0 ? "bold" : "default",
    render: (row: CriminalCaseRow) => {
      const value = row.cells[idx];

      if (row.isNoCases && idx === 0) {
        return (
          <span className="text-slate-400 italic">No Cases</span>
        );
      }
      if (row.isNoCases) return null;

      return (
        <span className={value === "—" ? "text-slate-400" : ""}>
          {value}
        </span>
      );
    },
  }));
}

export function useCandidateCriminalCases(
  entry: ElectionCandidateEntry | null
): CriminalCaseSection[] {
  return useMemo(() => {
    const rawData = entry?.details_of_criminal_cases as
      | RawCaseRow[]
      | null
      | undefined;

    if (!rawData || rawData.length === 0) return [];

    // Group rows by "type" field
    const grouped: Record<string, RawCaseRow[]> = {};
    for (const row of rawData) {
      const type = row.type ?? "unknown";
      if (!grouped[type]) grouped[type] = [];
      grouped[type].push(row);
    }

    // Build a section per type
    const sections: CriminalCaseSection[] = [];

    for (const [type, rows] of Object.entries(grouped)) {
      // First row of each group is the header row
      if (!isHeaderRow(rows[0])) continue;

      const { headers, dataRows } = parseCaseSection(rows);
      if (headers.length === 0) continue;

      sections.push({
        label: SECTION_LABELS[type] ?? type,
        rows: dataRows,
        columns: buildCaseColumns(headers),
      });
    }

    return sections;
  }, [entry]);
}