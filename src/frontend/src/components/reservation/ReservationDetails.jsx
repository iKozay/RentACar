import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import modifyReservation from "../../utilities/modifyReservation";
import { useState } from "react";

export default function ReservationDetails({reservation, vehicle}) {
    // display reservation details
    const [dateRange, setDateRange] = useState([new Date(reservation.pickupDate), new Date(reservation.returnDate)]);
    const [fromDate, toDate] = dateRange;
    return (
        <div className={"pl-3"}>
            <p>Vehicle: {vehicle.make} {vehicle.model}</p>
            <p>Reservation dates:</p>
            {new Date(reservation.returnDate) > new Date() ? <DatePicker selectsRange={true} startDate={fromDate} endDate={toDate} minDate={new Date()} onChange={(update) => {setDateRange(update);}}/> 
            : <DatePicker selectsRange={true} disabled startDate={fromDate} endDate={toDate} minDate={new Date()} onChange={(update) => {setDateRange(update);}}/>}
            {new Date(reservation.returnDate) > new Date() ? <button className="float-right ml-3 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded" onClick={(e)=>modifyRsv(reservation._id,fromDate,toDate)}>Modify</button> : null}
        </div>
    );
}

async function modifyRsv(reservationId, fromDate, toDate) {
    await modifyReservation(reservationId, fromDate, toDate);
    // reload the page
    location.reload();
}

function computeTotal(fromDate, toDate, price) {
    const diffTime = Math.abs(toDate - fromDate);
    const diffDays = Math.round(diffTime / (1000 * 3600 * 24));
    return diffDays * price;
}