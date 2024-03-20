import { TileLayer, MapContainer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState ,useContext} from "react";
import { branchContext } from "../browsingPage/SearchBox";
import { useMap } from "react-leaflet";

import getGeocodeFromAddress from "../../utilities/getGeocodeFromAddress";
import L from "leaflet";
import isSelected from "../../utilities/isSelected";
import handleChangeBranch from "../../utilities/handleChangeBranch";

export default function Map({ location, branches, loc, setLoc}) {

  const {setBranchName} = useContext(branchContext);
  const [branchLocations, setBranchLocations] = useState([]);
  useEffect(()=>{
    function setter(){
      setLoc([location.latitude,location.longitude]);

    }
    setter();
  },[]);
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
        <Marker position={[location.latitude, location.longitude]} icon={redIcon}
          eventHandlers={{
            mouseover:(e)=>{
              e.target.openPopup();
            },
            mouseout:(e)=>{
              e.target.closePopup();
            },
            click:(e)=>{
               const position=e.target.getLatLng();
               setLoc([position.lat,position.lng])
            }
            
          }}>
          <Popup>{currentCity.display_name}</Popup>
        </Marker>
        {branchLocations.map((branchLocation, index) => (
          <Marker
            key={index}
            position={[
              branchLocation.position.lat,
              branchLocation.position.lon,
            ]}
            icon={
              isSelected(branchLocation.name) ? selectedPurpleIcon : blueIcon
            }
            eventHandlers={{
              click: (e) => {
                const position = e.target.getLatLng();
                handleChangeBranch(branchLocation.name);
                setBranchName(branchLocation.name);
               setLoc([position.lat,position.lng])

              },
              mouseover:(e)=>{
                e.target.openPopup();
              },
              mouseout:(e)=>{
                e.target.closePopup();
              }
              ,


            }}
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
