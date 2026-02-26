import { Card } from '~/components/ui/card';
import { BarChartBar } from '~/components/ui/bar-chart-bar';

type NetWorthBar = {
    year: number | string;
    netWorth: number;
};

type NetWorthBarChartProps = {
    title?: string;
    bars: NetWorthBar[];
    maxNetWorth: number;
};

export function NetWorthBarChart({
    title = 'Net Worth Growth Trajectory',
    bars,
    maxNetWorth,
}: NetWorthBarChartProps) {
    if (!bars.length) return null;

    const baseBarWidth = 72; // px per bar (tweak as desired)
    const maxWidth = Math.max(bars.length * baseBarWidth, 240); // minimum width

    return (
        <Card className="p-6">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight mb-8">
                {title}
            </h3>
            <div className="w-full">
                <div
                    className="relative h-64 flex items-end justify-between px-10 gap-4 mx-auto"
                    style={{ maxWidth }}
                >
                    {/* Grid background: leave bottom space for labels */}
                    <div className="absolute left-0 right-0 top-2 bottom-10 flex flex-col justify-between pointer-events-none">
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
                            barColor={i === bars.length - 1 ? 'bg-blue-600' : 'bg-blue-600/60'}
                            textColor={i === bars.length - 1 ? 'text-blue-600' : 'text-slate-500'}
                        />
                    ))}
                </div>
            </div>
        </Card>
    );
}