import React from 'react';

export default function VehicleDetails({vehicle}) {
    // display vehicle details
    return (
        <div>
            <img src={vehicle.Image} alt="Vehicle" width="35%" height="35%" className={"float-right"}/>
            <p>Make: {vehicle.make}</p>
            <p>Model: {vehicle.model}</p>
            <p>Price: ${vehicle.price}/day</p>
            <p>Address: {vehicle.address}</p>
            <p>Colour: {vehicle.colour}</p>
            <p>Number of doors: {vehicle.numberOfDoors}</p>
            <p>Number of baggage: {vehicle.numberOfBaggage}</p>
            <p>Kilometrage: {vehicle.kilometrage}</p>
            <p>Electrical or fuel: {vehicle.electricalOrFuel ? "Electric" : "Gas"}</p>
        </div>
    );
}