"use client";
import React from "react";
import { Chart as ChartJS, registerables, ChartType } from "chart.js";
import dynamic from "next/dynamic";
import LoadingBar from "../partials/loading/LoadingBar";
import {
  arrayOfMonths,
  arrayOfMonthsColors,
  numberWithCommasToFixed,
} from "../helper/helper-functions";
// import { Bar } from "react-chartjs-2";

ChartJS.register(...registerables);

// Dynamically import the Line component with SSR disabled
const ChartLoading = dynamic(
  () => import("react-chartjs-2").then((mod) => mod.Bar),
  {
    loading: () => <LoadingBar />,
    ssr: false,
  }
);

const BarChart = ({
  barType = "bar",
  title = "Dissolved Oxygen (DO) Levels",
  measurement = "mg/L",
}) => {
  const arr = Array.from({ length: 12 }).map(() =>
    Number(Math.random() * 20).toFixed(2)
  );

  const data = {
    labels: arrayOfMonths,
    datasets: [
      {
        label: title,
        data: arr,
        fill: false,
        backgroundColor: arrayOfMonthsColors,
        tension: 0.1,
      },
    ],
  };

  const optionsChart = {
    plugins: {
      legend: {
        display: false,
        labels: {
          color: "#000",
        },
        title: {
          display: false,
        },
      },
      title: {
        display: false,
        color: "#000",
        padding: {
          top: 0,
          bottom: 15,
        },
      },
      datalabels: {
        display: true,
        color: ["#c6a057"],
        anchor: "end",
        align: "end",
        borderRadius: 1,
        borderWidth: 1,
        borderColor: ["#c6a057"],
        backgroundColor: () => {
          return "#000";
        },
        formatter: (value: any, context: any) => {
          if (
            isNaN(value) ||
            value === "" ||
            value.length === 0 ||
            value === null
          ) {
            return "No data";
          } else {
            return measurement + " " + numberWithCommasToFixed(value, 2);
          }
        },
      },
    },
    scales: {
      y: {
        // suggestedMin: 0,
        // suggestedMax: 100,
        ticks: {
          callback: function (value: any, index: any, values: any) {
            return value.toLocaleString() + " " + measurement;
          },
        },
      },
    },
    // layout: { padding: { bottom: 20 } },
    // maintainAspectRatio: false,
  };

  return (
    <>
      <div className="flex items-center justify-between gap-4 py-4">
        <h4 className="font-bold text-sm">{title}</h4>
        <span className="block px-3 py-1 bg-gray-200 rounded-sm text-xs">
          {measurement}
        </span>
      </div>
      <div className="w-full h-full">
        <ChartLoading data={data} options={optionsChart} />
      </div>
    </>
  );
};

export default BarChart;
