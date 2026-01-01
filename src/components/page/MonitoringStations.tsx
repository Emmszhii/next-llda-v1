// "use client";
import React from "react";

const MonitoringStations = () => {
  const arrLoc = [
    "Central West Bay",
    "East Bay",
    "Central Bay",
    "Northern West Bay",
    "South Bay",
    "Taytay",
  ];

  const arrayValue = Array.from({ length: 6 }).map((val, i) => {
    const amount = Number(Math.random() * 10).toFixed(2);
    const status =
      Number(amount) > 5
        ? 1
        : Number(amount) >= 2.5 && Number(amount) <= 5
        ? 2
        : 3;

    return { status, amount, location: arrLoc[i] };
  });

  return (
    <>
      <ul className="flex flex-wrap justify-start lg:justify-center gap-4">
        {arrayValue.map((item, key) => {
          // 1 is good
          // 2 is moderate
          // 3 is poor
          return (
            <li
              suppressHydrationWarning={true}
              key={key}
              className={`bg-gray-300 min-w-40 px-6 py-4 rounded-md border-2 border-b-4 border-transparent text-left ${
                item.status == 1
                  ? "border-[#4CB04F]!"
                  : item.status == 2
                  ? "border-[#FFC107]!"
                  : "border-[#F44336]!"
              } `}
            >
              <div className="flex flex-col items-start justify-between gap-5">
                <h5 className="font-bold text-sm">
                  {`LLDA-${
                    key + 1 < 10
                      ? `00${key + 1}`
                      : key + 1 < 100
                      ? `0${key + 1}`
                      : key + 1
                  }`}
                </h5>
                <div>
                  <span>{item.location}</span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default MonitoringStations;
