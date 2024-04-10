import Vehicle from "./Vehicle";
import { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import SortFilterButtons from "./SortFilterButtons.jsx";
import getBranch from "../../utilities/getBranch.js";
import { branchContext } from "../../Pages/BrowsingPage";
export default function VehicleList() {
  const context = useContext(branchContext);
  const { branchName } = context || {}; 
  const [vehicles, setVehicles] = useState([]);
  const [trigger,setTrigger]=useState(false);
  const [sortedVehicles, setSortedVehicles] = useState([]);

  useEffect(() => {
    async function fetchVehicles() {
      const response = await fetch(
        `http://localhost:3000/api/branches/${getBranch().id}`,
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
      const branch = await response.json();
      setVehicles(branch.vehicles);
      setSortedVehicles(branch.vehicles); // Set sortedVehicles initially
    }
    fetchVehicles();
  }, [branchName]);

  return (
   
    <div className="bg-white">
      <SortFilterButtons allVehicles={vehicles} sortedVehicles={sortedVehicles} setVehicles={(v)=>{setSortedVehicles(v)}} />
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <hr className="my-8"/>
        <h2 className="sr-only">Vehicles</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 lg:grid-cols-2 ">
          {sortedVehicles && sortedVehicles.map((vehicle) => (
            <NavLink key={vehicle._id} to={`../reservation/book/${vehicle._id}`}>
              <Vehicle vehicle={vehicle} />
            </NavLink>
          ))}
        </div>
      </div>
    </div>

  );
}
