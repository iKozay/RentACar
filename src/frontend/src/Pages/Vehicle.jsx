import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import fetchData from "../utilities/fetchData";
import Button from "../components/generalPurpose/Button";
import ViewReservations from "../components/dashboard/ViewReservations";
export default function Vehicle() {
  const { vehicleId } = useParams();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [vehicle, setVehicle] = useState(null);
  const [reservations,setReservations]=useState(null);
  const [deleteBtn, setDeleteBtn] = useState(false);
  const [updateBtn, setUpdateBtn] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [updating, setUpdating] = useState(null);
  const [showReservations,setShowReservations]=useState(false);
  useEffect(() => {
    async function fetchVehicle() {
      setLoading(true);
      const [vehicleData,vehicleReservations] = await Promise.all([
        fetchData(
        `http://localhost:3000/api/vehicles/vehicle/${vehicleId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),
      fetchData(
        `http://localhost:3000/api/reservations/vehicle/${vehicleId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),
    ])
      if (vehicleData.data && vehicleReservations.data) {
        setVehicle(vehicleData.data);
        setReservations(vehicleReservations.data)
        setLoading(false);
        setSuccess(true);
      } else if (vehicleData.error || vehicleReservations.error) {
        setLoading(false);
        setError(true);
      }
    }
    fetchVehicle();
  }, [vehicleId]);

  const handleClickUpdateVehicle = () => {
    setUpdateBtn(true);
  };

  const handleClickDeleteVehicle = () => {
    setDeleteBtn(true);
  };

  const handleCancelDelete = () => {
    setDeleteBtn(false);
  };

  const handleCancelUpdate = () => {
    setUpdateBtn(false);
  };

  const handleDeleteVehicle = async () => {
    let response =await fetchData(
      `http://localhost:3000/api/reservations/vehicle/${vehicleId}`
      ,{
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    ;
    if(response.data){
     response = await fetchData(
      `http://localhost:3000/api/vehicles/delete/${vehicleId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );}
    setDeleting(response);
  };

  const handleUpdateVehicle = async (event) => {
    event.preventDefault();

    // Retrieve values from form fields
    const make = document.getElementById("make").value;
    const model = document.getElementById("model").value;
    const price = document.getElementById("price").value;
    const numberOfSeats = document.getElementById("numberOfSeats").value;
    const address = document.getElementById("address").value;
    const colour = document.getElementById("colour").value;
    const numberOfDoors = document.getElementById("numberOfDoors").value;
    const numberOfBaggage = document.getElementById("numberOfBaggage").value;
    const kilometrage = document.getElementById("kilometrage").value;
    const electricalOrFuel = document.getElementById("electricalOrFuel").value;
    const Image = document.getElementById("Image").value;

    // Construct updated data object
    const updatedData = {
      make,
      model,
      price,
      numberOfSeats,
      address,
      colour,
      numberOfDoors,
      numberOfBaggage,
      kilometrage,
      electricalOrFuel,
      Image,
    };

    // Make PUT request to update vehicle information
    const response = await fetchData(
      `http://localhost:3000/api/vehicles/update/${vehicleId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(updatedData),
      }
    );

    // Update state with response
    setUpdating(response);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">Vehicle Details</h1>
      {success ? (
        !deleteBtn && !updateBtn ? (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-6 flex flex-col lg:flex-row">
              <div className="w-full lg:w-1/2 lg:mr-6">
                <div className="p-6">
                  <img
                    src={vehicle.Image}
                    alt="Vehicle"
                    className="object-contain max-h-64 w-full mb-4"
                  />
                  {/* Other vehicle details */}
                </div>
              </div>
              <div className="w-full lg:w-1/2">
                <div className="p-6">
                  <p className="text-medium font-semibold mb-2">
                    Vehicle ID: {vehicle._id}
                  </p>
                  <p className="text-gray-500 mb-2">Make: {vehicle.make}</p>
                  <p className="text-gray-500 mb-2">Model: {vehicle.model}</p>
                  <p className="text-gray-500 mb-2">Price: {vehicle.price}</p>
                  <p className="text-gray-500 mb-2">
                    Number of Seats: {vehicle.numberOfSeats}
                  </p>
                  <p className="text-gray-500 mb-2">
                    Address: {vehicle.address}
                  </p>
                  <p className="text-gray-500 mb-2">Colour: {vehicle.colour}</p>
                  <p className="text-gray-500 mb-2">
                    Number of Doors: {vehicle.numberOfDoors}
                  </p>
                  <p className="text-gray-500 mb-2">
                    Number of Baggage: {vehicle.numberOfBaggage}
                  </p>
                  <p className="text-gray-500 mb-2">
                    Kilometrage: {vehicle.kilometrage}
                  </p>
                  <p className="text-gray-500 mb-2">
                    Electrical or Fuel: {vehicle.electricalOrFuel}
                  </p>

                 {showReservations && 
                 ( <>
                  <Button text={"minimize"}handler={setShowReservations} value={false} inline={true} color={"red"}/>
                  <ViewReservations reservations={reservations}/>
                  </>
                 )} 
                {
                  !showReservations &&
                  <Button text={"view reservations"}handler={setShowReservations} value={true} inline={true} color={"blue"}/>
                }
                </div>
                <div className="flex justify-end p-6">
                  <Button
                  
                    handler={handleClickUpdateVehicle}
                    color={"blue"}
                    text={"Update"}
                    inline={true}
                  />
                  <Button handler={handleClickDeleteVehicle} color={"red"} text={"Delete"} inline={true}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : deleteBtn ? (
          deleting ? (
            deleting.data ? (
              <div className="bg-green-100 text-green-900 px-4 py-3 rounded-md mb-4">
                Successfully deleted vehicle {vehicle._id}
              </div>
            ) : deleting.loading ? (
              <div className="bg-yellow-100 text-yellow-900 px-4 py-3 rounded-md mb-4">
                Attempting to delete vehicle {vehicle._id}...
              </div>
            ) : (
              <div className="bg-red-100 text-red-900 px-4 py-3 rounded-md mb-4">
                Failed to delete vehicle {vehicle._id}
              </div>
            )
          ) : (
            <div className="bg-white shadow-md rounded-lg overflow-hidden p-6">
              <p className="text-lg font-semibold mb-4">
                Are you sure you want to delete{" "}
                <span className="text-red-500">vehicle {vehicle._id}</span>?
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
                <Button handler={handleDeleteVehicle} color={"red"} text={"Delete"} inline={true}/>
                <Button handler={handleCancelDelete} color={"blue"} text={"Cancel"} inline={true}/>
              </div>
            </div>
          )
        ) : updateBtn ? (
          updating ? (
            updating.data ? (
              <div className="bg-green-100 text-green-900 px-4 py-3 rounded-md mb-4">
                Successfully updated vehicle {vehicle._id}
              </div>
            ) : updating.loading ? (
              <div className="bg-yellow-100 text-yellow-900 px-4 py-3 rounded-md mb-4">
                Attempting to update vehicle {vehicle._id}...
              </div>
            ) : (
              <div>
                <div className="bg-red-100 text-red-900 px-4 py-3 rounded-md mb-4">
                  Failed to update vehicle {vehicle._id}
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
              <p>Update vehicle {vehicle._id}:</p>
              <form onSubmit={handleUpdateVehicle}>
                <div className="grid grid-cols-1 gap-6 mt-6">
                  <label
                    htmlFor="make"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Make
                  </label>
                  <input
                    type="text"
                    name="make"
                    id="make"
                    defaultValue={vehicle.make}
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                  <label
                    htmlFor="model"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Model
                  </label>
                  <input
                    type="text"
                    name="model"
                    id="model"
                    defaultValue={vehicle.model}
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />

                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    defaultValue={vehicle.price}
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />

                  <label
                    htmlFor="numberOfSeats"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Number of Seats
                  </label>
                  <input
                    type="number"
                    name="numberOfSeats"
                    id="numberOfSeats"
                    defaultValue={vehicle.numberOfSeats}
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />

                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    defaultValue={vehicle.address}
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />

                  <label
                    htmlFor="colour"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Colour
                  </label>
                  <input
                    type="text"
                    name="colour"
                    id="colour"
                    defaultValue={vehicle.colour}
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />

                  <label
                    htmlFor="numberOfDoors"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Number of Doors
                  </label>
                  <input
                    type="number"
                    name="numberOfDoors"
                    id="numberOfDoors"
                    defaultValue={vehicle.numberOfDoors}
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />

                  <label
                    htmlFor="numberOfBaggage"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Number of Baggage
                  </label>
                  <input
                    type="number"
                    name="numberOfBaggage"
                    id="numberOfBaggage"
                    defaultValue={vehicle.numberOfBaggage}
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />

                  <label
                    htmlFor="kilometrage"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Kilometrage
                  </label>
                  <input
                    type="number"
                    name="kilometrage"
                    id="kilometrage"
                    defaultValue={vehicle.kilometrage}
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />

                  <label
                    htmlFor="electricalOrFuel"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Electrical or Fuel
                  </label>
                  <input
                    type="text"
                    name="electricalOrFuel"
                    id="electricalOrFuel"
                    defaultValue={vehicle.electricalOrFuel}
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />

                  <label
                    htmlFor="Image"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Image URL
                  </label>
                  <input
                    type="text"
                    name="Image"
                    id="Image"
                    defaultValue={vehicle.Image}
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div className="mt-6">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded mr-4"
                  >
                    Update Vehicle
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
        <h2 className="bg-red-100 text-red-900 px-4 py-3 rounded-md mb-4">
          Error
        </h2>
      ) : (
        ""
      )}
    </div>
  );
}
