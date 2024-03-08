import React from "react";
import DatePicker from "react-datepicker";
export default function ReservationDetails({reservation, vehicle}) {
    // display reservation details
    const [fromDate, setFromDate] = React.useState(new Date(reservation.fromDate));
    const [toDate, setToDate] = React.useState(new Date(reservation.toDate));
    return (
        <div className={"pl-3"}>
            <p>Vehicle: {vehicle.make} {vehicle.model}</p>
            <p>From: </p>
            {/*<DatePicker selected={fromDate} onChange={date => setFromDate(date)} />*/}
            <DatePicker selected={fromDate} onChange={(date) => setFromDate(date)} showTimeSelect timeFormat='HH:mm' timeIntervals={30} timeCaption='Time' dateFormat="MM/d/yyyy h:mm aa"/>
            <p>To: </p>
            <DatePicker selected={toDate} onChange={(date) => setToDate(date)} showTimeSelect timeFormat='HH:mm' timeIntervals={30} timeCaption='Time' dateFormat="MM/d/yyyy h:mm aa"/>
            <p>Total: ${computeTotal(fromDate, toDate, vehicle.price)}</p>
            <button className="float-right ml-3 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded" onClick={(e)=>modifyReservation(reservation.id,fromDate,toDate)}>Modify</button>
        </div>
    );
}

function modifyReservation(reservationId, fromDate, toDate) {
    /////////////////////
    // API call to modify reservation
    /////////////////////
    console.log("Reservation modified");
    // reload the page
    location.reload();
}

function computeTotal(fromDate, toDate, price) {
    const diffTime = Math.abs(toDate - fromDate);
    const diffDays = Math.round(diffTime / (1000 * 3600 * 24));
    return diffDays * price;
}