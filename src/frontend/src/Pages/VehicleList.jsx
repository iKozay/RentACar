import Vehicle from "../components/browsingPage/Vehicle";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
export default function VehicleList() {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    async function fetchVehicles() {
      const response = await fetch(
        "http://localhost:3000/api/vehicles/vehicles",
        {
          method: "GET",
          credentials: "include", // Include cookies in the request
          mode: "cors", // Enable CORS
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const vehiclesList = await response.json();
      setVehicles(vehiclesList);
    }
    // Here is where the fetching from the database need to happen
    // for now, I will just use the vehicles list
    // const fetchVehicles = () => {setVehicles(vehiclesList);}
    fetchVehicles();
  }, []); // empty dependency array means that fetching happens only once when the component is rendered
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Vehicles</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 lg:grid-cols-2 ">
          {vehicles &&
            vehicles.map((vehicle) => (
              <NavLink key={vehicle._id} to={`../reservation/book/${vehicle._id}`}>
                <Vehicle vehicle={vehicle} />
              </NavLink>
            ))}
        </div>
      </div>
    </div>
  );
}
