import BarChart from "./(chart)/BarChart";

// Define an interface or type alias for the props/parameters
interface MyComponentProps {
  isLoading: boolean;
  isFetching: boolean;
  data: object;
  // other props...
}

export default function WaterQualityChart({
  isLoading,
  isFetching,
  data,
}: MyComponentProps) {
  return (
    <>
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
              <label htmlFor="">Time Period</label>
              <select className="bg-white border rounded-sm">
                <optgroup label="Select time period">
                  <option value="">Last 1 year</option>
                  <option value="2">Last 2 year</option>
                  <option value="3">Last 3 year</option>
                </optgroup>
              </select>
            </div>
            <div className="relative flex items-center gap-4">
              <label htmlFor="">Compared by</label>
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
    </>
  );
}
