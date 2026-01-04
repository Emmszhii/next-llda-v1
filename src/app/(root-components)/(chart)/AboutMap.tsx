import {
  arrayOfMonthsColors,
  lagunaCenterCoordinates,
} from "@/src/components/helper/helper-functions";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";
import React from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { Icon, divIcon } from "leaflet";
import { FaChevronDown } from "react-icons/fa6";

// Define an interface or type alias for the props/parameters
interface MyComponentProps {
  dataStations: any;
  // other props...
}

const AboutMap = ({ dataStations }: MyComponentProps) => {
  const [isShowLegends, setIsShowLegends] = React.useState(false);
  const stationsArray = dataStations?.data.map((item: any) => {
    return {
      ...item,
      color_key: Math.round(Math.random() * 10),
    };
  });
  const legendsArr = stationsArray;

  return (
    <>
      <MapContainer
        zoom={10}
        scrollWheelZoom={false}
        center={[lagunaCenterCoordinates.lat, lagunaCenterCoordinates.lng]}
        style={{ height: "100%", width: "100%", zIndex: "10" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {stationsArray.map((item: any, key: number) => {
          const iconDiv = divIcon({
            // className: `bg-[${
            //   arrayOfMonthsColors[item.color_key]
            // }] rounded-full border border-black`,
            // iconSize: [5, 5],
            // popupAnchor: [0, -10],
            html: `<div style="border-radius:100%;position:relative;top:-5px;left:-5px;display:block; width:20px; height:20px ;background-color: ${
              arrayOfMonthsColors[item.color_key]
            };">
            
            </div>`,
          });
          return (
            <Marker
              key={key}
              position={[item.stations_latitude, item.stations_longgitude]}
              icon={iconDiv}
            >
              <Popup>{item.stations_name}</Popup>
            </Marker>
          );
        })}
      </MapContainer>

      <div className="absolute z-10 bg-gray-300 bottom-2 left-2 w-fit px-2 py-1 rounded-sm">
        <div className="text-xs">
          <div
            className="flex items-center justify-between hover:underline cursor-pointer"
            onClick={() => setIsShowLegends((prev) => !prev)}
          >
            <h4 className="font-bold">Legends:</h4>
            <button
              type="button"
              className={`${isShowLegends ? "" : "rotate-180"} transition-all`}
            >
              <FaChevronDown />
            </button>
          </div>
          <ul
            className={`pr-4 flex flex-col gap-1 py-1 ${
              isShowLegends ? "h-full" : "h-10"
            } transition-all overflow-hidden`}
          >
            {legendsArr.map((item: any, key: any) => {
              const color = arrayOfMonthsColors[item.color_key];
              return (
                <li key={key} className="flex items-center gap-2">
                  <div
                    className="block size-5 rounded-full"
                    style={{ background: color }}
                  ></div>
                  <h5>{item.stations_name}</h5>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default AboutMap;
