import BarChart from "./(chart)/BarChart";

// Define an interface or type alias for the props/parameters
interface MyComponentProps {
  isLoading: boolean;
  isFetching: boolean;
  dataWaterQuality: any;
  dataWaterQualityType: any;
  dataWaterQualityStatus: any;
  dataStations: any;
  setFilterTimePeriodData: any;
  setFilterStationsData: any;
  // other props...
}

export default function WaterQualityChart({
  isLoading,
  isFetching,
  dataWaterQuality,
  dataWaterQualityType,
  dataWaterQualityStatus,
  dataStations,
  setFilterTimePeriodData,
  setFilterStationsData,
}: MyComponentProps) {
  const handleOnchangeTimePeriod = (e: any) => {
    const val = e.target.value;
    const textVal = e.target.options[e.target.selectedIndex].text;
    setFilterTimePeriodData(val);
  };
  const handleOnchangeStations = (e: any) => {
    const val = e.target.value;
    const textVal = e.target.options[e.target.selectedIndex].text;
    setFilterStationsData((prev: any) => {
      return {
        ...prev,
        id: val,
        name: textVal,
      };
    });
  };

  const dissoveOxygenData = dataWaterQuality.filter(
    (item: any) => item.water_quality_type == 2
  );
  const phData = dataWaterQuality.filter(
    (item: any) => item.water_quality_type == 4
  );
  const bodData = dataWaterQuality.filter(
    (item: any) => item.water_quality_type == 1
  );
  const codData = dataWaterQuality.filter(
    (item: any) => item.water_quality_type == 1
  );
  const ntuData = dataWaterQuality.filter(
    (item: any) => item.water_quality_type == 8
  );
  const nitrateData = dataWaterQuality.filter(
    (item: any) => item.water_quality_type == 6
  );

  return (
    <>
      <div className="pt-20">
        <div className="container">
          <div className="font-semibold text-center">
            <h3 className="text-primary text-[clamp(18px,3vw,30px)] max-w-200 mx-auto">
              Water Quality Parameter Comparison Across Stations
            </h3>
            <p className="max-w-150 mx-auto my-5 text-[clamp(12px,2.5vw,20px)]">
              Laguna Lake Development Authority Monitoring Stations
            </p>
          </div>
          <hr />
          <div className="my-5 mb-10 py-4 px-2 bg-gray-200 w-full flex flex-col lg:flex-row items-start lg:items-center gap-5">
            <div className="relative flex items-center gap-4">
              <label htmlFor="">Time Period</label>
              <select
                className="bg-white border rounded-sm"
                onChange={handleOnchangeTimePeriod}
              >
                <optgroup label="Select time period">
                  <option value="5">Last 5 year</option>
                  <option value="10">Last 10 year</option>
                  <option value="15">Last 15 year</option>
                </optgroup>
              </select>
            </div>
            <div className="relative flex items-center gap-4">
              <label htmlFor="">Compared by</label>
              <select
                className="bg-white border rounded-sm"
                onChange={handleOnchangeStations}
              >
                <optgroup label="Select stations">
                  <option value="">
                    {isFetching ? "Loading..." : "All Stations"}
                  </option>
                  {!isFetching &&
                    dataStations?.data.map((item: any, key: number) => {
                      return (
                        <option key={key} value={item.stations_id}>
                          {item.stations_name}
                        </option>
                      );
                    })}
                </optgroup>
              </select>
            </div>
          </div>
          <div>
            <ul className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <li>
                <BarChart
                  title="Dissolved Oxygen (DO) Levels"
                  measurement="mg/L"
                  barData={dissoveOxygenData}
                  dataWaterQualityStatus={dataWaterQualityStatus}
                />
              </li>
              <li>
                <BarChart
                  title="pH Level Comparison"
                  measurement="pH Units"
                  barData={phData}
                  dataWaterQualityStatus={dataWaterQualityStatus}
                />
              </li>
              <li>
                <BarChart
                  title="Biochemical Oxygen Demand (BOD)"
                  measurement="mg/L"
                  barData={bodData}
                  dataWaterQualityStatus={dataWaterQualityStatus}
                />
              </li>
              {/* <li>
                <BarChart
                  title="Chemical Oxygen Demand (COD)"
                  measurement="mg/L"
                  barData={codData}
                  dataWaterQualityStatus={dataWaterQualityStatus}
                />
              </li> */}
              {/* <li>
                <BarChart
                  title="Turbidity Levels"
                  measurement="NTU"
                  barData={ntuData}
                  dataWaterQualityStatus={dataWaterQualityStatus}
                />
              </li> */}
              <li>
                <BarChart
                  title="Nitrate Concentration"
                  measurement="mg/L"
                  barData={nitrateData}
                  dataWaterQualityStatus={dataWaterQualityStatus}
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
