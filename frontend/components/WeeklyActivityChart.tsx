"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import Card from "@/components/Card";
import { useTheme } from "@/context/ThemeContext";

type WeeklyActivityChartProps = {
  data: { day: string; solved: number }[];
};

export default function WeeklyActivityChart({ data }: WeeklyActivityChartProps) {
  const { darkMode } = useTheme();

  const axisColor = darkMode ? "#8B949E" : "#7A7295";
  const tooltipBg = darkMode ? "#010409" : "#FFFFFF";
  const tooltipBorder = darkMode ? "rgba(240,246,252,0.1)" : "rgba(30,16,78,0.1)";
  const tooltipText = darkMode ? "#E6EDF3" : "#1E104E";

  return (
    <Card>
      <h2 className="text-lg font-semibold text-text-primary mb-4">
        Weekly Activity
      </h2>
      <div className="flex-1 min-h-60">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis
              dataKey="day"
              stroke={axisColor}
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke={axisColor}
              fontSize={12}
              tickLine={false}
              axisLine={false}
              allowDecimals={false}
              width={24}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: tooltipBg,
                border: `1px solid ${tooltipBorder}`,
                borderRadius: "12px",
                color: tooltipText,
              }}
              labelStyle={{ color: axisColor }}
            />
            <Line
              type="monotone"
              dataKey="solved"
              stroke="#FF653F"
              strokeWidth={2}
              dot={{ fill: "#FF653F", r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}