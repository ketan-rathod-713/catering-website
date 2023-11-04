import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Year", "Sales", "Expenses", "Profit"],
  ["2014", 1000, 400, 200],
  ["2015", 1170, 460, 250],
  ["2016", 660, 1120, 300],
  ["2017", 1030, 540, 350],
];

// export const options = {
//   chart: {
//     title: "Order Sales of October",
//     subtitle: "Sales, Expenses & Profits",
//   },
//   hAxis: {
//     format: "d", // Display only the day in the X-axis labels
//   },
// };

export default function BarChart({data}) {
  return (
    <Chart
      chartType="Bar"
      width="100%"
      height="400px"
      data={data}
      // options={options}
    />
  );
}