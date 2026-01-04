"use client";
import { numberWithCommasToFixed } from "@/src/components/helper/helper-functions";
import LoadingBar from "@/src/components/partials/loading/LoadingBar";
import { Chart as ChartJS, registerables } from "chart.js";
import dynamic from "next/dynamic";
import { getDataByStations } from "../funtions-root";

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

// Define an interface or type alias for the props/parameters
interface MyComponentProps {
  title: string;
  measurement: string;
  barData: any;
  dataWaterQualityStatus: any;
  // other props...
}

const BarChart = ({
  title = "Dissolved Oxygen (DO) Levels",
  measurement = "mg/L",
  barData,
  dataWaterQualityStatus,
}: MyComponentProps) => {
  console.log(dataWaterQualityStatus);
  const uniqueByKey = (arr: any, key: string) => {
    const seen = new Set();
    return arr.filter((item: any) => {
      const keyValue = item[key];
      // If the key value hasn't been seen before, add it to the Set and keep the item
      if (!seen.has(keyValue)) {
        seen.add(keyValue);
        return true;
      }
      // Otherwise, filter it out (return false)
      return false;
    });
  };

  const arrData = uniqueByKey(barData, "stations_id");
  const res = getDataByStations(arrData, barData);
  const arr = arrData.map((item: any) => item);

  const arrByStatus = [
    {
      title: `Good (> 5)`,
      bgcolor: `#4CB04F`,
      data: arr.map((item: any) =>
        Number(item.amount) > 5 ? Number(item.amount) : 0
      ),
    },
    {
      title: `Moderate (> 2.5 && < 5)`,
      bgcolor: `#FFC107`,
      data: arr.map((item: any) =>
        Number(item.amount) >= 2.5 && Number(item.amount) <= 5
          ? Number(item.amount)
          : 0
      ),
    },
    {
      title: `Poor (< 2.5)`,
      bgcolor: "#F44336",
      data: arr.map((item: any) =>
        Number(item.amount) < 2.5 ? Number(item.amount) : 0
      ),
    },
  ];

  const data = {
    labels: arrData.map((item: any) =>
      item.station_name
        .replaceAll("(", "")
        .replaceAll(")", "")
        .split(" ")
        .map((w: string) => w[0])
        .join("")
    ),
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
