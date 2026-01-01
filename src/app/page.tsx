"use client";
import React from "react";
import { dynamicImport } from "../components/helper/dynamicImport";
import BarChart from "../components/page/BarChart";
import MonitoringStations from "../components/page/MonitoringStations";
import WaterParameter from "../components/page/WaterParameter";
import Footer from "../components/partials/Footer";
import Header from "../components/partials/Header";
import LoadingBar from "../components/partials/loading/LoadingBar";
import { setIsShow } from "../store/StoreAction";
import { useStore } from "../store/StoreContext";

const AboutMap = dynamicImport(
  () => import("@/src/components/page/InteractiveMap"),
  {
    ssr: false,
    loading: () => <LoadingBar />,
  }
);

export default function Home() {
  const { store, dispatch } = useStore();

  React.useEffect(() => {
    dispatch(setIsShow(false));
  }, []);

  return (
    <>
      <Header />
      {/* BANNER */}
      <div className="w-full h-[calc(100dvh-96px)] relative overflow-hidden">
        <img
          src="/images/banner.gif"
          alt="banner.gif"
          className="w-full h-dvh bg-contain bg-repeat absolute top-0 z-1 brightness-50"
        />
        <div className="flex w-full h-full items-center justify-center z-2 relative text-white text-center px-4">
          <div className="max-w-200 mx-auto">
            <h2 className="font-bold leading-21 text-[clamp(40px,6vw,72px)]">
              Visualize Laguna Lake's Water Quality
            </h2>
            <p className="leading-8 pt-10 font-semibold text-[clamp(16px,3vw,24px)]">
              Interactive mapping and real-time monitoring for environmental
              awareness and data-driven decisions
            </p>
          </div>
        </div>
      </div>
      {/*  */}
      <div className="pt-20">
        <div className="container">
          <div className="font-semibold text-center">
            <h3 className="text-primary text-5xl">Interactive Map</h3>
            <p className="max-w-150 mx-auto my-5">
              Explore water quality data from monitoring stations across Laguna
              Lake. View detailed metrics for each station below.
            </p>
          </div>

          <div className="relative overflow-hidden w-full h-150 rounded-md">
            <AboutMap />
          </div>
        </div>
      </div>
      {/*  */}
      <div className="pt-20" id="about">
        <div className="container">
          <div className="font-semibold text-center">
            <h3 className="text-primary text-5xl">About</h3>
          </div>
          <div className="mt-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <img
                src="/images/about.png"
                alt="about.png"
                className="w-full h-full bg-contain"
              />
              <div className="flex flex-col justify-between gap-4">
                <p>
                  The Laguna Lake Development Authority (LLDA) is a government
                  agency in the Philippines responsible for the sustainable
                  development, protection, and management of Laguna Lake, the
                  country’s largest freshwater lake. Established under Republic
                  Act No. 4850, LLDA plays a vital role in environmental
                  conservation, water resource management, and pollution control
                  within the Laguna de Bay region.
                </p>
                <p>
                  LLDA conducts regular water quality monitoring across Laguna
                  Lake and its tributaries to assess the lake’s ecological
                  condition. These monitoring activities involve measuring key
                  environmental parameters such as dissolved oxygen, pH level,
                  biochemical oxygen demand (BOD), chemical oxygen demand (COD),
                  turbidity, temperature, and nutrient levels. The collected
                  data helps guide policy decisions, environmental regulations,
                  and rehabilitation programs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-20">
        <div className="container">
          <div className="font-semibold text-center">
            <h3 className="text-primary text-5xl max-w-200 mx-auto">
              Water Quality Parameter Comparison Across Stations
            </h3>
            <p className="max-w-150 mx-auto my-5">
              Laguna Lake Development Authority Monitoring Stations
            </p>
          </div>
          <hr />
          <div className="my-5 mb-10 py-4 px-2 bg-gray-200 w-full flex flex-col lg:flex-row items-start lg:items-center gap-5">
            <div className="relative flex items-center gap-4">
              <label htmlFor="" className="w-40">
                Time Period
              </label>
              <select className="bg-white border rounded-sm">
                <optgroup label="Select time period">
                  <option value="">Last 7 days</option>
                  <option value="31">Last 1 month</option>
                  <option value="301">Last 1 year</option>
                </optgroup>
              </select>
            </div>
            <div className="relative flex items-center gap-4">
              <label htmlFor="" className="w-48">
                Compared by
              </label>
              <select className="bg-white border rounded-sm">
                <optgroup label="Select stations">
                  <option value="">All Stations</option>
                  <option value="">San Pablo</option>
                  <option value="">Alaminos</option>
                </optgroup>
              </select>
            </div>
          </div>
          <div>
            <ul className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <li>
                <BarChart />
              </li>
              <li>
                <BarChart title="pH Level Comparison" measurement="pH Units" />
              </li>
              <li>
                <BarChart
                  title="Biochemical Oxygen Demand (BOD)"
                  measurement="mg/L"
                />
              </li>
              <li>
                <BarChart
                  title="Chemical Oxygen Demand (COD)"
                  measurement="mg/L"
                />
              </li>
              <li>
                <BarChart title="Turbidity Levels" measurement="NTU" />
              </li>
              <li>
                <BarChart title="Nitrate Concentration" measurement="mg/L" />
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* MONITORING STATIONS */}
      <div className="pt-20">
        <div className="container">
          <div className="bg-gray-200 px-6 py-8">
            <div className="font-semibold">
              <h3 className="text-primary text-2xl">Monitoring Stations</h3>
            </div>
            <div className="pt-6">
              <MonitoringStations />
            </div>
          </div>
        </div>
      </div>
      {/*  */}
      <div className="pt-0">
        <div className="container">
          <div className="px-6 py-8">
            <div className="font-semibold">
              <h3 className="text-primary text-2xl">
                Water Quality Parameter Thresholds (DENR Standards)
              </h3>
            </div>
            <div className="pt-6">
              <WaterParameter />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
