"use client";
import React from "react";
import BarChart from "../components/page/BarChart";
import MonitoringStations from "../components/page/MonitoringStations";
import WaterParameter from "../components/page/WaterParameter";
import Footer from "../components/partials/Footer";
import Header from "../components/partials/Header";
import useQueryData from "../components/use-query/useQueryData";
import { setIsShow } from "../store/StoreAction";
import { useStore } from "../store/StoreContext";
import Banner from "./(root-components)/Banner";
import InteractiveMap from "./(root-components)/InteractiveMap";
import About from "./(root-components)/About";
import WaterQualityChart from "./(root-components)/WaterQualityChart";
import WaterQualityParameter from "./(root-components)/WaterQualityParameter";
import {
  getDateNow,
  mergeArraysWithoutDuplicates,
} from "../components/helper/helper-functions";

export default function Home() {
  const { store, dispatch } = useStore();
  const [filterTimePeriodData, setFilterTimePeriodData] = React.useState("5");
  const [filterStationsData, setFilterStationsData] = React.useState({
    id: "",
    name: "",
  });

  const {
    isLoading: dataWaterQualityIsLoading,
    isFetching: dataWaterQualityIsFetching,
    error: dataWaterQualityError,
    data: dataWaterQuality,
  } = useQueryData(`/data/water_quality.json`, "get", "water_quality");

  const {
    isLoading: dataWaterQualityTypeIsLoading,
    isFetching: dataWaterQualityTypeIsFetching,
    error: dataWaterQualityTypeError,
    data: dataWaterQualityType,
  } = useQueryData(
    `/data/water_quality_type.json`,
    "get",
    "water_quality_type"
  );

  const {
    isLoading: dataWaterQualityStatusIsLoading,
    isFetching: dataWaterQualityStatusIsFetching,
    error: dataWaterQualityStatusError,
    data: dataWaterQualityStatus,
  } = useQueryData(
    `/data/water_quality_status.json`,
    "get",
    "water_quality_status"
  );

  const {
    isLoading: dataStationsIsLoading,
    isFetching: dataStationsIsFetching,
    error: dataStationsError,
    data: dataStations,
  } = useQueryData(`/data/stations.json`, "get", "stations");

  const isLoading =
    dataWaterQualityIsLoading ||
    dataWaterQualityTypeIsLoading ||
    dataWaterQualityStatusIsLoading ||
    dataStationsIsLoading;
  const isFetching =
    dataWaterQualityIsFetching ||
    dataWaterQualityTypeIsFetching ||
    dataWaterQualityStatusIsFetching ||
    dataStationsIsFetching;

  const dateNow = new Date(getDateNow());
  const subtractDateByFilterTimePeriod = new Date(dateNow);
  subtractDateByFilterTimePeriod.setFullYear(
    subtractDateByFilterTimePeriod.getFullYear() - Number(filterTimePeriodData)
  );
  const formatedDate = subtractDateByFilterTimePeriod
    .toISOString()
    .split("T")[0];
  const filterByStations = isFetching
    ? []
    : filterStationsData?.id
    ? dataWaterQuality?.data.filter(
        (item: any) => item.stations_id == filterStationsData?.id
      )
    : dataWaterQuality?.data;
  const filterByTimePeriod = isFetching
    ? []
    : filterTimePeriodData
    ? dataWaterQuality?.data
        .map((item: any) => {
          if (new Date(item.date) >= new Date(formatedDate)) {
            return item;
          }
          return null;
        })
        .filter((item: any) => item)
    : dataWaterQuality?.data;

  // const mergeData = [
  //   new Set([
  //     ...(Array.isArray(filterByStations) ? filterByStations : []),
  //     ...(Array.isArray(filterByTimePeriod) ? filterByTimePeriod : []),
  //   ]),
  // ];

  const mergeData = mergeArraysWithoutDuplicates(
    filterByStations,
    filterByTimePeriod
  );

  React.useEffect(() => {
    dispatch(setIsShow(false));
  }, []);

  return (
    <>
      <Header />
      {/* BANNER */}
      <Banner />
      {/* InteractiveMap */}
      <InteractiveMap
        isLoading={isLoading}
        isFetching={isFetching}
        dataWaterQuality={dataWaterQuality}
        dataWaterQualityType={dataWaterQualityType}
        dataWaterQualityStatus={dataWaterQualityStatus}
        dataStations={dataStations}
      />
      {/* About */}
      <About />
      {/* MONITORING STATIONS */}
      <WaterQualityChart
        isLoading={isLoading}
        isFetching={isFetching}
        dataWaterQuality={mergeData}
        dataWaterQualityType={dataWaterQualityType}
        dataWaterQualityStatus={dataWaterQualityStatus}
        dataStations={dataStations}
        setFilterTimePeriodData={setFilterTimePeriodData}
        setFilterStationsData={setFilterStationsData}
      />
      {/* PARAMETER */}
      <WaterQualityParameter
        isLoading={isLoading}
        isFetching={isFetching}
        dataWaterQuality={dataWaterQuality}
        dataWaterQualityType={dataWaterQualityType}
        dataWaterQualityStatus={dataWaterQualityStatus}
        dataStations={dataStations}
      />
      {/* QUALITY CHART */}
      <Footer />
    </>
  );
}
