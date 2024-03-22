import { useEffect, useState, useContext } from "react";
import Map from "../components/location/Map";
import fetchData from "../utilities/fetchData";
import isSelected from "../utilities/isSelected";
import { branchContext } from "./BrowsingPage";
import handleChangeBranch from "../utilities/handleChangeBranch";

function LocationMap() {
  const { setBranchName } = useContext(branchContext);

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [branches, setBranches] = useState([]);
  const [branchNotFound, setBranchNotFound] = useState(false);
  const [loc, setLoc] = useState([0, 0]);
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 0,
    longitude: 0,
    display_name: "",
  });

  useEffect(() => {
    setLoading(true);
    Promise.all([getCurrentLocation(), fetchBranchesData()])
      .then(([locationData, branchesData]) => {
        setCurrentLocation(locationData);
        setBranches(branchesData);
        setBranchNotFound(false);
      })
      .catch(() => {
        setError(true);
        setBranchNotFound(true);
      })
      .finally(() => setLoading(false));
  }, []);

  // Function to get current city name
  async function getCurrentLocation() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const url =
            "https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=" +
            position.coords.latitude +
            "&lon=" +
            position.coords.longitude;

          fetch(url, {
            method: "GET",
            mode: "cors",
          })
            .then((response) => response.json())
            .then((data) => {
              resolve({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                display_name: `${data.address.road}, ${data.address.city}, ${data.address.country}`,
              });
            })
            .catch(() => {
              reject("Error fetching current location");
            });
        },
        (error) => {
          reject("Error getting current location");
        }
      );
    });
  }

  async function fetchBranchesData() {
    const response = await fetchData("http://localhost:3000/api/branches", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.data) {
      return response.data;
    } else {
      throw new Error("Error fetching branches");
    }
  }

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-4">Select a Branch</h1>
      <div>
        {loading && <h3 className="text-lg">Loading...</h3>}
        {!loading && error && (
          <h3 className="text-lg text-red-500">Error loading the map</h3>
        )}
        {!loading && !error && currentLocation && branches && (
          <div className="flex">
            <div className="w-400 h-400">
              <Map
                location={currentLocation}
                branches={branches}
                loc={loc}
                setLoc={setLoc}
              />
            </div>
            <div className="overflow-y-scroll p-3 border h-350">
              <div className="space-y-4">
                {/* Render selected branch separately */}
                {branches.map((branch, index) => {
                  if (isSelected(branch.name)) {
                    return (
                      <div
                        key={index}
                        className={`p-4 rounded-lg flex flex-col bg-green-200 hover:bg-green-300`}
                      >
                        <button
                          onClick={() => {
                            handleChangeBranch(branch.name, branch.id);
                            setLoc(branch.latLon);
                            setBranchName(branch.name);
                          }}
                        >
                          <p className="text-lg font-semibold">{branch.name}</p>
                          <p className="text-gray-600">{branch.address}</p>
                        </button>
                      </div>
                    );
                  }
                  return null;
                })}
                {/* Render other branches */}
                {branches.map((branch, index) => {
                  if (!isSelected(branch.name)) {
                    return (
                      <div
                        key={index}
                        className={`p-4 rounded-lg flex flex-col bg-gray-100 hover:bg-green-100`}
                      >
                        <button
                          onClick={() => {
                            handleChangeBranch(branch.name, branch.id);
                            setLoc(branch.latLon);
                            setBranchName(branch.name);
                          }}
                        >
                          <p className="text-lg font-semibold">{branch.name}</p>
                          <p className="text-gray-600">{branch.address}</p>
                        </button>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
              {branchNotFound && (
                <div className="text-red-500">Error retrieving branches</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LocationMap;
