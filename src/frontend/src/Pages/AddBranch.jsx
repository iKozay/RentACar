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

    // Construct data object
    const newData = {
      name,
      location: {
        street,
        postal_code: postalCode,
        city,
        province,
      },
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
          <form onSubmit={handleCreateBranch}>
            <div className="grid grid-cols-1 gap-6 mt-3">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
              <label
                htmlFor="street"
                className="block text-sm font-medium text-gray-700"
              >
                Street
              </label>
              <input
                type="text"
                name="street"
                id="street"
                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />

              <label
                htmlFor="postalCode"
                className="block text-sm font-medium text-gray-700"
              >
                Postal Code
              </label>
              <input
                type="text"
                name="postalCode"
                id="postalCode"
                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />

              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700"
              >
                City
              </label>
              <input
                type="text"
                name="city"
                id="city"
                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />

              <label
                htmlFor="province"
                className="block text-sm font-medium text-gray-700"
              >
                Province
              </label>
              <input
                type="text"
                name="province"
                id="province"
                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded mr-4"
              >
                Add Branch
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
