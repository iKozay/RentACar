import { useEffect, useState } from "react";
import Map from "../components/location/Map";

function LocationMap() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

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

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <h1>Select a branch</h1>
      {loading && <h3 className="text-lg">Loading...</h3>}
      {!loading && error && (
        <h3 className="text-lg text-red-500">Error loading the map</h3>
      )}
      {!loading && !error && (
        <div className="w-500 h-500">
          <Map location={currentLocation} />
        </div>
      )}
    </div>
  );
}

export default LocationMap;
