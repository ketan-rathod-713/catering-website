import React from "react";
import { Chart } from "react-google-charts";

const LineChart = ({orders}) => {
  return (
    <div>
      <Chart
        chartType="LineChart"
        data={orders}
        options={{
          title: "Date vs. Number of Orders",
          hAxis: {
            title: "Date",
            format: "####", // This format ensures that only integer values are shown.
          },
          vAxis: {
            title: "Orders",
          },
          curveType: "function",
          legend: { position: "bottom" },
        }}
        width="100%"
        height="400px"
        legendToggle
      />
    </div>
  );
};

export default LineChart;
