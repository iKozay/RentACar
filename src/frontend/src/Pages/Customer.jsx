import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import fetchData from "../utilities/fetchData";

export default function Customer() {
  const { customerId } = useParams();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      const response = await fetchData(
        `http://localhost:3000/api/users/${customerId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data) {
        setCustomer(response.data);
        setLoading(false);
        setSuccess(true);
      } else if (response.error) {
        setLoading(false);
        setError(true);
      }
      setLoading(false);
    }
    fetchUser();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">Customer Details</h1>
      {success ? (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6">
            <p className="text-lg font-semibold mb-2">{customer.full_name}</p>
            <p className="text-gray-500 mb-2">{customer.username}</p>
            <p className="text-gray-500 mb-2">{customer.email}</p>
            <p className="text-gray-500 mb-2">{customer.phone_number}</p>
            <p className="text-gray-500 mb-2">Role: {customer.role}</p>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500">Loading...</div>
      )}
    </div>
  );
}
