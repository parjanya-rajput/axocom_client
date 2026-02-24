import { useState } from 'react';
import { Sidebar } from '~/components/molecules/sidebar';
import { useNavigation } from '~/hooks/useNavigation';
import { useParams } from 'react-router';
import { YearSegmentControl } from '~/components/ui/candidate-profile/year-segment-control';
import { useCandidatesProfile } from '~/features/candidates/hooks/useCandidatesProfile';
import { CandidateProfileCard } from '~/components/molecules/candidate-profile/candidate-profile-card';
import { useCandidateProfile } from '~/features/candidates/hooks/useCandidateDetailCard';
import { EducationHistoryCard } from '~/components/molecules/candidate-profile/education-history-card';
import { FinancialSummary } from '~/components/molecules/candidate-profile/financial-summary';
import { useFinancialSummary } from '~/features/candidates/hooks/useFinancialSummary';
import { usePanItrTable } from '~/features/candidates/hooks/usePanItr';
import { DataTableCard } from '~/components/molecules/data-table-card';
import { useCandidateMovableAssets } from '~/features/candidates/hooks/useCandidateMovableAssets';
import { useCandidateLiabilities } from '~/features/candidates/hooks/useCandidateLiabilities';
import { useCandidateImmovableAssets } from '~/features/candidates/hooks/useCandidateImmovableAsset';
import { useCandidateCriminalCases } from '~/features/candidates/hooks/useCandidateCriminalCases';
import { cn } from '~/lib/utils';
import { useEducationHistory } from '~/features/candidates/hooks/useEducationHistory';
import { useCandidateTimeline } from '~/features/candidates/hooks/useCandidateTimeline';
import { useNetworthCharts } from '~/features/candidates/hooks/useNetworthCharts';
import { NetWorthBarChart } from '~/components/molecules/candidate-profile/net-worth-bar-chart';
// MAIN PAGE COMPONENT 
export default function CandidateProfile() {
    const { navItems, onNavChange } = useNavigation();
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const { id } = useParams<{ id: string }>();
    const { candidate } = useCandidatesProfile(Number(id));
    const { identity, metaDetails } = useCandidateProfile(candidate);
    const educationHistoryItems = useEducationHistory(candidate);

    const {
        entries,
        availableYears,
        selectedYear,
        setSelectedYear,
        selectedEntry,
    } = useCandidateTimeline(Number(id));

    const financialSummaryData = useFinancialSummary(selectedEntry);
    const { rows: panItrRows, columns: panItrColumns } = usePanItrTable(selectedEntry);
    const { rows: movableRows, columns: movableCols } = useCandidateMovableAssets(selectedEntry);
    const { rows: immovableRows, columns: immovableCols } = useCandidateImmovableAssets(selectedEntry);
    const { rows: liabilitiesRows, columns: liabilitiesCols } = useCandidateLiabilities(selectedEntry);
    const criminalSections = useCandidateCriminalCases(selectedEntry);

    const { bars, maxNetWorth } = useNetworthCharts(entries);

    return (
        <div className="min-h-screen bg-[#F7F9FC] text-slate-900 font-sans">
            <Sidebar
                navItems={navItems}
                activeNavId="candidates"
                onNavChange={onNavChange}
                open={sidebarOpen}
                onOpenChange={setSidebarOpen}
            />

            <main className={cn(
                "min-h-screen p-8 transition-[padding-left] duration-200",
                sidebarOpen ? "pl-60" : "pl-20"
            )}>
                <div className="mx-auto max-w-[1400px] space-y-8">

                    <CandidateProfileCard
                        identity={identity}
                        metaDetails={metaDetails}
                    />

                    {educationHistoryItems.length > 0 && (
                        <EducationHistoryCard
                            items={educationHistoryItems}
                        />
                    )}

                    {/* Timeline Tabs — only shows years that exist */}
                    {availableYears.length > 0 && (
                        <YearSegmentControl
                            years={availableYears}
                            selectedYear={selectedYear}
                            onYearChange={setSelectedYear}
                        />
                    )}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                        <FinancialSummary
                            assets={financialSummaryData.assets}
                            liabilities={financialSummaryData.liabilities}
                            netWorth={financialSummaryData.netWorth}
                        />
                        <NetWorthBarChart bars={bars} maxNetWorth={maxNetWorth} />
                    </div>

                    {/* Financial Summary */}
                    {/* <FinancialSummary
                        assets={financialSummaryData.assets}
                        liabilities={financialSummaryData.liabilities}
                        netWorth={financialSummaryData.netWorth}
                    /> */}

                    {/* PAN & ITR */}
                    <DataTableCard
                        title="PAN & ITR Disclosures"
                        subtitle={`Election Cycle: ${selectedYear}`}
                        columns={panItrColumns}
                        rows={panItrRows}
                    />

                    {/* <NetWorthBarChart bars={bars} maxNetWorth={maxNetWorth} /> */}


                    {/* Detailed Wealth Breakdown */}
                    <DataTableCard
                        title="Movable Assets"
                        columns={movableCols}
                        rows={movableRows}
                    />
                    <DataTableCard
                        title="Immovable Assets"
                        columns={immovableCols}
                        rows={immovableRows}
                    />
                    <DataTableCard
                        title="Liabilities"
                        columns={liabilitiesCols}
                        rows={liabilitiesRows}
                    />
                    {criminalSections.map((section) => (
                        <DataTableCard
                            key={section.label}
                            title={section.label}
                            columns={section.columns}
                            rows={section.rows}
                        />
                    ))}

                </div>
            </main>
        </div>
    );
}



