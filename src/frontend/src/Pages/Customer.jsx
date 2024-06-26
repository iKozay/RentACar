import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import fetchData from "../utilities/fetchData";
import ViewReservations from "../components/dashboard/ViewReservations";
import Button from "../components/generalPurpose/Button";

export default function Customer() {
  const { customerId } = useParams();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [customer, setCustomer] = useState(null);
  const [deleteBtn, setDeleteBtn] = useState(false);
  const [updateBtn, setUpdateBtn] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [updating, setUpdating] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [viewReservation, setViewReservation] = useState(false);
  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      const [getCustomer, getReservations] = await Promise.all([
        fetchData(`http://localhost:3000/api/users/${customerId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }),
        fetchData(`http://localhost:3000/api/reservations/user/${customerId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }),
      ]);
      if (getCustomer.data && getReservations.data) {
        setCustomer(getCustomer.data);
        setReservations(getReservations.data);
        setLoading(false);
        setSuccess(true);
      } else if (getCustomer.error || getReservations.error) {
        setLoading(false);
        setError(true);
      }
      setLoading(false);
    }
    fetchUser();
  }, [customerId]);

  const handleClickUpdateUser = () => {
    setUpdateBtn(true);
  };

  const handleClickDeleteUser = () => {
    setDeleteBtn(true);
  };
  const handleCancelDelete = () => {
    setDeleteBtn(false);
  };
  const handleCancelUpdate = () => {
    setUpdateBtn(false);
  };
  const handleDeleteUser = async () => {
    let response = await fetchData(
      `http://localhost:3000/api/reservations/user/${customerId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if(response.data){    
      await fetchData(
      `http://localhost:3000/api/users/${customerId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    }
    setDeleting(response);
  };

  const handleUpdateUser = async (event) => {
    event.preventDefault();
    const updatedData = {
      username: document.getElementById("username").value,
      first_name: document.getElementById("firstName").value,
      last_name: document.getElementById("lastName").value,
      email: document.getElementById("email").value,
      date_of_birth: document.getElementById("dateOfBirth").value,
      role: document.getElementById("role").value,
      profile_picture: document.getElementById("picture").value,
      phone_number: document.getElementById("phoneNumber").value,
    };

    const passwordValue = document.getElementById("password").value.trim();
    if (passwordValue !== "") {
      updatedData.password = passwordValue;
    }

    console.log(updatedData);
    // Make PUT request to update customer information
    const response = await fetchData(
      `http://localhost:3000/api/users/${customerId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(updatedData), // Send updated data in the request body
      }
    );
    console.log(response.error);
    setUpdating(response);
  };

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
              <hr />
              <p className="text-medium font-semibold mb-2">Reservations</p>
              {viewReservation && (
                <>
                  {reservations && <ViewReservations reservations={reservations}/>}
                  <button
                    onClick={() => setViewReservation(false)}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded mr-2"
                  >
                    Minimize
                  </button>
                </>
              )}
              {!viewReservation && (
                <button
                  onClick={() => setViewReservation(true)}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded"
                >
                  View Reservations
                </button>
              )}
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
            ) : deleting.loading ? (
              <div className="bg-yellow-100 text-yellow-900 px-4 py-3 rounded-md mb-4">
                Attempting to delete {customer.username}...
              </div>
            ) : (
              <div className="bg-red-100 text-red-900 px-4 py-3 rounded-md mb-4">
                Failed to delete {customer.username}
              </div>
            )
          ) : (
            <div className="bg-white shadow-md rounded-lg overflow-hidden p-6">
              <p className="text-lg font-semibold mb-4">
                Are you sure you want to delete{" "}
                <span className="text-red-500">{customer.username}</span>?
              </p>
              {reservations.length>0 &&<p className="text-lg font-semibold mb-4">
              <span className="text-red-500">{reservations.length}</span> associated reservations will be  deleted
              </p>}
              {reservations.length==0 &&
              <p className="text-lg font-semibold mb-4">
                 No associated reservations
              </p>
              }
             
              <div className="flex justify-end">
              <Button handler={handleDeleteUser} inline={true} color={"red"} text={"Delete"}/>
              <Button handler={handleCancelDelete} inline={true} color={"blue"} text={"Cancel"}/>
           
              </div>
            </div>
          )
        ) : updating ? (
          updating.data ? (
            <div className="bg-green-100 text-green-900 px-4 py-3 rounded-md mb-4">
              Successfully updated {customer.username}
            </div>
          ) : updating.loading ? (
            <div className="bg-yellow-100 text-yellow-900 px-4 py-3 rounded-md mb-4">
              Attempting to update {customer.username}...
            </div>
          ) : (
            <div>
              <div className="bg-red-100 text-red-900 px-4 py-3 rounded-md mb-4">
                Failed to update {customer.username}
              </div>
              {updating.error && (
                <div className="bg-red-100 text-red-900 px-4 py-3 rounded-md mb-4">
                  {updating.error.errors ? (
                    <div>
                      {updating.error.errors.map((message, index) => (
                        <p key={index}>{message.msg}</p>
                      ))}
                    </div>
                  ) : (
                    <p>{updating.error.error}</p>
                  )}
                </div>
              )}
            </div>
          )
        ) : (
          <div>
            <p>Update customer {customer.username}:</p>
            <form action="" className="mt-4">
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  defaultValue={customer.username}
                  required
                />
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First name
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  defaultValue={customer["first_name"]}
                  required
                />
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last name
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  defaultValue={customer["last_name"]}
                  required
                />
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  defaultValue={customer["email"]}
                  required
                />
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="text"
                  name="phoneNumber"
                  id="phoneNumber"
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  defaultValue={customer["phone_number"]}
                  required
                />
                <label
                  htmlFor="dateOfBirth"
                  className="block text-sm font-medium text-gray-700"
                >
                  Date of birth
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  id="dateOfBirth"
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  defaultValue={
                    new Date(customer["date_of_birth"])
                      .toISOString()
                      .split("T")[0]
                  }
                  required
                />
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-700"
                >
                  Role
                </label>
                <input
                  type="text"
                  name="role"
                  id="role"
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  defaultValue={customer["role"]}
                  required
                />
                <label
                  htmlFor="picture"
                  className="block text-sm font-medium text-gray-700"
                >
                  Profile picture
                </label>
                <input
                  type="text"
                  name="picture"
                  id="picture"
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  defaultValue={customer["profile_picture"]}
                  required
                />
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  placeholder="Enter new password to reset"
                />
              </div>

              <div className="flex justify-end">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded mr-4"
                  onClick={handleUpdateUser}
                >
                  Update
                </button>
                <button
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-4 py-2 rounded"
                  onClick={handleCancelUpdate}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )
      ) : loading ? (
        <h2 className="text-center text-gray-500">Loading...</h2>
      ) : error ? (
        <h2 className="bg-red-100 text-red-900 px-4 py-3 rounded-md mb-4">
          Error
        </h2>
      ) : (
        ""
      )}
    </div>
  );
}
