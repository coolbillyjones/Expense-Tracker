import React from "react";
import { Chart } from "react-google-charts";

const options = {
    title: "Expense Pie Chart"
}
export const PieChart = ({ data }) => {
    return (
        <Chart
            chartType="PieChart"
            data={data}
            options={options}
            width={"100%"}
            height={"400px"}
        />
    )
}
