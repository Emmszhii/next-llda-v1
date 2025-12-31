import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import { LatLngExpression, LatLngTuple } from "leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

const InteractiveMap = () => {
  return (
    <>
      <MapContainer
        zoom={13}
        scrollWheelZoom={false}
        center={[51.505, -0.09]}
        style={{ height: "100%", width: "100%", zIndex: "10" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]} draggable={false}>
          <Popup>
            A Sample <br /> Popup
          </Popup>
        </Marker>
      </MapContainer>
    </>
  );
};

export default InteractiveMap;
