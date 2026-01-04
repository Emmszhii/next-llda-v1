import { lagunaCenterCoordinates } from "@/src/components/helper/helper-functions";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";
import React from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { Icon, divIcon } from "leaflet";

// Define an interface or type alias for the props/parameters
interface MyComponentProps {
  dataStations: any;
  // other props...
}

const AboutMap = ({ dataStations }: MyComponentProps) => {
  const stationsArray = dataStations?.data;
  const legendsArr = [
    { name: "Good", color: "#42B550" },
    { name: "Fair", color: "#F6D547" },
    { name: "Poor", color: "#DE3D30" },
  ];

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
            className: "bg-green-600 rounded-full border border-black",
            iconSize: [20, 20],
            popupAnchor: [0, -10],
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
          <h4 className="font-bold">Legends:</h4>
          <ul className="pr-4 flex flex-col gap-1 py-1">
            {legendsArr.map((item, key) => {
              return (
                <li key={key} className="flex items-center gap-2">
                  <div
                    className="block size-5 rounded-full"
                    style={{ background: item.color }}
                  ></div>
                  <h5>{item.name}</h5>
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
