import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import styles from "./Piechart.module.css";
// const data = [
//   { name: "Group A", value: 400 },
//   { name: "Group B", value: 300 },
//   { name: "Group C", value: 300 },
//   { name: "Group D", value: 200 },
// ];

const COLORS = [
  "rgba(160, 0, 255, 1)",
  "rgba(255, 147, 4, 1)",
  "rgba(253, 224, 6, 1)",
];
const CATEGORY_NAMES = ["Food", "Travel", "Entertainment"];
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
const Piee = ({ data1 }) => {
  return (
    <div className={styles.piechartContainer}>
      <ResponsiveContainer height="80%">
        <PieChart width={400} height={400}>
          <Pie
            data={data1}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value">
            {data1.map((entry, index) => {
              return (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              );
            })}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className={styles.legendContainer}>
        {COLORS.map((color, index) => (
          <div key={index}>
            <span
              className={styles.legendColorBox}
              style={{
                backgroundColor: color,
              }}></span>
            <span
              style={{ color: COLORS[index] }}
              className={styles.legendContent}>
              {CATEGORY_NAMES[index]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export { Piee };
