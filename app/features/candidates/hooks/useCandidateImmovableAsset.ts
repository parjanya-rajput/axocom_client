import { useMemo } from "react";
import type { ElectionCandidateEntry } from "../types";
import {
    parseColTable,
    buildColTableColumns,
    type ColTableRow,
} from "../utils/parseColTable";
import type { ColumnDef } from "~/components/molecules/data-table-card";

export function useCandidateImmovableAssets(entry: ElectionCandidateEntry | null) {
    const { rows, columns } = useMemo(() => {
        const { headers, rows } = parseColTable(entry?.details_of_immovable_assets);
        const columns: ColumnDef<ColTableRow>[] = buildColTableColumns(headers);
        return { rows, columns };
    }, [entry]);

    return { rows, columns };
}