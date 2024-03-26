import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from "../../Pages/Root.jsx";

export default function ClientInfo({ onDriversLicenseChange, onHomeAddressChange }){

  /////////////////////////////////////////////////
  const [damageDescription, setDamageDescription] = useState('');
  const [driversLicenseNum, setDriversLicenseNum] = useState('');
  const [homeAddress, setHomeAddress] = useState('');
  const reservationId = window.location.pathname.split("/").pop();

  const { user } = useContext(UserContext);
  const [response, setResponse] = useState([]);

  useEffect(() => {
    async function fetchReservation() {
      let response = await fetch(
        `http://localhost:3000/api/reservations/${reservationId}`,
        {
          method: "GET",
          credentials: "include", // Include cookies in the request
          mode: "cors", // Enable CORS
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      response = await response.json();
      setResponse(response);
    }

    fetchReservation();
  }, [user]);

///////////////////////////////////////////////////

  const handleDamageDescriptionChange = (event) => {
    setDamageDescription(event.target.value);
  };
  const handleDriversLicenseChange = (event) => {
    const value = event.target.value;
    setDriversLicenseNum(value);
    onDriversLicenseChange(value);
  };
  const handleHomeAddressChange = (event) => {
    const value = event.target.value;
    setHomeAddress(value);
    onHomeAddressChange(value);
  };

  if(response && response.userID){
  return (
    <div className="container mx-auto p-8">

      <div className="mb-4">
        <h2 className="text-lg font-bold mb-2">Customer Details:</h2>
        <p>Name: {response.userID.full_name}</p>
        <p>Email: {response.userID.email}</p>
        <p>Phone: {response.userID.phone_number}</p>
        <p>Address: <input className=" px-3 py-0 border rounded-md"
        placeholder="Home address"
        value={homeAddress}
        onChange={handleHomeAddressChange}>
        </input></p>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-bold mb-2">Vehicle Details:</h2>
        <p>Make: {response.vin.make}</p>
        <p>Model: {response.vin.model}</p>
        <p>Color: {response.vin.colour}</p>
        <p>Year: 2018{response.vin.year}</p>
        <p>License Plate: P1P 4L0{response.vin.licensePlate}</p>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-bold mb-2">Valid Driving Permit:</h2>
        <input className="w-full px-3 py-2 border rounded-md"
        placeholder="Enter Driver's License Number"
        value={driversLicenseNum}
        onChange={handleDriversLicenseChange}>
        </input>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-bold mb-2">Report Damages:</h2>
        <textarea
          className="w-full px-3 py-2 border rounded-md"
          rows="4"
          placeholder="Please inspect the car and report any damages ..."
          value={damageDescription}
          onChange={handleDamageDescriptionChange}
        ></textarea>
      </div>
    </div>
  );
  }else{
    return(
      <div></div>
    );
  }
};
