import { Card } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { ArrowRight } from "lucide-react";
import { Sidebar } from "~/components/molecules/sidebar";
import { ConstituencyFilterBar } from "~/components/molecules/constituency-filter";
import { ConstituencyTitleSection } from "~/components/molecules/constituency-title-section";
import { TrendAreaChart } from "~/components/molecules/trend-area-chart";
import { DonutPieChart } from "~/components/molecules/ratio-pie-chart";
import { StatCard } from "~/components/molecules/stat-card";
import { Indicator } from "~/components/ui/indicator";
import { SmallPartyCard } from "~/components/ui/small-party-card";
import { CandidateSummaryCard } from "~/components/molecules/candidate-summary-card";
import { CandidateRow } from "~/components/molecules/candidate-row";
import { useConstituencyOverview } from "~/features/constituency/hooks/useConstituencyOverview";
import { useConstituencyIndicators } from "~/features/constituency/hooks/useConstituencyIndicators";
import { useElectionFilter } from "~/features/constituency/hooks/useElectionFilter";
import { useNavigation } from "~/hooks/useNavigation";
import { useConstituencyCharts } from "~/features/constituency/hooks/useConstituencyCharts";
import { useEffect, useState } from "react";
import { useConstituencyCandidates } from "~/features/constituency/hooks/useConstituencyCandidates";
import { cn } from "~/lib/utils";

