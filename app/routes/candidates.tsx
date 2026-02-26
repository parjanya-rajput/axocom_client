import { useState } from 'react';
import { Sidebar } from '~/components/molecules/sidebar';
import { useNavigation } from '~/hooks/useNavigation';
import { cn } from '~/lib/utils';
import { useCandidateList } from '~/features/candidates/hooks/useCandidateList';
import { CandidateFilterBar } from '~/components/molecules/candidates/candidate-filter';
import { CandidateDataTable } from '~/components/molecules/candidates/candidate-data-table';

// --- MAIN PAGE COMPONENT ---
export default function CandidateExplorer() {
    const { navItems, onNavChange } = useNavigation();
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const {
        candidates,
        loading,
        searchName,
        setSearchName,
        constituency,
        setConstituency,
        caste,
        setCaste,
        party,
        setParty,
        options,
    } = useCandidateList();

    return (
        <div className="min-h-screen bg-[#F7F9FC] text-slate-900 font-sans selection:bg-blue-100">
            <Sidebar
                navItems={navItems}
                activeNavId="candidates"
                onNavChange={onNavChange}
                open={sidebarOpen}
                onOpenChange={setSidebarOpen}
            />

            <main
                className={cn(
                    'min-h-screen p-8 transition-[padding-left] duration-200',
                    sidebarOpen ? 'pl-60' : 'pl-20',
                )}
            >
                <div className="mx-auto max-w-[1400px] space-y-6">

                    {/* Header */}
                    <div className="space-y-4">
                        <div>
                            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Find Candidates</h2>
                            <p className="text-sm text-slate-500 font-medium">Browse and analyze political candidates with targeted demographic and regional filters.</p>
                        </div>

                        {/* Filter Bar */}
                        <CandidateFilterBar
                            searchName={searchName}
                            onSearchNameChange={setSearchName}
                            constituency={constituency}
                            onConstituencyChange={setConstituency}
                            constituencyOptions={options.constituencies}
                            caste={caste}
                            onCasteChange={setCaste}
                            casteOptions={options.castes}
                            party={party}
                            onPartyChange={setParty}
                            partyOptions={options.parties}
                        />
                    </div>

                    {/* Data Table Container */}
                    <CandidateDataTable
                        candidates={candidates}
                        loading={loading}
                    />

                </div>
            </main>
        </div>
    );
}

