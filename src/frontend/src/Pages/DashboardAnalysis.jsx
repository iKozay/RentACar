import { useEffect, useState } from "react";
import fetchData from "../utilities/fetchData";
import { Link } from "react-router-dom";

export default function DashboardAnalysis() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [numbers, setNumbers] = useState({});

  useEffect(() => {
    async function fetchEverything() {
      setLoading(true);
      const [branches, vehicles, customers, reservations] = await Promise.all([
        fetchData("http://localhost:3000/api/branches/count", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }),
        fetchData("http://localhost:3000/api/vehicles/count", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }),
        fetchData("http://localhost:3000/api/users/customers/count", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }),
        fetchData("http://localhost:3000/api/reservations/count", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }),
      ]);
      if (branches.data && vehicles.data && customers.data && reservations.data) {
        setLoading(false);
        setSuccess(true);
        setNumbers({ customers: customers.data.count, vehicles: vehicles.data.count, reservations: reservations.data.count, branches: branches.data.count });
      } else {
        setLoading(false);
        setError(true);
      }
    }
    fetchEverything();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Admin Dashboard</h1>
      <div className="grid grid-cols-2 gap-4">
        {success && (
          <>
            <Link to="/dashboard/customers">
              <div className="bg-blue-200 hover:bg-blue-300 p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-2">Customers</h2>
                <div className="text-3xl font-bold text-blue-800">{numbers.customers}</div>
              </div>
            </Link>
            <Link to="/dashboard/branches">
              <div className="bg-green-200 hover:bg-green-300 p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-2">Branches</h2>
                <div className="text-3xl font-bold text-green-800">{numbers.branches}</div>
              </div>
            </Link>
            <Link to="/dashboard/vehicles">
              <div className="bg-yellow-200 hover:bg-yellow-300 p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-2">Vehicles</h2>
                <div className="text-3xl font-bold text-yellow-800">{numbers.vehicles}</div>
              </div>
            </Link>
            <Link to="/dashboard/reservations">
              <div className="bg-purple-200 hover:bg-purple-300 p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-2">Reservations</h2>
                <div className="text-3xl font-bold text-purple-800">{numbers.reservations}</div>
              </div>
            </Link>
          </>
        )}
        {loading && <div className="text-center text-gray-700">Loading...</div>}
        {error && <div className="text-center text-red-600">Failed to fetch data.</div>}
      </div>
    </div>
  );
}
