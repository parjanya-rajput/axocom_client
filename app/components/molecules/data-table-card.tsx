// frontend/app/components/molecules/data-table-card.tsx
import * as React from "react";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { DataTableCell, type CellVariant } from "~/components/ui/data-table-cell";

export type ColumnDef<T> = {
    key: string;
    header: string;
    headerAlign?: "left" | "right";
    variant?: CellVariant;
    render: (row: T, index: number) => React.ReactNode;
};

type Props<T> = {
    title: string;
    subtitle?: string;
    columns: ColumnDef<T>[];
    rows: T[];
    className?: string;
};

export function DataTableCard<T>({
    title,
    subtitle,
    columns,
    rows,
    className,
}: Props<T>) {
    return (
        <Card className={`bg-white border-slate-200 shadow-sm overflow-hidden ${className ?? ""}`}>
            <CardHeader className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">
                    {title}
                </h3>
                {subtitle && (
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        {subtitle}
                    </span>
                )}
            </CardHeader>
            <CardContent className="p-0">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100">
                                {columns.map((col) => (
                                    <th
                                        key={col.key}
                                        className={`px-4 py-3 text-xs font-semibold text-slate-500 uppercase ${col.headerAlign === "right" ? "text-right" : ""
                                            }`}
                                    >
                                        {col.header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {rows.map((row, rowIdx) => (
                                <tr key={rowIdx} className="hover:bg-slate-50">
                                    {columns.map((col) => (
                                        <DataTableCell
                                            key={col.key}
                                            variant={col.variant ?? "default"}
                                        >
                                            {col.render(row, rowIdx)}
                                        </DataTableCell>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    );
}