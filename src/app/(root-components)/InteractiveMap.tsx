"use client";
import { dynamicImport } from "@/src/components/helper/dynamicImport";
import LoadingBar from "@/src/components/partials/loading/LoadingBar";
import React from "react";

const AboutMap = dynamicImport(
  () => import("@/src/app/(root-components)/(chart)/AboutMap"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-150">
        <LoadingBar />
      </div>
    ),
  }
);

// Define an interface or type alias for the props/parameters
interface MyComponentProps {
  isLoading: boolean;
  isFetching: boolean;
  dataWaterQuality: any;
  dataWaterQualityType: any;
  dataWaterQualityStatus: any;
  dataStations: any;
  // other props...
}

export default function InteractiveMap({
  isLoading,
  isFetching,
  dataWaterQuality,
  dataWaterQualityType,
  dataWaterQualityStatus,
  dataStations,
}: MyComponentProps) {
  const status = [
    { name: "good", color: "" },
    { name: "fair", color: "" },
    { name: "poor", color: "" },
  ];

  return (
    <>
      <div className="pt-20">
        <div className="container">
          <div className="font-semibold text-center">
            <h3 className="text-primary text-[clamp(18px,3vw,30px)]">
              Interactive Map
            </h3>
            <p className="max-w-150 mx-auto my-5 text-[clamp(12px,3vw,20px)]">
              Explore water quality data from monitoring stations across Laguna
              Lake. View detailed metrics for each station below.
            </p>
          </div>

          <div className="relative overflow-hidden w-full h-150 rounded-md">
            {isLoading || isFetching ? (
              <>
                <div className="w-full h-150">
                  <LoadingBar />
                </div>
              </>
            ) : (
              <AboutMap dataStations={dataStations} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
