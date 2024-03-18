import { TileLayer, MapContainer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import getGeocodeFromAddress from "../../utilities/getGeocodeFromAddress";
import L from "leaflet";

export default function Map({ location, branches }) {
  const [branchLocations, setBranchLocations] = useState([]);

  const currentCity = location;
  const loc = [location.latitude, location.longitude];
  const redIcon = new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
    // shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
  useEffect(() => {
    async function fetchBranchLocations() {
      const branchLocationsData = await Promise.all(
        branches.map(async (branch) => {
          return {
            position: await getGeocodeFromAddress(branch.address),
            name: branch.name,
          };
        })
      );
      setBranchLocations(branchLocationsData);
    }
    fetchBranchLocations();
  }, [branches]);

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
        <Marker position={loc} icon={redIcon}>
          <Popup>{currentCity.display_name}</Popup>
        </Marker>
        {branchLocations.map((branchLocation) => (
          <Marker
            key={`${branchLocation.position.lat}-${branchLocation.position.lon}`}
            position={[
              branchLocation.position.lat,
              branchLocation.position.lon,
            ]}
          >
            <Popup>{branchLocation.name}</Popup>
          </Marker>
        ))}

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
