import { TileLayer, MapContainer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useContext } from "react";
import { branchContext } from "../../Pages/BrowsingPage";
import { useMap } from "react-leaflet";
import L from "leaflet";
import isSelected from "../../utilities/isSelected";
import handleChangeBranch from "../../utilities/handleChangeBranch";

export default function Map({ location, branches, loc, setLoc }) {
  const { setBranchName } = useContext(branchContext);

  useEffect(() => {
    function setter() {
      setLoc([location.latitude, location.longitude]);
    }
    setter();
  }, []);
  const currentCity = location;
  // const loc = ;
  const redIcon = new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
  const selectedPurpleIcon = new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
  const blueIcon = new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  return (
    <div className="w-full h-full border border-gray-300 rounded-md">
      <MapContainer
        center={loc}
        zoom={10}
        scrollWheelZoom={true}
        className="h-full w-full"
        style={{ width: "400px", height: "400px" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          position={[location.latitude, location.longitude]}
          icon={redIcon}
          eventHandlers={{
            mouseover: (e) => {
              e.target.openPopup();
            },
            mouseout: (e) => {
              e.target.closePopup();
            },
            click: (e) => {
              const position = e.target.getLatLng();
              setLoc([position.lat, position.lng]);
            },
          }}
        >
          <Popup>{currentCity.display_name}</Popup>
        </Marker>
        {branches.map((branch, index) => (
          <Marker
            key={index}
            position={branch.latLon}
            icon={isSelected(branch.name) ? selectedPurpleIcon : blueIcon}
            eventHandlers={{
              click: (e) => {
                const position = e.target.getLatLng();
                handleChangeBranch(branch.name, branch.id);
                setBranchName(branch.name);
                setLoc([position.lat, position.lng]);
              },
              mouseover: (e) => {
                e.target.openPopup();
              },
              mouseout: (e) => {
                e.target.closePopup();
              },
            }}
          >
            <Popup>{branch.name}</Popup>
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
      map.setView(position);
    }
  }, [map, position]);

  return null;
}
