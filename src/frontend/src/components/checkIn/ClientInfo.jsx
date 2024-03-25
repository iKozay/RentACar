import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from "../../Pages/Root.jsx";
import {FetchReservationById} from "../../utilities/ReservationUtils.js";

export default function ClientInfo({ onDriversLicenseChange }){

  /////////////////////////////////////////////////
  const [damageDescription, setDamageDescription] = useState('');
  const [driversLicenseNum, setDriversLicenseNum] = useState('');
  const reservationId = window.location.pathname.split("/").pop();

  const [response, setResponse] = useState([]);

  useEffect(() => {
    // async function fetchReservation() {
    //   let response = await fetch(
    //     `http://localhost:3000/api/reservations/${reservationId}`,
    //     {
    //       method: "GET",
    //       credentials: "include", // Include cookies in the request
    //       mode: "cors", // Enable CORS
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${localStorage.getItem("token")}`,
    //       },
    //     }
    //   );
    //   response = await response.json();
    //   setResponse(response);
    // }
    //
    // fetchReservation();
      FetchReservationById(reservationId).then((res) => {
        setResponse(res);
      })
  }, []);

///////////////////////////////////////////////////

  const handleDamageDescriptionChange = (event) => {
    setDamageDescription(event.target.value);
  };
  const handleDriversLicenseChange = (event) => {
    const value = event.target.value;
    setDriversLicenseNum(value);
    onDriversLicenseChange(value);
  };

  if(response && response.userID){
  return (
    <div className="container mx-auto p-8">

      <div className="mb-4">
        <h2 className="text-lg font-bold mb-2">Customer Details:</h2>
        <p>Name: {response.userID.full_name}</p>
        <p>Email: {response.userID.email}</p>
        <p>Phone: {response.userID.phone_number}</p>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-bold mb-2">Vehicle Details:</h2>
        <p>Make: {response.vin.make}</p>
        <p>Model: {response.vin.model}</p>
        <p>Color: {response.vin.colour}</p>
        <p>Year: </p>
        <p>License Plate: </p>
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