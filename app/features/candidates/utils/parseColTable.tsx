import type { ColumnDef } from "~/components/molecules/data-table-card";

type RawColRow = Record<string, string>;

export type ColTableRow = {
  cells: string[];
  isTotal: boolean;
};

/**
 * Parse a cell that may contain multiple entries like:
 * "SBI Bank No 3052259xxxxx 2,70,004 2 Lacs+ Almora Urban Bank 34,175 34 Thou+"
 *
 * Returns a cleaned, readable string with one entry per line.
 */
function cleanCellValue(raw: string): string {
  if (!raw || raw.trim() === "" || raw === "Nil") return "Nil";

  // Simple total value: starts with "Rs " and is a single value
  const simpleTotalMatch = raw.match(/^Rs\s+([\d,]+)/);
  if (simpleTotalMatch && !raw.includes("+")) {
    return `₹${simpleTotalMatch[1]}`;
  }

  // Check for 0*(Value Not Given) as the entire cell
  if (raw.trim().match(/^0\*\(Value Not Given\)$/)) return "—";

  // Split on the informal suffix boundary (e.g. "2 Lacs+ " acts as delimiter)
  // Each chunk is: <description> <amount> <suffix>
  const entryPattern =
    /([A-Za-z][\w\s./()#-]*?)?\s*([\d,]+)\s+\d+\s*(?:Thou|Lacs?|Crore|Hundred)\+/gi;

  const entries: string[] = [];
  let match: RegExpExecArray | null;

  while ((match = entryPattern.exec(raw)) !== null) {
    const desc = match[1]?.replace(/\s+No\s*$/i, "").trim();
    const amount = `₹${match[2]}`;

    if (desc) {
      entries.push(`${desc}: ${amount}`);
    } else {
      entries.push(amount);
    }
  }

  if (entries.length > 0) return entries.join("\n");

  // Fallback: just a bare number like "50,000 50 Thou+"
  const bareMatch = raw.match(/([\d,]+)\s+\d+\s*(?:Thou|Lacs?|Crore|Hundred)\+/i);
  if (bareMatch) return `₹${bareMatch[1]}`;

  // Final fallback: "Rs <amount> <suffix>"
  const rsMatch = raw.match(/Rs\s+([\d,]+)/);
  if (rsMatch) return `₹${rsMatch[1]}`;

  return raw;
}

function isTotalRow(row: RawColRow): boolean {
  const first = (row.col_1 ?? "").toLowerCase();
  return first.includes("total") || first.includes("gross total");
}

export function parseColTable(
  rawData: RawColRow[] | null | undefined
): { headers: string[]; rows: ColTableRow[] } {
  if (!rawData || rawData.length === 0) {
    return { headers: [], rows: [] };
  }

  const headerRow = rawData[0];
  const colKeys = Object.keys(headerRow)
    .filter((k) => k.startsWith("col_"))
    .sort((a, b) => Number(a.split("_")[1]) - Number(b.split("_")[1]));

  const headers = colKeys
    .map((k) => headerRow[k] ?? "")
    .filter((h) => h !== "");

  const activeKeys = colKeys.slice(0, headers.length);

  const dataRows = rawData.slice(1);
  const rows: ColTableRow[] = dataRows.map((row) => ({
    cells: activeKeys.map((k) => cleanCellValue(row[k] ?? "")),
    isTotal: isTotalRow(row),
  }));

  return { headers, rows };
}

export function buildColTableColumns(
  headers: string[]
): ColumnDef<ColTableRow>[] {
  return headers.map((header, idx) => ({
    key: `col_${idx}`,
    header,
    headerAlign: idx === headers.length - 1 ? ("right" as const) : ("left" as const),
    variant: idx === 0 ? "bold" : idx === headers.length - 1 ? "right-bold" : "default",
    render: (row: ColTableRow) => {
      const value = row.cells[idx];
      const isNil = value === "Nil";
      const isMultiLine = value.includes("\n");

      return (
        <span
          className={`
            ${row.isTotal ? "font-bold text-slate-900" : ""}
            ${isNil ? "text-slate-400" : ""}
          `}
        >
          {isMultiLine ? (
            <ul className="space-y-1 text-xs">
              {value.split("\n").map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          ) : (
            value
          )}
        </span>
      );
    },
  }));
}