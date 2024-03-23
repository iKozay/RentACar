import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import fetchData from "../utilities/fetchData";
import ViewVehicles from "../components/dashboard/ViewVehicles";
import ViewReservations from "../components/dashboard/ViewReservations";
import Button from "../components/generalPurpose/Button";

export default function Branch() {
  const { branchId } = useParams();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [branch, setBranch] = useState(null);
  const [deleteBtn, setDeleteBtn] = useState(false);
  const [updateBtn, setUpdateBtn] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [updating, setUpdating] = useState(null);
  const [viewReservation, setViewReservation] = useState(false);
  const [viewVehicles, setViewVehicles] = useState(false);
  const [refresh,setRefresh]=useState(false);
  useEffect(() => {
    async function fetchBranch() {
      setLoading(true);
      const getBranch = await fetchData(
        `http://localhost:3000/api/branches/${branchId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (getBranch.data) {
        setBranch(getBranch.data);
        setLoading(false);
        setSuccess(true);
      } else if (getBranch.error) {
        setLoading(false);
        setError(true);
      }
      setLoading(false);
    }
    fetchBranch();
  }, [branchId]);

  const handleClickUpdateBranch = () => {
    setUpdateBtn(true);
  };

  const handleClickDeleteBranch = () => {
    setDeleteBtn(true);
  };
  const handleCancelDelete = () => {
    setDeleteBtn(false);
  };
  const handleCancelUpdate = () => {
    setUpdateBtn(false);
  };
  const handleRefreshBranch = async()=>{
    let response = await fetchData(`http://localhost:3000/api/branches/refresh/${branchId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(response);
    if(response.data){
      setRefresh(true);
    }
  }
  const handleDeleteBranch = async () => {
    let response = await fetchData(`http://localhost:3000/api/reservations`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(branch.reservations),
    });

    if (response.data) {
      response = await fetchData(
        `http://localhost:3000/api/branches/${branchId}`,
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

  const handleUpdateBranch = async (event) => {
    event.preventDefault();
    window.alert("here we are");

    // Check if branch data is available
    if (!branch) {
      console.error("Branch data is not available");
      return;
    }

    // Retrieve values from form fields
    const name = document.getElementById("name").value;
    const street = document.getElementById("street").value;
    const postalCode = document.getElementById("postalCode").value;
    const city = document.getElementById("city").value;
    const province = document.getElementById("province").value;
    const vehicleIds = document
      .getElementById("vehicleIds")
      .value!==""?document
      .getElementById("vehicleIds")
      .value.split(",")
      .map((id) => id.trim()):undefined;
    const reservationIds = document
      .getElementById("reservationIds")
      .value!==""? document.getElementById("reservationIds")
      .value.split(",")
      .map((id) => id.trim()):undefined;

    // Construct updatedData object
    const updatedData = {
      name,
      location: {
        street,
        postal_code: postalCode,
        city,
        province,
      },
      vehicles: vehicleIds,
      reservations: reservationIds
    };

    console.log("Updated Data:", updatedData);

    // Make PUT request to update branch information
    const response = await fetchData(
      `http://localhost:3000/api/branches/${branchId}`,
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
      <div className="flex justify-between items-center"><h1 className="text-2xl font-semibold mb-4">Branch Details </h1><Button handler={handleRefreshBranch} text={refresh?"up to date":"refresh"} inline={true} color={refresh?"green":"blue"}/></div>
      {success ? (
        !deleteBtn && !updateBtn ? (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-6">
              <p className="text-lg font-semibold mb-2">{branch.name}</p>
              <p className="text-gray-500 mb-2">{branch.address}</p>
              <p className="text-gray-500 mb-2">
                Number of vehicles: {branch.vehicles.length}
              </p>
              <p className="text-gray-500 mb-2">
                Number of reservations: {branch.reservations.length}
              </p>
              <hr />
              <p className="text-medium font-semibold mb-2">Reservations</p>
              {viewReservation && (
                <>
                  {branch.reservations && (
                    <ViewReservations reservations={branch.reservations} />
                  )}
                  <Button
                    handler={setViewReservation}
                    value={false}
                    color={"red"}
                    text={"Minimize"}
                  />
                </>
              )}
              {!viewReservation && (
                <Button
                  handler={setViewReservation}
                  value={true}
                  color={"green"}
                  text={"view reservations"}
                />
              )}

              {viewVehicles && (
                <>
                  {branch.vehicles && (
                    <ViewVehicles vehicles={branch.vehicles} />
                  )}
                  <Button
                    handler={setViewVehicles}
                    value={false}
                    color={"red"}
                    text={"Minimize"}
                  />
                </>
              )}
              {!viewVehicles && (
                <Button
                  handler={setViewVehicles}
                  value={true}
                  color={"blue"}
                  text={"View Vehicles"}
                />
              )}
            </div>
            <div className="flex justify-end p-6">
              <Button
                handler={handleClickUpdateBranch}
                color={"blue"}
                text={"Update"}
                inline={true}
              />
              <Button
                handler={handleClickDeleteBranch}
                color={"red"}
                text={"Delete"}
                inline={true}
              />
            </div>
          </div>
        ) : deleteBtn ? (
          deleting ? (
            deleting.data ? (
              <div className="bg-green-100 text-green-900 px-4 py-3 rounded-md mb-4">
                Successfully deleted {branch.name}
              </div>
            ) : deleting.loading ? (
              <div className="bg-yellow-100 text-yellow-900 px-4 py-3 rounded-md mb-4">
                Attempting to delete {branch.name}...
              </div>
            ) : (
              <div className="bg-red-100 text-red-900 px-4 py-3 rounded-md mb-4">
                Failed to delete {branch.name}
              </div>
            )
          ) : (
            <div className="bg-white shadow-md rounded-lg overflow-hidden p-6">
              <p className="text-lg font-semibold mb-4">
                Are you sure you want to delete{" "}
                <span className="text-red-500">{branch.name}</span>?
              </p>

              {branch.reservations.length > 0 && (
                <p className="text-lg font-semibold mb-4">
                  <span
                    className="text-red
-500"
                  >
                    {branch.reservations.length}
                  </span>{" "}
                  associated reservations will be deleted
                </p>
              )}
              {branch.reservations.length == 0 && (
                <p className="text-lg font-semibold mb-4">
                  No associated reservations
                </p>
              )}
              <div className="flex justify-end">
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded mr-4"
                  onClick={handleDeleteBranch}
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
        ) : updating ? (
          updating.data ? (
            <div className="bg-green-100 text-green-900 px-4 py-3 rounded-md mb-4">
              Successfully updated {branch.name}
            </div>
          ) : updating.loading ? (
            <div className="bg-yellow-100 text-yellow-900 px-4 py-3 rounded-md mb-4">
              Attempting to update {branch.name}...
            </div>
          ) : (
            <div>
              <div className="bg-red-100 text-red-900 px-4 py-3 rounded-md mb-4">
                Failed to update {branch.name}
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
            <p>Update branch {branch.name}:</p>
            <form action="" className="mt-4" onSubmit={handleUpdateBranch}>
              <div className="grid grid-cols-1 gap-6 mt-3">
                {/* Input fields for branch details */}
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
                  className="..."
                  defaultValue={branch.name}
                />

                <label htmlFor="street" className="...">
                  Street
                </label>
                <input
                  type="text"
                  name="street"
                  id="street"
                  className="..."
                  defaultValue={branch.location.street}
                />

                <label htmlFor="postalCode" className="...">
                  Postal Code
                </label>
                <input
                  type="text"
                  name="postalCode"
                  id="postalCode"
                  className="..."
                  defaultValue={branch.location["postal_code"]}
                />

                <label htmlFor="city" className="...">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  className="..."
                  defaultValue={branch.location.city}
                />

                <label htmlFor="province" className="...">
                  Province
                </label>
                <input
                  type="text"
                  name="province"
                  id="province"
                  className="..."
                  defaultValue={branch.location.province}
                />

                {/* Input fields for vehicle IDs and reservation IDs */}
                <label htmlFor="vehicleIds" className="...">
                  Vehicle IDs (comma-separated)
                </label>
                <input
                  type="text"
                  name="vehicleIds"
                  id="vehicleIds"
                  className="..."
                  defaultValue={branch.vehicles
                    .map((vehicle) => vehicle._id)
                    .join(",")}
                />

                <label htmlFor="reservationIds" className="...">
                  Reservation IDs (comma-separated)
                </label>
                <input
                  type="text"
                  name="reservationIds"
                  id="reservationIds"
                  className="..."
                  defaultValue={branch.reservations
                    .map((reservation) => reservation._id)
                    .join(",")}
                />
              </div>

              <div className="m-4">
              <div className="mt-6 inline" >
                  <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded mr-4"
                  >
                    Update Branch
                  </button>
                </div>
                {/* <Button handler={handleUpdateBranch} value={this}  color={"green"} text={"Update"} inline={true}/> */}
                <Button
                  handler={handleCancelUpdate}
                  value={this}
                  color={"blue"}
                  text={"Cancel"}
                  inline={true}
                />
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
