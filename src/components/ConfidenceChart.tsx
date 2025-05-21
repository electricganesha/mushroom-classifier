import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

interface ConfidenceChartProps {
  prediction: {
    edible?: number;
    poisonous?: number;
  };
}

const COLORS = ["#4CAF50", "#F44336"]; // Green for edible, red for poisonous

export const ConfidenceChart: React.FC<ConfidenceChartProps> = ({
  prediction,
}) => {
  const data = [
    { name: "Edible", value: prediction.edible ?? 0 },
    { name: "Poison", value: prediction.poisonous ?? 0 },
  ];

  return (
    <div style={{ width: "100%", height: "180px" }}>
      <p style={{ fontSize: "12px", color: "white" }}>
        Hover to see percentage
      </p>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            innerRadius={10}
            outerRadius={50}
            paddingAngle={5}
            dataKey="value"
            legendType="circle"
            label={({ name }) => `${name}`}
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => `${(value * 100).toFixed(1)}%`}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