export default function ConstituencyPage() {
    const [showAllCandidates, setShowAllCandidates] = useState(false);

    const filters = useElectionFilter();
    const { navItems, onNavChange } = useNavigation();
    const { titleSection, stats } = useConstituencyOverview(filters.detailData);
    const { turnoutChart, genderChart, loadTrend } = useConstituencyCharts(
        filters.detailData,
        filters.selectedConstituencyId
    );
    const { candidates, totalCandidates, loadCandidates, rawCandidatesData } = useConstituencyCandidates(
        filters.detailData?.electionByConstituencyAndYear?.total_voters
    );
    const { indicators, historicalControl, incumbent, loadResults } = useConstituencyIndicators(
        rawCandidatesData
    );

    const [sidebarOpen, setSidebarOpen] = useState(true);


    const visibleCandidates = showAllCandidates
        ? candidates
        : candidates.slice(0, 5);

    useEffect(() => {
        if (filters.selectedConstituencyId && filters.detailData) {
            loadTrend(filters.selectedConstituencyId);
        }
    }, [filters.detailData]);

    useEffect(() => {
        if (filters.selectedConstituencyId && filters.detailData) {
            loadTrend(filters.selectedConstituencyId);
            loadCandidates(
                filters.selectedConstituencyId,
                Number(filters.electionYear)
            );
        }
    }, [filters.detailData]);

    useEffect(() => {
        if (filters.selectedConstituencyId && filters.detailData) {
            loadTrend(filters.selectedConstituencyId);
            loadCandidates(filters.selectedConstituencyId, Number(filters.electionYear));
            loadResults(filters.selectedConstituencyId, Number(filters.electionYear));
        }
    }, [filters.detailData]);
    return (
        <div className="min-h-screen bg-[#f6f6f8] text-[#111318] font-sans selection:bg-blue-100">
            <Sidebar
                navItems={navItems}
                activeNavId="constituencies"
                open={sidebarOpen}
                onOpenChange={setSidebarOpen}
                onNavChange={onNavChange}
            />

            <main className={cn(
                "min-h-screen transition-[padding-left] duration-200",
                sidebarOpen ? "pl-56" : "pl-14"
            )}>
                <div className="max-w-[1400px] mx-auto p-6 space-y-8">
                    <ConstituencyFilterBar
                        stateOptions={filters.stateOptions}
                        selectedState={filters.selectedState}
                        onStateChange={filters.onStateChange}
                        electionYear={filters.electionYear}
                        onElectionYearChange={filters.onElectionYearChange}
                        electionYearOptions={filters.electionYearOptions}
                        constituency={filters.constituency}
                        onConstituencyChange={filters.onConstituencyChange}
                        onUpdateView={filters.onUpdateView}
                        constituencyOptions={filters.constituencyOptions}
                        onConstituencySelect={filters.onConstituencySelect}
                    />

                    {/* Title Section */}
                    <ConstituencyTitleSection
                        breadcrumb={titleSection.breadcrumb}
                        title={titleSection.title}
                        description={titleSection.description}
                    />

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {stats.map((stat) => (
                            <StatCard
                                key={stat.label}
                                icon={stat.icon}
                                label={stat.label}
                                value={stat.value}
                                sub={stat.sub}
                                active={stat.active}
                                color={stat.color}
                                trend={stat.trend}
                            />
                        ))}
                    </div>

                    {/* Charts Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <TrendAreaChart
                            className="lg:col-span-2"
                            title={turnoutChart.title}
                            subtitle={turnoutChart.subtitle}
                            headlineValue={turnoutChart.headlineValue}
                            headlineDelta={turnoutChart.headlineDelta}
                            data={turnoutChart.data}
                            xKey={turnoutChart.xKey}
                            yKey={turnoutChart.yKey}
                            yDomain={turnoutChart.yDomain}
                            valueSuffix={turnoutChart.valueSuffix}
                        />

                        <DonutPieChart
                            title={genderChart.title}
                            subtitle={genderChart.subtitle}
                            centerValue={genderChart.centerValue}
                            centerLabel={genderChart.centerLabel}
                            data={genderChart.data}
                            valueSuffix={genderChart.valueSuffix}
                        />
                    </div>

                    {/* Candidate Table */}
                    <Card className="border-none shadow-sm overflow-hidden">
                        <div className="p-6 flex flex-col md:flex-row justify-between border-b border-gray-100 gap-4">
                            <div>
                                <h3 className="font-bold text-base">{titleSection.title} Election Candidates</h3>
                                <p className="text-xs text-gray-400 font-medium mt-0.5">
                                    Official list of candidates running for the current election
                                </p>
                            </div>
                        </div>
                        <Table>
                            <TableHeader className="bg-gray-50/50">
                                <TableRow>
                                    <TableHead className="text-sm">Candidate Name</TableHead>
                                    <TableHead className="text-sm">Party</TableHead>
                                    <TableHead className="text-sm">Education</TableHead>
                                    <TableHead className="text-sm">Share</TableHead>
                                    <TableHead className="text-sm">Votes Polled</TableHead>
                                    <TableHead className="text-right py-4"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {visibleCandidates.map((c) => (
                                    <CandidateRow
                                        key={c.id}
                                        name={c.name}
                                        party={c.party}
                                        education={c.education}
                                        projectedShare={c.projectedShare}
                                        votesPolled={c.votes_polled}
                                        partyColor={c.partyColor}
                                        profileImageUrl={c.imageUrl}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                        {totalCandidates > 5 && (
                            <div className="p-4 flex justify-center border-t border-gray-50">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-blue-600 font-bold text-xs gap-2 hover:bg-blue-50"
                                    type="button"
                                    onClick={() => setShowAllCandidates(true)}
                                    disabled={showAllCandidates}
                                >
                                    {showAllCandidates
                                        ? `Showing all ${totalCandidates} candidates`
                                        : `View all ${totalCandidates} candidates`}
                                    {!showAllCandidates && <ArrowRight size={14} />}
                                </Button>
                            </div>
                        )}
                    </Card>

                    {/* Indicators and Control */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card className="border-none shadow-sm p-6 space-y-6">
                            <h3 className="font-bold text-base">Political Quality Indicators</h3>
                            {indicators.map((ind) => (
                                <Indicator
                                    key={ind.label}
                                    label={ind.label}
                                    value={ind.value}
                                    sub={ind.sub}
                                    color={ind.color}
                                    percent={ind.percent}
                                    valueColorClassName={ind.valueColorClassName}
                                />
                            ))}
                        </Card>

                        <Card className="border-none shadow-sm p-6">
                            <h3 className="font-bold text-base mb-4">Historical Control</h3>
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                {historicalControl.map((party) => (
                                    <SmallPartyCard
                                        key={party.label}
                                        label={party.label}
                                        value={party.value}
                                        subtitle={party.subtitle}
                                        containerClassName={party.containerClassName}
                                        labelColorClassName={party.labelColorClassName}
                                        valueColorClassName={party.valueColorClassName}
                                    />
                                ))}
                            </div>
                            <CandidateSummaryCard
                                roleLabel={incumbent.roleLabel}
                                name={incumbent.name}
                                party={incumbent.party}
                                avatarUrl={incumbent.avatarUrl}
                                badgeText={incumbent.badgeText}
                            />
                        </Card>
                    </div>


                </div>
            </main>
        </div>
    );
}