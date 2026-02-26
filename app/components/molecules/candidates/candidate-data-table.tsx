import * as React from "react";
import { Link } from "react-router";
import { DataTableCard, type ColumnDef } from "~/components/molecules/data-table-card";
import { Badge } from "~/components/ui/badge";
import type { CandidateListVM } from "~/features/candidates/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "~/components/ui/button";

interface CandidateDataTableProps {
    candidates: CandidateListVM[];
    loading: boolean;
}

export const CandidateDataTable: React.FC<CandidateDataTableProps> = ({
    candidates,
    loading,
}) => {
    const [currentPage, setCurrentPage] = React.useState(1);
    const rowsPerPage = 10;

    // Reset page to 1 if candidates prop changes (e.g., when filters change)
    React.useEffect(() => {
        setCurrentPage(1);
    }, [candidates]);

    const totalPages = Math.ceil(candidates.length / rowsPerPage);
    const currentCandidates = candidates.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    const columns: ColumnDef<CandidateListVM>[] = [
        {
            key: "candidate_name",
            header: "Candidate Name",
            render: (c) => (
                <div className="flex items-center gap-3">
                    <img
                        alt={c.name}
                        src={c.avatar}
                        className="h-10 w-10 rounded-full border border-slate-200 object-cover shrink-0"
                    />
                    <div>
                        <div className="font-bold text-slate-900 text-sm">
                            {c.name}
                        </div>
                    </div>
                </div>
            ),
        },
        {
            key: "party",
            header: "Party",
            render: (c) => (
                <Badge variant="secondary" className="bg-slate-100 text-slate-700 hover:bg-slate-100 rounded px-2 py-0.5">
                    {c.party}
                </Badge>
            ),
        },
        {
            key: "constituency",
            header: "Assembly Constituency",
            render: (c) => (
                <div>
                    <div className="text-sm font-medium text-slate-700">
                        {c.constituency}
                    </div>
                    <div className="text-xs text-slate-400">{c.state}</div>
                </div>
            ),
        },
        {
            key: "age",
            header: "Age",
            variant: "bold",
            render: (c) => c.age,
        },
        {
            key: "education",
            header: "Education",
            render: (c) => c.education,
        },
        {
            key: "caste",
            header: "Caste",
            variant: "bold",
            render: (c) => c.caste,
        },
        {
            key: "action",
            header: "Action",
            headerAlign: "right",
            variant: "right",
            render: (c) => (
                <Link
                    to={`/candidates/${c.dbId}`}
                    className="px-4 py-1.5 text-xs font-bold text-blue-600 border border-blue-600/20 rounded-lg hover:bg-blue-600 hover:text-white transition-all inline-block"
                >
                    View Profile
                </Link>
            ),
        },
    ];

    if (loading) {
        return (
            <div className="p-8 text-center text-sm text-slate-500 bg-white rounded-xl border border-slate-200 shadow-sm">
                Loading candidates...
            </div>
        );
    }

    if (candidates.length === 0) {
        return (
            <div className="p-8 text-center text-sm text-slate-500 bg-white rounded-xl border border-slate-200 shadow-sm">
                No candidates found.
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <DataTableCard
                title="Candidate List"
                columns={columns}
                rows={currentCandidates}
            />

            {totalPages > 1 && (
                <div className="flex items-center justify-between px-4 py-2 bg-white border border-slate-200 rounded-xl shadow-sm">
                    <span className="text-xs font-medium text-slate-500">
                        Showing {(currentPage - 1) * rowsPerPage + 1}-
                        {Math.min(currentPage * rowsPerPage, candidates.length)} of{" "}
                        {candidates.length} candidates
                    </span>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="h-8 w-8 text-slate-400 hover:text-slate-600"
                        >
                            <ChevronLeft size={16} />
                        </Button>
                        <span className="text-sm font-bold text-slate-700 px-2 flex items-center h-8">
                            Page {currentPage} of {totalPages}
                        </span>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="h-8 w-8 text-slate-400 hover:text-slate-600"
                        >
                            <ChevronRight size={16} />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};
