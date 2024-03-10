import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import fetchData from "../utilities/fetchData";

export default function Customer() {
  const { customerId } = useParams();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [customer, setCustomer] = useState(null);
  const [deleteBtn, setDeleteBtn] = useState(false);
  const [updateBtn, setUpdateBtn] = useState(false);
  const [deleting, setDeleting]=useState(null);
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

  const handleClickUpdateUser = () => {
    setUpdateBtn(true);
  };

  const handleClickDeleteUser = () => {
    setDeleteBtn(true);
  };  
  const handleCancelDelete = () => {
    setDeleteBtn(false);
  }
  const handleDeleteUser = async () => {
    const response = await fetchData(
        `http://localhost:3000/api/users/${customerId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setDeleting(response);
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">Customer Details</h1>
      {success ? (
        !deleteBtn && !updateBtn ? (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-6">
              <p className="text-lg font-semibold mb-2">{customer.full_name}</p>
              <p className="text-gray-500 mb-2">{customer.username}</p>
              <p className="text-gray-500 mb-2">{customer.email}</p>
              <p className="text-gray-500 mb-2">{customer.phone_number}</p>
              <p className="text-gray-500 mb-2">Role: {customer.role}</p>
            </div>
            <div className="flex justify-end p-6">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded mr-4"
                onClick={handleClickUpdateUser}
              >
                Update
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded"
                onClick={handleClickDeleteUser}
              >
                Delete
              </button>
            </div>
          </div>
        ) : deleteBtn ? (
            deleting ? (
              deleting.data ? (
                <div className="bg-green-100 text-green-900 px-4 py-3 rounded-md mb-4">
                  Successfully deleted {customer.username}
                </div>
              ) : (
                deleting.loading ? (
                  <div className="bg-yellow-100 text-yellow-900 px-4 py-3 rounded-md mb-4">
                    Attempting to delete {customer.username}...
                  </div>
                ) : (
                  <div className="bg-red-100 text-red-900 px-4 py-3 rounded-md mb-4">
                    Failed to delete {customer.username}
                  </div>
                )
              )
            ) : (
              <div className="bg-white shadow-md rounded-lg overflow-hidden p-6">
                <p className="text-lg font-semibold mb-4">
                  Are you sure you want to delete <span className="text-red-500">{customer.username}</span>?
                </p>
                <div className="flex justify-end">
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded mr-4"
                    onClick={handleDeleteUser}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-4 py-2 rounded"
                    onClick={handleCancelDelete}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )
          )
           : (
          <div>
            <p>Update customer {customer.username}:</p>
            <form action="" className="mt-4">
              <div className="mb-4">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  defaultValue={customer.username}
                />
              </div>
              {/* Add input fields for other customer attributes (e.g., email, phone number) */}
              {/* <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  defaultValue={customer.email}
                />
              </div> */}
              {/* Repeat similar structure for other attributes */}
              <div className="flex justify-end">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded mr-4">
                  Update
                </button>
                <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-4 py-2 rounded">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )
      ) : (
        <div className="text-center text-gray-500">Loading...</div>
      )}
    </div>
  );
}
