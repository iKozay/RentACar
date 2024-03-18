import { TileLayer, MapContainer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import { useMap } from "react-leaflet";

export default function Map({ location }) {
  const currentCity = location;
  const loc = [location.latitude, location.longitude];

  return (
    <div className="w-full h-full border border-gray-300 rounded-md">
      <MapContainer
        center={[0, 0]}
        zoom={13}
        scrollWheelZoom={true}
        className="h-full w-full"
        style={{ width: "500px", height: "500px" }} // Tailwind styling
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={loc}>
          <Popup>{currentCity.display_name}</Popup>
        </Marker>
 
        <FlyMapTo position={loc} />
      </MapContainer>
    </div>
  );
}

function FlyMapTo({ position }) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.flyTo(position);
    }
  }, [map, position]);

  return null;
}
