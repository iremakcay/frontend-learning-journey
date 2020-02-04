import React, { useRef, useEffect } from "react";
import { Chart } from "chart.js";
import "./Chart.css";

const generateChartOptions = ({ labels, prices, type }) => ({
  // The type of chart we want to create
  type,
  data: {
    labels,
    datasets: [
      {
        label: "# of Sales",
        data: prices,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 153, 0, 0.2)",
          "rgba(75, 192, 192, 0.2)"
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 153, 0, 1)",
          "rgba(75, 192, 192, 1)"
        ],
        borderWidth: 1
      }
    ]
  },
  // Configuration options go here
  options: {}
});

const useChart = chartOptions => {
  const canvasElement = useRef(null);

  useEffect(() => {
    new Chart(canvasElement.current, chartOptions);
  });

  return canvasElement;
};

function ChartComponent({ prices, labels }) {
  const chartOptions = generateChartOptions({ prices, labels, type: "bar" });
  const canvasElement = useChart(chartOptions);

  return (
    <canvas ref={canvasElement} id="myChart" width="400" height="400"></canvas>
  );
}

export default ChartComponent;
