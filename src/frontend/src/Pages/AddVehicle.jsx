import { useState } from "react";
import fetchData from "../utilities/fetchData";

export default function AddVehicle() {
  
  const [adding, setAdding] = useState(null);



  const handleCreateVehicle = async (event) => {
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

    // Make POST request to add a new vehicle
    const response = await fetchData(`http://localhost:3000/api/vehicles/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(updatedData),
    });

    // Update state with response
    setAdding(response);
  };

  return (
    <div className="mb-2">
      {adding ? (
        adding.data ? (
          <div className="bg-green-100 text-green-900 px-4 py-3 rounded-md mb-4">
            Successfully added new vehicle
          </div>
        ) : adding.loading ? (
          <div className="bg-yellow-100 text-yellow-900 px-4 py-3 rounded-md mb-4">
            Attempting to add new vehicle...
          </div>
        ) : (
          <div>
            <div className="bg-red-100 text-red-900 px-4 py-3 rounded-md mb-4">
              Failed to add new vehicle
            </div>
            {adding.error && (
              <div className="bg-red-100 text-red-900 px-4 py-3 rounded-md mb-4">
                {adding.error.errors ? (
                  <div>
                    {adding.error.errors.map((message, index) => (
                      <p key={index}>{message.msg}</p>
                    ))}
                  </div>
                ) : (
                  <p>{adding.error.error}</p>
                )}
              </div>
            )}
          </div>
        )
      ) : (
        <div>
          <p>Add new vehicle:</p>
          <form onSubmit={handleCreateVehicle}>
            <div className="grid grid-cols-1 gap-6 mt-3">
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
                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded mr-4"
              >
                Add Vehicle
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
