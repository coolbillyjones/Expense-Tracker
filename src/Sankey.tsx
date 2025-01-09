import React from "react";
import { Chart } from "react-google-charts";


const options = {};

export const Sankey = ({ data }) => {
  return (
    <Chart
      chartType="Sankey"
      width="100%"
      height="100%"
      data={data}
      options={options}
    />
  );
}