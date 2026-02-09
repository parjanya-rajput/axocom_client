import { Card } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { ArrowRight, MapPin, Users, Vote, LayoutPanelLeft } from "lucide-react";
import { AppBar } from '~/components/molecules/app-bar';
import { ConstituencyFilterBar } from "~/components/molecules/constituency-filter";
import * as React from "react";
import { ConstituencyTitleSection } from "~/components/molecules/constituency-title-section";
import { TrendAreaChart } from "~/components/molecules/trend-area-chart";
import { DonutPieChart } from "~/components/molecules/ratio-pie-chart";
import { StatCard } from "~/components/molecules/stat-card";
import { Indicator } from "~/components/ui/indicator";
import { SmallPartyCard } from "~/components/ui/small-party-card";
import { CandidateSummaryCard } from "~/components/molecules/candidate-summary-card";
import { CandidateRow } from "~/components/molecules/candidate-row";

const ConstituencyPage = () => {
    const [selectedState, setSelectedState] = React.useState("karnataka");
    const [electionYear, setElectionYear] = React.useState("2024");
    const [constituency, setConstituency] = React.useState("Bangalore South (172)");
    const handleUpdateView = React.useCallback(() => {
        console.log("Update view");
    }, []);
    const turnoutData = [
        { year: "2004", turnout: 62.3 },
        { year: "2009", turnout: 64.8 },
        { year: "2014", turnout: 66.1 },
        { year: "2019", turnout: 67.4 },
        { year: "2024", turnout: 68.5 },
    ];
    return (
        <div className="min-h-screen bg-[#f6f6f8] text-[#111318] font-sans selection:bg-blue-100">
            <AppBar
                navItems={[
                    { id: "constituencies", label: "Constituencies" },
                    { id: "candidates", label: "Candidates" },
                    { id: "elections", label: "Elections" },
                ]}
                activeNavId="constituencies"
            />

            <main className="max-w-[1400px] mx-auto p-6 space-y-8">
                <ConstituencyFilterBar
                    stateOptions={[
                        { value: "uttarakhand", label: "Uttarakhand" },
                        { value: "tamilnadu", label: "Tamil Nadu" },
                        { value: "kerala", label: "Kerala" },
                        { value: "andhra pradesh", label: "Andhra Pradesh" },
                        { value: "telangana", label: "Telangana" },
                        { value: "maharashtra", label: "Maharashtra" },
                    ]}
                    selectedState={selectedState}
                    onStateChange={setSelectedState}
                    electionYear={electionYear}
                    onElectionYearChange={setElectionYear}
                    electionYearOptions={["2024", "2019", "2014", "2009"]}
                    constituency={constituency}
                    onConstituencyChange={setConstituency}
                    onUpdateView={handleUpdateView}
                />

                {/* Title Section */}
                <ConstituencyTitleSection
                    breadcrumb={["Uttarakhand", "Nainital", "Nainital"]}
                    title="Nainital (172)"
                    description="Detailed demographic, electoral, and quality analysis for 2024 Election Cycle."
                />

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard icon={<MapPin size={18} />} label="State & Region" value="Karnataka" sub="Bangalore Urban District" active />
                    <StatCard icon={<LayoutPanelLeft size={18} />} label="AC Number" value="#172" sub="General Constituency" color="purple" />
                    <StatCard icon={<Users size={18} />} label="Total Voters" value="542,890" sub="Updated Jan 2024" color="orange" trend="+4.2%" />
                    <StatCard icon={<Vote size={18} />} label="Polling Stations" value="425" sub="Avg 1,277 voters/station" color="teal" />
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <TrendAreaChart
                        className="lg:col-span-2"
                        title="Voter Turnout Trends"
                        subtitle="Historical comparison over last 5 elections"
                        headlineValue="68.5%"
                        headlineDelta="+2.1%"
                        data={turnoutData}
                        xKey="year"
                        yKey="turnout"
                        yDomain={[60, 70]}
                        valueSuffix="%"
                    />

                    <DonutPieChart
                        title="Gender Ratio"
                        subtitle="Voter distribution by gender"
                        centerValue="982"
                        centerLabel="Females / 1k Males"
                        data={[
                            { name: "Male", value: 51.2, color: "#2563eb" },
                            { name: "Female", value: 48.8, color: "#ec4899" },
                        ]}
                        valueSuffix="%"
                    />
                </div>

                {/* Indicators and Control */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card className="border-none shadow-sm p-6 space-y-6">
                        <h3 className="font-bold text-base">Political Quality Indicators</h3>
                        <Indicator label="Candidates with Criminal Cases" value="22% (Critical)" sub="Avg. for state is 14%" color="bg-red-500" percent={22} />
                        <Indicator label="Graduate Candidates" value="68%" sub="Higher than national avg (52%)" color="bg-blue-600" percent={68} />
                        <Indicator label="Asset Declaration (Avg)" value="₹12.4 Cr" sub="High net-worth constituency" color="bg-yellow-500" percent={45} />
                    </Card>

                    <Card className="border-none shadow-sm p-6">
                        <h3 className="font-bold text-base mb-4">Historical Control</h3>
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <SmallPartyCard
                                label="Winning Party"
                                value="BJP"
                                subtitle="Held since 1991"
                                containerClassName="bg-[#fff7ed] border border-orange-100"
                                labelColorClassName="text-orange-800"
                                valueColorClassName="text-orange-600"
                            />
                            <SmallPartyCard
                                label="Runner Up"
                                value="INC"
                                subtitle="Avg Margin 18%"
                                containerClassName="bg-[#eff6ff] border border-blue-100"
                                labelColorClassName="text-blue-800"
                                valueColorClassName="text-blue-600"
                            />
                        </div>
                        <CandidateSummaryCard
                            roleLabel="Incumbent MP"
                            name="Tejasvi Surya"
                            party="Bharatiya Janata Party"
                            avatarUrl="https://example.com/tejasvi.jpg"
                            badgeText="Won by 27.8%"
                        />
                    </Card>
                </div>

                {/* Candidate Table */}
                <Card className="border-none shadow-sm overflow-hidden">
                    <div className="p-6 flex flex-col md:flex-row justify-between border-b border-gray-100 gap-4">
                        <div>
                            <h3 className="font-bold text-base">2024 Election Candidates</h3>
                            <p className="text-xs text-gray-400 font-medium mt-0.5">Official list of candidates running for the current election</p>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" size="xs" className="text-[10px] font-bold h-7">Filter</Button>
                            <Button variant="outline" size="xs" className="text-[10px] font-bold h-7">Sort</Button>
                        </div>
                    </div>
                    <Table>
                        <TableHeader className="bg-gray-50/50">
                            <TableRow>
                                <TableHead className="text-[10px] font-bold uppercase py-4">Candidate Name</TableHead>
                                <TableHead className="text-[10px] font-bold uppercase py-4">Party</TableHead>
                                <TableHead className="text-[10px] font-bold uppercase py-4">Education</TableHead>
                                <TableHead className="text-[10px] font-bold uppercase py-4">Criminal Cases</TableHead>
                                <TableHead className="text-[10px] font-bold uppercase py-4">Projected Share</TableHead>
                                <TableHead className="text-right py-4"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <CandidateRow name="Tejasvi Surya" party="BJP" education="LLB" criminalCases="Yes (2)" projectedShare="52.4%" partyColor="orange" />
                            <CandidateRow name="Sowmya Reddy" party="INC" education="B.E. Chemical" criminalCases="No" projectedShare="38.1%" partyColor="blue" />
                            <CandidateRow name="Vatal Nagaraj" party="IND" education="10th Pass" criminalCases="Yes (5)" projectedShare="4.2%" partyColor="gray" />
                        </TableBody>
                    </Table>
                    <div className="p-4 flex justify-center border-t border-gray-50">
                        <Button variant="ghost" size="sm" className="text-blue-600 font-bold text-xs gap-2 hover:bg-blue-50">
                            View all 14 candidates <ArrowRight size={14} />
                        </Button>
                    </div>
                </Card>
            </main>
        </div>
    );
};


export default ConstituencyPage;