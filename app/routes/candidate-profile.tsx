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
import { Card } from '~/components/ui/card';
import { BarChartBar } from '~/components/ui/bar-chart-bar';
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


                    {/* Financial Summary */}
                    <FinancialSummary
                        assets={financialSummaryData.assets}
                        liabilities={financialSummaryData.liabilities}
                        netWorth={financialSummaryData.netWorth}
                    />

                    {/* PAN & ITR */}
                    <DataTableCard
                        title="PAN & ITR Disclosures"
                        subtitle={`Election Cycle: ${selectedYear}`}
                        columns={panItrColumns}
                        rows={panItrRows}
                    />

                    {bars.length > 0 && (
                        <Card className="p-6">
                            <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight mb-8">
                                Net Worth Growth Trajectory
                            </h3>
                            <div className="relative h-64 flex items-end justify-between px-10 gap-4">
                                <div className="absolute inset-0 flex flex-col justify-between py-2 pointer-events-none">
                                    <div className="border-t border-slate-100 w-full" />
                                    <div className="border-t border-slate-100 w-full" />
                                    <div className="border-t border-slate-100 w-full" />
                                    <div className="border-t border-slate-100 w-full" />
                                </div>
                                {bars.map((bar, i) => (
                                    <BarChartBar
                                        key={bar.year}
                                        value={bar.netWorth}
                                        label={String(bar.year)}
                                        maxValue={maxNetWorth}
                                        height={160}
                                        barColor={i === bars.length - 1 ? "bg-blue-600" : "bg-blue-600/60"}
                                        textColor={i === bars.length - 1 ? "text-blue-600" : "text-slate-500"}
                                    />
                                ))}
                            </div>
                        </Card>
                    )}


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



