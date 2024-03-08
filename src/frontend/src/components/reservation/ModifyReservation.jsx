import React from 'react';
import ReservationDetails from "./ReservationDetails.jsx";
import VehicleDetails from "./VehicleDetails.jsx";

export default function ModifyReservation() {
    // variable with the reservation id from url
    const reservationId = window.location.pathname.split("/").pop();
    //////////////////////////////////////////////////////////////
    // API call to get reservation details and vehicle details
    const reservation =     {
        id: 34,
        vehicle: 'Mclaren 765LT',
        fromDate: 'Jan 25, 2024',
        toDate: 'Jan 30, 2024',
    };
    const vehicle = {
        "_id":"65eb245afc880613982a5caa",
        "make":"Mclaren 765LT",
        "model":"Camry",
        "price":50,
        "numberOfSeats":5,
        "address":"123 Main St, Cityville",
        "colour":"Blue",
        "numberOfDoors":4,
        "numberOfBaggage":2,
        "kilometrage":50000,
        "electricalOrFuel":"false",
        "Image":"https://www.gearpatrol.com/wp-content/uploads/sites/2/2021/07/mclaren-765lt-6-1624918618-jpg.webp",
        "__v":0
    };
    //////////////////////////////////////////////////////////////
    return (
        <div className="p-6 my-6 mx-10 bg-white rounded-md shadow-2xl shadow-stone-300">
            <table>
                <thead>
                    <tr>
                        <th><h2>VEHICLE DETAILS</h2><hr className={"pb-1"}/></th>
                        <th><h2>RESERVATION DETAILS</h2><hr className={"pb-1"}/></th>
                    </tr>
                </thead>
                <tr>
                    <td className={"w-1/2"}>
                        <VehicleDetails vehicle={vehicle} />
                    </td>
                    <td className={"w-1/2"}>
                        <ReservationDetails reservation={reservation} vehicle={vehicle} />
                    </td>
                </tr>
                <tr>
                    <td>
                        <button className="mt-5 float-left bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded" onClick={(e)=>window.open("http://localhost:5173/user/reservation", "_self")}>Back</button>
                        <button className="mt-5 float-right bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded" onClick={(e)=>cancelReservation(reservationId)}>Cancel</button>
                    </td>
                </tr>
            </table>
        </div>
    );
}

function cancelReservation(reservationId) {
    //////////////////////////////////////////////////////////////
    // API call to cancel reservation
    //////////////////////////////////////////////////////////////
    window.open("http://localhost:5173/user/reservation", "_self");
}