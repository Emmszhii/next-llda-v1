import React from "react";

export default function Banner() {
  return (
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
  );
}
