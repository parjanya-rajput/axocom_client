import * as React from "react";
import { TableRow, TableCell } from "~/components/ui/table";

export type EducationRowData = {
    degree: string;
    institution: string;
    year: string;
    /** Defaults to "COMPLETED" with green badge if omitted */
    status?: string;
};

export const EducationTableRow: React.FC<EducationRowData> = ({
    degree,
    institution,
    year,
    status = "COMPLETED",
}) => (
    <TableRow className="hover:bg-slate-50 border-b-0">
        <TableCell className="px-4 py-3 text-sm font-semibold text-slate-900">
            {degree}
        </TableCell>
        <TableCell className="px-4 py-3 text-sm text-slate-700">
            {institution}
        </TableCell>
        <TableCell className="px-4 py-3 text-sm text-slate-700">
            {year}
        </TableCell>
        <TableCell className="px-4 py-3 text-sm">
            <span className="inline-flex px-2 py-0.5 rounded text-xs font-bold bg-green-100 text-green-700">
                {status}
            </span>
        </TableCell>
    </TableRow>
);