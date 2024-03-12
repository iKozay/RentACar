import Vehicle from "./Vehicle";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import SortFilterButtons from "./SortFilterButtons.jsx";

export default function VehicleList() {
  const [vehicles, setVehicles] = useState([]);
  const [sortedVehicles, setSortedVehicles] = useState([]);

  useEffect(() => {
    async function fetchVehicles() {
      const response = await fetch(
        "http://localhost:3000/api/vehicles/vehicles",
        {
          method: "GET",
          credentials: "include",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const vehiclesList = await response.json();
      setVehicles(vehiclesList);
      setSortedVehicles(vehiclesList); // Set sortedVehicles initially
    }
    fetchVehicles();
  }, []);

  const handleSortFilter = (sortedVehicles) => {
    setSortedVehicles(sortedVehicles);
  };

  return (
    <div className="bg-white">
      <SortFilterButtons setVehicles={handleSortFilter} vehicles={vehicles} />
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <hr className="my-8"/>
        <h2 className="sr-only">Vehicles</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 lg:grid-cols-2 ">
          {sortedVehicles.map((vehicle) => (
            <NavLink key={vehicle._id} to={`../reservation/book/${vehicle._id}`}>
              <Vehicle vehicle={vehicle} />
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}
