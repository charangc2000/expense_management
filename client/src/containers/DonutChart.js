import React from "react";
import { useSelector } from "react-redux";
import Chart from "react-apexcharts";

const DonutChart = (props) => {
  const { budget, expenses } = useSelector((state) => {
    return state;
  });

  const totalAmount = expenses.data.reduce((total, currentValue) => {
    return (total = total + currentValue.amount);
  }, 0);

  const result = budget.data.amount - totalAmount;

  const filter = budget.data.amount - result;

  const data = [filter, result];
  const options = {
    labels: ["expense amount", "remaining amount"],
    title: {
      text: "Budget Overview",
    },
  };

  return (
    <div>
      <Chart
        type="donut"
        width={400}
        height={300}
        series={data}
        options={options}
      />
      <p>
        Total Budget-<strong>{budget.data.amount}</strong>
        Rs
      </p>
    </div>
  );
};

export default DonutChart;
