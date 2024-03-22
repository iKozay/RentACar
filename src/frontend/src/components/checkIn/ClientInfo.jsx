import React, { useState } from 'react';

export default function ClientInfo(){
  const [damageDescription, setDamageDescription] = useState('');

  const handleDamageDescriptionChange = (event) => {
    setDamageDescription(event.target.value);
  };

  return (
    <div className="container mx-auto p-8">

      <div className="mb-4">
        <h2 className="text-lg font-bold mb-2">Customer Details:</h2>
        <p>Name: </p>
        <p>Email: </p>
        <p>Phone: </p>
        <p>Address: </p>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-bold mb-2">Vehicle Details:</h2>
        <p>Make: </p>
        <p>Model: </p>
        <p>Year: </p>
        <p>License Plate: </p>
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
};