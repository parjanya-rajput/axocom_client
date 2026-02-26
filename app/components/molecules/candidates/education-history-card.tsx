import * as React from "react";
import { GraduationCap } from "lucide-react";
import { Card, CardHeader, CardTitle } from "~/components/ui/card";
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
} from "~/components/ui/table";
import { EducationTableRow } from "~/components/ui/candidate-profile/education-table-row";
import type { EducationRowData } from "~/components/ui/candidate-profile/education-table-row";

export type EducationHistoryCardProps = {
    items: EducationRowData[];
};

export const EducationHistoryCard: React.FC<EducationHistoryCardProps> = ({ items }) => (
    <Card className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <CardHeader className="p-4 border-b border-slate-100 flex items-center gap-2 bg-slate-50/50">
            <GraduationCap size={24} className="text-blue-600" />
            <CardTitle className="text-md font-black text-slate-900 uppercase tracking-tight">
                Education History
            </CardTitle>
        </CardHeader>
        <div className="overflow-x-auto">
            <Table className="w-full text-left">
                <TableHeader>
                    <TableRow className="bg-slate-50 border-b border-slate-100 hover:bg-slate-50">
                        <TableHead className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase">
                            Degree/Qualification
                        </TableHead>
                        <TableHead className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase">
                            Institution/University
                        </TableHead>
                        <TableHead className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase">
                            Passing Year
                        </TableHead>
                        <TableHead className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase">
                            Status
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-slate-50">
                    {items.map((item, i) => (
                        <EducationTableRow key={i} {...item} />
                    ))}
                </TableBody>
            </Table>
        </div>
    </Card>
);