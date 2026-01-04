import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import { LatLngExpression, LatLngTuple } from "leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { lagunaCenterCoordinates } from "../helper/helper-functions";

// Define an interface or type alias for the props/parameters
interface MyComponentProps {
  dataStations: any;
  // other props...
}

const InteractiveMap = ({ dataStations }: MyComponentProps) => {
  return (
    <>
      <MapContainer
        zoom={11}
        scrollWheelZoom={false}
        center={[lagunaCenterCoordinates.lat, lagunaCenterCoordinates.lng]}
        style={{ height: "100%", width: "100%", zIndex: "10" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          position={[lagunaCenterCoordinates.lat, lagunaCenterCoordinates.lng]}
          draggable={false}
        >
          <Popup>
            A Sample <br /> Popup
          </Popup>
        </Marker>
      </MapContainer>
    </>
  );
};

export default InteractiveMap;
