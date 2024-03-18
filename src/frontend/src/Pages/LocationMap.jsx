import { useEffect, useState } from "react";
import Map from "../components/location/Map";
import fetchData from "../utilities/fetchData";

function LocationMap() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [branches, setBranches] = useState([]);
  const [branchNotFound, setBranchNotFound] = useState(false);
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
          console.log(data);
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
          <div className="w-500 h-500">
            <Map location={currentLocation} branches={branches} />
          </div>
        )}
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Branches</h2>
        <div className="space-y-4">
          {branches.length > 0 ? (
            branches.map((branch, index) => (
              <div
                key={index}
                className="p-4 bg-gray-100 rounded-lg flex flex-col"
              >
                {/* Display branch information */}
                <p className="text-lg font-semibold">{branch.name}</p>
                <p className="text-gray-600">{branch.address}</p>
              </div>
            ))
          ) : (
            <div className="text-red-500">No branches found</div>
          )}
        </div>
        {branchNotFound && (
          <div className="text-red-500">Error retrieving branches</div>
        )}
      </div>
    </div>
  );
}

export default LocationMap;
