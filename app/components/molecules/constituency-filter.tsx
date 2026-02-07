import * as React from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "~/components/ui/select";
import { Search } from "lucide-react";

type StateOption = {
    value: string;
    label: string;
};

type ConstituencyFilterBarProps = {
    stateOptions: StateOption[];
    selectedState: string;
    onStateChange: (value: string) => void;

    electionYear: string;
    onElectionYearChange: (value: string) => void;
    electionYearOptions: string[];

    constituency: string;
    onConstituencyChange: (value: string) => void;

    onUpdateView?: () => void;
    className?: string;
};

export const ConstituencyFilterBar: React.FC<ConstituencyFilterBarProps> = ({
    stateOptions,
    selectedState,
    onStateChange,
    electionYear,
    onElectionYearChange,
    electionYearOptions,
    constituency,
    onConstituencyChange,
    onUpdateView,
    className = "",
}) => {
    return (
        <div
            className={`bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-wrap lg:flex-nowrap items-end gap-4 ${className}`}
        >
            {/* State / Region */}
            <div className="space-y-1.5 flex-1 min-w-[200px]">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    State / Region
                </label>
                <Select value={selectedState} onValueChange={onStateChange}>
                    <SelectTrigger className="bg-gray-50 border-gray-200">
                        <SelectValue placeholder="Select State" />
                    </SelectTrigger>
                    <SelectContent>
                        {stateOptions.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>
                                {opt.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Election Year (dropdown) */}
            <div className="space-y-1.5 w-40">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    Election Year
                </label>
                <Select value={electionYear} onValueChange={onElectionYearChange}>
                    <SelectTrigger className="bg-gray-50 border-gray-200">
                        <SelectValue placeholder="Select Year" />
                    </SelectTrigger>
                    <SelectContent>
                        {electionYearOptions.map((year) => (
                            <SelectItem key={year} value={year}>
                                {year}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Constituency */}
            <div className="space-y-1.5 flex-[2] min-w-[300px]">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    Select Constituency
                </label>
                <div className="relative">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-blue-600" />
                    <Input
                        value={constituency}
                        onChange={(e) => onConstituencyChange(e.target.value)}
                        className="pl-10 bg-white border-gray-200"
                    />
                </div>
            </div>

            {/* Action */}
            <Button
                className="bg-blue-600 hover:bg-blue-700 px-8"
                onClick={onUpdateView}
                type="button"
            >
                Update View
            </Button>
        </div>
    );
};