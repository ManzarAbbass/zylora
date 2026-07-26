"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface ConversionMetrics {
  avgOpenRate: number;
}

const COLORS = ["#3B5FE0", "#10b981", "#f59e0b", "#94a3b8"];

export function ConversionDonutChart({ data }: { data: ConversionMetrics }) {
  const openPct = data.avgOpenRate;
  const closedPct = Math.max(0, 100 - openPct);

  const chartData = [
    { name: "Opened", value: openPct },
    { name: "Unopened", value: closedPct },
  ];

  return (
    <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-4 sm:mb-6">
        <h2 className="text-base font-semibold text-slate-900 sm:text-lg">Engagement Distribution</h2>
        <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">Platform-wide average open rate breakdown</p>
      </div>
      <div className="flex h-52 flex-col items-center sm:h-72 lg:h-80">
        {openPct > 0 || closedPct > 0 ? (
          <div className="flex w-full flex-1 flex-col items-center">
            <div className="min-h-0 flex-1 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{ top: 4, right: 4, bottom: 4, left: 4 }}>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius="55%"
                    outerRadius="80%"
                    paddingAngle={3}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    {chartData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                        stroke="none"
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      borderRadius: "8px",
                      border: "1px solid #e2e8f0",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                      fontSize: "13px",
                      padding: "10px 14px",
                    }}
                    formatter={(value) => `${Number(value).toFixed(1)}%`}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 pb-1 sm:pb-2">
              <div className="flex items-center gap-1.5">
                <span className="inline-block size-2.5 rounded-full" style={{ backgroundColor: "#3B5FE0" }} />
                <span className="text-xs text-slate-600">Opened ({openPct.toFixed(1)}%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="inline-block size-2.5 rounded-full" style={{ backgroundColor: "#94a3b8" }} />
                <span className="text-xs text-slate-600">Unopened ({closedPct.toFixed(1)}%)</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-slate-400">
            No conversion data available yet.
          </div>
        )}
      </div>
    </div>
  );
}
