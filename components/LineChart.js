import React from "react";
import { Chart } from "react-google-charts";


export const options = {
  title: "No. Of Orders",
  noDataPattern: {
    backgroundColor: '#76a7fa',
    color: '#a0c3ff'
  }
};

export default function LineChart({orders}) {
  console.log(orders);
  return (
    <Chart
      chartType="Calendar"
      width="100%"
      height="400px"
      data={[ [
    {
      type: "date",
      id: "Date",
    },
    {
      type: "number",
      id: "Won/Loss",
    },
  ] ,...orders]}
      options={options}
    />
  );
}
