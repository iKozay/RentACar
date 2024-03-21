import { Link } from "react-router-dom";
import fetchData from "../utilities/fetchData";
import { useState, useEffect } from "react";

export default function Branches() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [vehicles, setVehicles] = useState([]);
  const [minimized, setMinimized] = useState(false);

  useEffect(() => {
    async function fetchVehicles() {
      setLoading(true);
      const response = await fetchData(
        "http://localhost:3000/api/vehicles/vehicles",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data) {
        setVehicles(response.data);
        setLoading(false);
        setSuccess(true);
      } else if (response.error) {
        setLoading(false);
        setError(true);
      }
      setLoading(false);
    }
    fetchVehicles();
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Vehicles</h2>
        <div>
          <button
            onClick={() => setMinimized(!minimized)}
            className="px-3 py-2 bg-blue-500 text-white rounded-md mr-2"
          >
            {minimized ? "Expand" : "Minimize"}
          </button>
          <Link
            to="add-vehicle"
            className="px-3 py-2 bg-green-500 text-white rounded-md"
          >
            Add Vehicle
          </Link>
        </div>
      </div>
      {!minimized && (
        <div className="border border-collapse">
          <div className="bg-gray-100 flex p-2">
            <div className="flex-1 text-center">Make</div>
            <div className="flex-1 text-center">Model</div>
            <div className="flex-1 text-center">Price</div>
            <div className="flex-1 text-center">Image</div>
          </div>
          {success ? (
            vehicles.map((vehicle, index) => (
              <Link
                key={vehicle._id}
                to={`${vehicle._id}`}
                className={`flex items-center p-3 ${
                  index % 2 === 0 ? "bg-gray-200" : "bg-white"
                } border border-gray-300 hover:border-gray-700 rounded-md`}
                style={{ textDecoration: "none" }}
              >
                <div className="flex-1 text-center">{vehicle.make}</div>
                <div className="flex-1 text-center">{vehicle.model}</div>
                <div className="flex-1 text-center">{vehicle.price}</div>
                <div className="flex-1 text-center">
                  <img
                    src={`${vehicle.Image}`}
                    alt=""
                    style={{textAlign:"center", maxWidth: "100px" }}
                  />
                </div>
              </Link>
            ))
          ) : (
            <div className="p-2">
              {loading ? "Loading..." : "Failed to load vehicles"}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
