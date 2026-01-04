"use client";
import { numberWithCommasToFixed } from "@/src/components/helper/helper-functions";
import LoadingBar from "@/src/components/partials/loading/LoadingBar";
import { Chart as ChartJS, registerables } from "chart.js";
import dynamic from "next/dynamic";

ChartJS.register(...registerables);

// Dynamically import the Line component with SSR disabled
const ChartLoading = dynamic(
  () => import("react-chartjs-2").then((mod) => mod.Bar),
  {
    loading: () => (
      <div className="h-80 w-full">
        <LoadingBar />
      </div>
    ),
    ssr: false,
  }
);

const BarChart = ({
  title = "Dissolved Oxygen (DO) Levels",
  measurement = "mg/L",
}) => {
  const arrData = Array.from({ length: 6 }).map(
    (val, i) =>
      `LLDA-${i + 1 < 10 ? `00${i + 1}` : i + 1 < 100 ? `0${i + 1}` : i + 1}`
  );

  const arr = Array.from({ length: 6 }).map(() =>
    Number(Math.random() * 10).toFixed(2)
  );

  const arrByStatus = [
    {
      title: `Good (> 5)`,
      bgcolor: `#4CB04F`,
      data: arr.map((item) => (Number(item) > 5 ? Number(item) : 0)),
    },
    {
      title: `Moderate (> 2.5 && < 5)`,
      bgcolor: `#FFC107`,
      data: arr.map((item) =>
        Number(item) >= 2.5 && Number(item) <= 5 ? Number(item) : 0
      ),
    },
    {
      title: `Poor (< 2.5)`,
      bgcolor: "#F44336",
      data: arr.map((item) => (Number(item) < 2.5 ? Number(item) : 0)),
    },
  ];

  const data = {
    labels: arrData,
    datasets: arrByStatus.map((item) => {
      return {
        label: item.title,
        data: item.data,
        backgroundColor: item.bgcolor,
        tension: 0.1,
      };
    }),
  };

  const optionsChart = {
    plugins: {
      legend: {
        display: true,
        position: "bottom" as "bottom",
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
        backgroundColor: (value: any, context: any) => {
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
      x: {
        stacked: true,
      },
      y: {
        // suggestedMin: 0,
        // suggestedMax: 100,
        stacked: true,
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
