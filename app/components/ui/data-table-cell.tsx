import * as React from "react";
import { cn } from "~/lib/utils";

export type CellVariant = "default" | "bold" | "muted" | "right" | "right-bold";

type Props = {
    children: React.ReactNode;
    variant?: CellVariant;
    className?: string;
};

const variantClasses: Record<CellVariant, string> = {
    default: "text-sm text-slate-700",
    bold: "text-sm font-semibold text-slate-900",
    muted: "text-sm text-slate-400 italic",
    right: "text-sm text-right font-medium text-slate-700",
    "right-bold": "text-sm text-right font-bold text-slate-900",
};

export function DataTableCell({ children, variant = "default", className }: Props) {
    return (
        <td className={cn("px-4 py-3", variantClasses[variant], className)}>
            {children}
        </td>
    );
}