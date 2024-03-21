import React, {useContext, useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import modifyReservation from "../../utilities/modifyReservation";
import {UserContext} from "../../Pages/Root.jsx";

export default function ReservationDetails({ reservation }) {
    const { user } = useContext(UserContext);

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
    const isCSR = (user && user.role === "representative");

  return (
    <div className={"pl-3"}>
      <p>
        Vehicle: {reservation.vin.make} {reservation.vin.model}
      </p>
    <p>
        Reservation Status: {reservation.status}
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
      <ul>
        <li>Insurance: {reservation.addons.insurance==1?"Yes":"No"}</li>
        <li>GPS: {reservation.addons.gps==1?"Yes":"No"}</li>
        <li>Child Seats: {reservation.addons.childSeat}</li>
      </ul>
        {isCSR && reservation.status!=="Past"?
            <button
                className="float-right bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded ml-2"
                // onClick={handleCheckInOut}
            >Check in/Check out</button>:null
        }
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
