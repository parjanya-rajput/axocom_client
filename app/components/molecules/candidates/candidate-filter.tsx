import * as React from "react";
import { Input } from "~/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "~/components/ui/select";
import { Search } from "lucide-react";

type CandidateFilterBarProps = {
    searchName: string;
    onSearchNameChange: (value: string) => void;

    constituency: string;
    onConstituencyChange: (value: string) => void;
    constituencyOptions: string[];

    caste: string;
    onCasteChange: (value: string) => void;
    casteOptions: string[];

    party: string;
    onPartyChange: (value: string) => void;
    partyOptions: string[];

    className?: string;
};

export const CandidateFilterBar: React.FC<CandidateFilterBarProps> = ({
    searchName,
    onSearchNameChange,
    constituency,
    onConstituencyChange,
    constituencyOptions,
    caste,
    onCasteChange,
    casteOptions,
    party,
    onPartyChange,
    partyOptions,
    className = "",
}) => {
    return (
        <div className={`bg-white p-4 rounded-xl border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-4 gap-4 items-end ${className}`}>
            <div className="space-y-1.5 min-w-0">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">
                    Name
                </label>
                <div className="relative">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <Input
                        value={searchName}
                        onChange={(e) => onSearchNameChange(e.target.value)}
                        className="pl-10 bg-white border-slate-200 text-slate-900 text-sm focus:ring-blue-600 focus:border-blue-600 outline-none transition-colors"
                        placeholder="Search by candidate name..."
                    />
                </div>
            </div>

            <div className="space-y-1.5 min-w-0">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">
                    Assembly Constituency
                </label>
                <Select value={constituency} onValueChange={onConstituencyChange}>
                    <SelectTrigger className="bg-white border-slate-200 text-slate-600 text-sm focus:ring-blue-600 focus:border-blue-600">
                        <SelectValue placeholder="All Constituencies" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="ALL">All Constituencies</SelectItem>
                        {constituencyOptions.map((opt) => (
                            <SelectItem key={opt} value={opt}>
                                {opt}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-1.5 min-w-0">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">
                    Caste
                </label>
                <Select value={caste} onValueChange={onCasteChange}>
                    <SelectTrigger className="bg-white border-slate-200 text-slate-600 text-sm focus:ring-blue-600 focus:border-blue-600">
                        <SelectValue placeholder="All Castes" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="ALL">All Castes</SelectItem>
                        {casteOptions.map((opt) => (
                            <SelectItem key={opt} value={opt}>
                                {opt}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-1.5 min-w-0">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">
                    Party
                </label>
                <Select value={party} onValueChange={onPartyChange}>
                    <SelectTrigger className="bg-white border-slate-200 text-slate-600 text-sm focus:ring-blue-600 focus:border-blue-600">
                        <SelectValue placeholder="All Parties" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="ALL">All Parties</SelectItem>
                        {partyOptions.map((opt) => (
                            <SelectItem key={opt} value={opt}>
                                {opt}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
};
