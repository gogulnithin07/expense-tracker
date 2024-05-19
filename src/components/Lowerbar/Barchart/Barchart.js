import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Barchart({ categorySpends }) {
  const data1 = [
    { name: "food", value: categorySpends.food },
    { name: "travel", value: categorySpends.travel },
    { name: "entertainment", value: categorySpends.entertainment },
  ];
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart layout="vertical" data={data1}>
        <XAxis type="number" axisLine={false} display="none" />
        <YAxis dataKey="name" type="category" width={100} axisLine={false} />
        <Tooltip />
        <Bar dataKey="value" fill="#8884d8" barSize={25} />
      </BarChart>
    </ResponsiveContainer>
  );
}
export { Barchart };
