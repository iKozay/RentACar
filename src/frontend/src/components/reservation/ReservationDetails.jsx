import React, {useContext, useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import modifyReservation from "../../utilities/modifyReservation";
import {UserContext} from "../../Pages/Root.jsx";
import {Link} from "react-router-dom";
import {addons} from "./AddonSelector.jsx";
import Addon from "./Addon.jsx";
import {ModifyReservation} from "../../utilities/ReservationUtils.js";

export default function ReservationDetails({ reservation }) {
    const { user } = useContext(UserContext);

    // display reservation details
  const [dateRange, setDateRange] = useState([
    new Date(reservation.pickupDate),
    new Date(reservation.returnDate)
  ]);
  const [fromDate, toDate] = dateRange;
  const [modify, setModify] = useState(false);
  const [addonPrice, setAddonPrice] = React.useState(0);

  const handleModifyRsv = async () => {
    await modifyRsv(reservation._id, fromDate, toDate, reservation.addons, reservation.status);
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
      <div className="flex">
        <div className="mb-2 inline-block ml-5">
          <div className="text-2xl font-bold tracking-tight">Add-ons</div>
          <div className="text-stone-600 mb-2">Add extra features to your reservation</div>
          {
            addons.map((a, index) => {
              localStorage.setItem(a.storageName, parseInt(reservation.addons[a.storageName]));

              return <Addon key={index} addon={a} totalAddonPrice={addonPrice} setAddonPrice={setAddonPrice}/>
            })
          }
        </div>
      </div>
        {isCSR && (reservation.status==="To Pickup" || reservation.status==="Checked In")?
            <Link to={`/reservation/${reservation.status==="To Pickup"?"checkin":(reservation.status==="Checked In"?"checkout":"")}/${reservation._id}`}>
              <button className="float-right bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded ml-2">{reservation.status==="To Pickup"?"Check in":(reservation.status==="Checked In"?"Check out":"")}</button>
            </Link>
            :null
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

async function modifyRsv(reservationId, fromDate, toDate, addons, status) {
//  await modifyReservation(reservationId, fromDate, toDate, addons, status);
  await ModifyReservation(reservationId, fromDate, toDate, addons, status);
}

function computeTotal(fromDate, toDate, price) {
  const diffTime = Math.abs(toDate - fromDate);
  const diffDays = Math.round(diffTime / (1000 * 3600 * 24));
  return diffDays * price;
}
