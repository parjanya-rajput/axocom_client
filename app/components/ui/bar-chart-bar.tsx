import React from "react";

interface BarChartBarProps {
  value: number;
  label: string;          // year or category
  maxValue: number;       // for height scaling
  height?: number;        // max pixel height (default 160)
  barColor?: string;      // tailwind class or custom class
  textColor?: string;     // tailwind class
  showValue?: boolean;
  className?: string;
}


export const BarChartBar: React.FC<BarChartBarProps> = ({
  value,
  label,
  maxValue,
  height = 160,
  barColor = "bg-blue-500",
  textColor = "text-slate-700",
  showValue = true,
  className = "",
}) => {
  const calculatedHeight =
    maxValue > 0 ? (value / maxValue) * height : 0;

  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <div
        className="relative w-16 bg-slate-100 rounded-t group"
        style={{ height }}
      >
        <div
          className={`absolute bottom-0 w-full rounded-t transition-all duration-300 ${barColor}`}
          style={{ height: calculatedHeight }}
        />

        {showValue && (
          <div
            className={`absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-semibold ${textColor}`}
          >
            {value}
          </div>
        )}
      </div>

      <span className={`text-xs font-medium ${textColor}`}>
        {label}
      </span>
    </div>
  );
};
