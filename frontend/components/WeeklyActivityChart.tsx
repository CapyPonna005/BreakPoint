"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import Card from "@/components/Card";
import { useTheme } from "@/context/ThemeContext";

const data = [
  { day: "Mon", solved: 1 },
  { day: "Tue", solved: 3 },
  { day: "Wed", solved: 2 },
  { day: "Thu", solved: 0 },
  { day: "Fri", solved: 4 },
  { day: "Sat", solved: 2 },
  { day: "Sun", solved: 1 },
];

export default function WeeklyActivityChart() {
  const { darkMode } = useTheme();

  const axisColor = darkMode ? "#A7A4C4" : "#7A7295";
  const tooltipBg = darkMode ? "#120B29" : "#FFFFFF";
  const tooltipBorder = darkMode ? "rgba(255,255,255,0.08)" : "rgba(30,16,78,0.1)";
  const tooltipText = darkMode ? "#FFFFFF" : "#1E104E";

  return (
    <Card>
      <h2 className="text-lg font-semibold text-text-primary mb-4">
        Weekly Activity
      </h2>
      <div className="h-48">
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