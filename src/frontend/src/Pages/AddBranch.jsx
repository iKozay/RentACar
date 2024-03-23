import { useState } from "react";
import fetchData from "../utilities/fetchData";

export default function AddBranch() {
  const [adding, setAdding] = useState(null);

  const handleCreateBranch = async (event) => {
    event.preventDefault();

    // Retrieve values from form fields
    const name = document.getElementById("name").value;
    const street = document.getElementById("street").value;
    const postalCode = document.getElementById("postalCode").value;
    const city = document.getElementById("city").value;
    const province = document.getElementById("province").value;

    // Retrieve vehicle IDs and reservation IDs
    const vehicleIds = document.getElementById("vehicleIds").value.split(",");
    const reservationIds = document.getElementById("reservationIds").value.split(",");

    // Construct data object
    const newData = {
      name,
      location: {
        street,
        postal_code: postalCode,
        city,
        province,
      },
      vehicles: vehicleIds ||[],
      reservations: reservationIds||[],
    };

    // Make POST request to add a new branch
    const response = await fetchData(`http://localhost:3000/api/branches`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(newData),
    });

    // Update state with response
    setAdding(response);
  };

  return (
    <div className="mb-2">
      {/* Rendering the success/error message based on 'adding' state */}
      {adding ? (
        adding.data ? (
          <div className="bg-green-100 text-green-900 px-4 py-3 rounded-md mb-4">
            Successfully added new branch
          </div>
        ) : adding.loading ? (
          <div className="bg-yellow-100 text-yellow-900 px-4 py-3 rounded-md mb-4">
            Attempting to add new branch...
          </div>
        ) : (
          <div>
            <div className="bg-red-100 text-red-900 px-4 py-3 rounded-md mb-4">
              Failed to add new branch
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
          <p>Add new branch:</p>
          {/* Form for adding a new branch */}
          <form onSubmit={handleCreateBranch}>
            <div className="grid grid-cols-1 gap-6 mt-3">
              {/* Input fields for branch details */}
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input type="text" name="name" id="name" className="..."/>

              <label htmlFor="street" className="...">Street</label>
              <input type="text" name="street" id="street" className="..."/>

              <label htmlFor="postalCode" className="...">Postal Code</label>
              <input type="text" name="postalCode" id="postalCode" className="..."/>

              <label htmlFor="city" className="...">City</label>
              <input type="text" name="city" id="city" className="..."/>

              <label htmlFor="province" className="...">Province</label>
              <input type="text" name="province" id="province" className="..."/>

              {/* Input fields for vehicle IDs and reservation IDs */}
              <label htmlFor="vehicleIds" className="...">Vehicle IDs (comma-separated)</label>
              <input type="text" name="vehicleIds" id="vehicleIds" className="..."/>

              <label htmlFor="reservationIds" className="...">Reservation IDs (comma-separated)</label>
              <input type="text" name="reservationIds" id="reservationIds" className="..."/>
            </div>
            <div className="mt-6">
              {/* Submit button */}
              <button type="submit"className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded mr-4">Add Branch</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
