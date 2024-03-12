import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import modifyReservation from "../../utilities/modifyReservation";

export default function ReservationDetails({ reservation }) {
  // display reservation details
  const [dateRange, setDateRange] = useState([
    new Date(reservation.pickupDate),
    new Date(reservation.returnDate)
  ]);
  const [fromDate, toDate] = dateRange;
  const [modify, setModify] = useState(false);

  const handleModifyRsv = async () => {
    await modifyRsv(reservation._id, fromDate, toDate);
    setModify(false);
  };

  return (
    <div className={"pl-3"}>
      <p>
        Vehicle: {reservation.vin.make} {reservation.vin.model}
      </p>
      <p>Reservation dates:</p>
      <DatePicker
        selectsRange={true}
        startDate={fromDate}
        endDate={toDate}
        minDate={new Date()}
        onChange={(update) => {
          setDateRange(update);
          setModify(true);
        }}
      />
      {new Date(reservation.returnDate) > new Date() ? (
        <button
          className={`float-right ml-3 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded ${
            modify
              ? "transition duration-200 bg-green-500 hover:bg-green-400"
              : "transition duration-200"
          }`}
          onClick={handleModifyRsv}
        >
          Modify
        </button>
      ) : null}
    </div>
  );
}

async function modifyRsv(reservationId, fromDate, toDate) {
  await modifyReservation(reservationId, fromDate, toDate);
}

function computeTotal(fromDate, toDate, price) {
  const diffTime = Math.abs(toDate - fromDate);
  const diffDays = Math.round(diffTime / (1000 * 3600 * 24));
  return diffDays * price;
}
