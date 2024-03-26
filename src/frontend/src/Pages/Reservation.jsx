import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import fetchData from "../utilities/fetchData";

export default function Reservation() {
  const { reservationId } = useParams();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [reservation, setReservation] = useState(null);
  const [deleteBtn, setDeleteBtn] = useState(false);
  const [updateBtn, setUpdateBtn] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [updating, setUpdating] = useState(null);

  useEffect(() => {
    async function fetchReservation() {
      setLoading(true);
      const reservationData = await fetchData(
        `http://localhost:3000/api/reservations/${reservationId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (reservationData.data) {
        setReservation(reservationData.data);
        setLoading(false);
        setSuccess(true);
      } else if (reservationData.error) {
        setLoading(false);
        setError(true);
      }
    }
    fetchReservation();
  }, [reservationId]);

  const handleClickUpdateReservation = () => {
    setUpdateBtn(true);
  };

  const handleClickDeleteReservation = () => {
    setDeleteBtn(true);
  };

  const handleCancelDelete = () => {
    setDeleteBtn(false);
  };

  const handleCancelUpdate = () => {
    setUpdateBtn(false);
  };

  const handleDeleteReservation = async () => {
    const response = await fetchData(
      `http://localhost:3000/api/reservations/${reservationId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setDeleting(response);
  };

  const handleUpdateReservation = async (event) => {
    event.preventDefault();

    const reservationDate = document.getElementById("reservationDate").value;
    const pickupDate = document.getElementById("pickupDate").value;
    const returnDate = document.getElementById("returnDate").value;

    const updatedData = {
      reservationDate,
      pickupDate,
      returnDate,
    };

    const response = await fetchData(
      `http://localhost:3000/api/reservations/${reservationId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(updatedData),
      }
    );

    setUpdating(response);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">Reservation Details</h1>
      {success ? (
        !deleteBtn && !updateBtn ? (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-6">
              <img src={`${reservation.vin.Image}`} alt="Car" className="w-full max-h-96 object-cover mb-4" />
              <Link to={`../customers/${reservation.userID._id}`} className="text-blue-500 hover:underline">View Customer</Link>
              <p className="text-medium font-semibold mb-2">Reservation ID: {reservation._id}</p>
              <p className="text-gray-500 mb-2">Vehicle ID: <Link to={`../vehicles/${reservation.vin._id}`} className="text-blue-500 hover:underline">{reservation.vin._id}</Link></p>
              <p className="text-gray-500 mb-2">Reservation Date: {new Date(reservation.reservationDate).toLocaleString()}</p>
              <p className="text-gray-500 mb-2">Pickup Date: {new Date(reservation.pickupDate).toLocaleString()}</p>
              <p className="text-gray-500 mb-2">Return Date: {new Date(reservation.returnDate).toLocaleString()}</p>
            </div>
            <div className="flex justify-end p-6">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded mr-4"
                onClick={handleClickUpdateReservation}
              >
                Update
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded"
                onClick={handleClickDeleteReservation}
              >
                Delete
              </button>
            </div>
          </div>
        ) : deleteBtn ? (

            deleting ? (
              deleting.data ? (
                <div className="bg-green-100 text-green-900 px-4 py-3 rounded-md mb-4">
                  Successfully deleted reservation {reservation._id}
                </div>
              ) : deleting.loading ? (
                <div className="bg-yellow-100 text-yellow-900 px-4 py-3 rounded-md mb-4">
                  Attempting to delete reservation {reservation._id}...
                </div>
              ) : (
                <div className="bg-red-100 text-red-900 px-4 py-3 rounded-md mb-4">
                  Failed to delete reservation {reservation._id}
                </div>
              )
            ) : (
              <div className="bg-white shadow-md rounded-lg overflow-hidden p-6">
                <p className="text-lg font-semibold mb-4">
                  Are you sure you want to delete{" "}
                  <span className="text-red-500">reservation {reservation._id}</span>?
                </p>
                <div className="flex justify-end">
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded mr-4"
                    onClick={handleDeleteReservation}
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
          ) : updateBtn ? (
            updating ? (
              updating.data ? (
                <div className="bg-green-100 text-green-900 px-4 py-3 rounded-md mb-4">
                  Successfully updated reservation {reservation._id}
                </div>
              ) : updating.loading ? (
                <div className="bg-yellow-100 text-yellow-900 px-4 py-3 rounded-md mb-4">
                  Attempting to update reservation {reservation._id}...
                </div>
              ) : (
                <div>
                  <div className="bg-red-100 text-red-900 px-4 py-3 rounded-md mb-4">
                    Failed to update reservation {reservation._id}
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
                <p>Update customer reservation {reservation._id}:</p>
                <form onSubmit={handleUpdateReservation}>
                  <div className="grid grid-cols-1 gap-6 mt-6">
                    <label htmlFor="reservationDate" className="block text-sm font-medium text-gray-700">
                      Reservation Date
                    </label>
                    <input type="datetime-local" name="reservationDate" id="reservationDate" defaultValue={new Date(reservation.reservationDate).toISOString().slice(0, 16)} className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
  
                    <label htmlFor="pickupDate" className="block text-sm font-medium text-gray-700">
                      Pickup Date
                    </label>
                    <input type="datetime-local" name="pickupDate" id="pickupDate" defaultValue={new Date(reservation.pickupDate).toISOString().slice(0, 16)} className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
  
                    <label htmlFor="returnDate" className="block text-sm font-medium text-gray-700">
                      Return Date
                    </label>
                    <input type="datetime-local" name="returnDate" id="returnDate" defaultValue={new Date(reservation.returnDate).toISOString().slice(0, 16)} className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                  </div>
                  <div className="mt-6">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded mr-4">
                      Update Reservation
                    </button>
                  </div>
                </form>
              </div>
            )
          ) : (
            ""
          )
        ) : loading ? (
          <h2 className="text-center text-gray-500">Loading...</h2>
        ) : error ? (
          <h2 className="bg-red-100 text-red-900 px-4 py-3 rounded-md mb-4">Error</h2>
        ) : (
          ""
        )}
      </div>
    );
  }
  