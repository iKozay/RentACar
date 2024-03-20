import { useEffect, useState, useContext } from "react";
import Map from "../components/location/Map";
import fetchData from "../utilities/fetchData";
import isSelected from "../utilities/isSelected";
import { branchContext } from "../components/browsingPage/SearchBox";
import handleChangeBranch from "../utilities/handleChangeBranch";

function LocationMap() {
  const { setBranchName } = useContext(branchContext);

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [branches, setBranches] = useState([]);
  const [branchNotFound, setBranchNotFound] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 0,
    longitude: 0,
    display_name: "",
  });

  const [lastFetchTime, setLastFetchTime] = useState(0);

  useEffect(() => {
    // Function to get current city name
    function getCurrentCityName(position) {
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
          setCurrentLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            display_name: `${data.address.road}, ${data.address.city}, ${data.address.country}`,
          });
          setError(false);
        })
        .catch(() => {
          setError(true);
        })
        .finally(() => setLoading(false));
    }

    setLoading(true);
    const currentTime = Date.now();
    if (currentTime - lastFetchTime > 2000) {
      navigator.geolocation.getCurrentPosition((position) => {
        getCurrentCityName(position);
        setLastFetchTime(currentTime);
      });
    }
  }, [lastFetchTime]);

  useEffect(() => {
    async function fetchBranches() {
      const response = await fetchData("http://localhost:3000/api/branches", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data) {
        setBranches(response.data);
        setBranchNotFound(false);
      } else if (response.error) {
        setBranchNotFound(true);
      }
    }
    fetchBranches();
  }, []);

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
            <div className="w-300 h-300">
              <Map
                location={currentLocation}
                branches={branches}
                trigger={trigger}
                setTrigger={setTrigger}
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
                            handleChangeBranch(branch.name);
                            setTrigger(!trigger);
                            setBranchName(branch.name);
                          }}
                        >
                          <p className="text-lg font-semibold">
                            {branch.name}
                          </p>
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
                            handleChangeBranch(branch.name);
                            setTrigger(!trigger);
                            setBranchName(branch.name);
                          }}
                        >
                          <p className="text-lg font-semibold">
                            {branch.name}
                          </p>
                          <p className="text-gray-600">{branch.address}</p>
                        </button>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
              {branchNotFound && (
                <div className="text-red-500">
                  Error retrieving branches
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LocationMap;
