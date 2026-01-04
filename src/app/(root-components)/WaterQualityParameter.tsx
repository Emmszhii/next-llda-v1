import React from "react";

// Define an interface or type alias for the props/parameters
interface MyComponentProps {
  isLoading: boolean;
  isFetching: boolean;
  data: object;
  // other props...
}

export default function WaterQualityParameter({
  isLoading,
  isFetching,
  data,
}: MyComponentProps) {
  const titleArr = [
    {
      title: "Dissolved Oxygen (DO)",
      good: "> 5",
      moderate: "> 2.5 && 5 <",
      poor: "< 2.5",
    },
    { title: "pH Level", good: "> 5", moderate: "> 2.5 && 5 <", poor: "< 2.5" },
    { title: "BOD", good: "> 5", moderate: "> 2.5 && 5 <", poor: "< 2.5" },
    { title: "COD", good: "> 5", moderate: "> 2.5 && 5 <", poor: "< 2.5" },
    {
      title: "Turbidity",
      good: "> 5",
      moderate: "> 2.5 && 5 <",
      poor: "< 2.5",
    },
    { title: "Nitrate", good: "> 5", moderate: "> 2.5 && 5 <", poor: "< 2.5" },
  ];

  const arrayValue = titleArr.map((val, i) => val);

  return (
    <>
      <div className="pt-0">
        <div className="container">
          <div className="px-6 py-8">
            <div className="font-semibold">
              <h3 className="text-primary text-2xl">
                Water Quality Parameter Thresholds (DENR Standards)
              </h3>
            </div>
            <div className="pt-6">
              <ul className="flex flex-wrap justify-start lg:justify-center gap-4">
                {arrayValue.map((item, key) => {
                  return (
                    <li
                      suppressHydrationWarning={true}
                      key={key}
                      className={`bg-gray-300 min-w-40 px-6 py-4 rounded-md border-2 border-primary text-left`}
                    >
                      <div className="flex flex-col items-start justify-between gap-5">
                        <h5 className="font-bold text-sm">{item.title}</h5>
                        <div>
                          <ul className="text-xs">
                            <li>Good {item.good}</li>
                            <li>Poor {item.poor}</li>
                          </ul>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
