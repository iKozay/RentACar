import React, {useContext, useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import modifyReservation from "../../utilities/modifyReservation";
import {UserContext} from "../../Pages/Root.jsx";
import {Link, Navigate} from "react-router-dom";
import {addons} from "./AddonSelector.jsx";
import Addon from "./Addon.jsx";
import {ModifyReservation} from "../../utilities/ReservationUtils.js";
import Modal from "../generalPurpose/Modal.jsx";
import {PaymentForm, PaymentTypes} from "../generalPurpose/PaymentForm.jsx";
import {computeNumOfDays} from "../checkIn/RentalAgreement.jsx";

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
  const [showPaymentForm, setShowPaymentForm] = React.useState(false);
  const [payment, setPayment] = React.useState(0);
  const previousTotalPrice = computeTotal(new Date(reservation.pickupDate), new Date(reservation.returnDate), reservation.vin.price) + parseInt(reservation.addons[addons[0].storageName])*addons[0].price + parseInt(reservation.addons[addons[1].storageName])*addons[1].price + parseInt(reservation.addons[addons[2].storageName])*addons[2].price;
  console.log(reservation)
  const updateTotalPrice = (addonName,addonQuantity) => {
      setModify(true);
      // update local storage
        if(addonName) {
            localStorage.setItem(addonName, addonQuantity);
        }
        console.log(localStorage.getItem(addonName));
  }
  const handleModifyRsv = () => {
    setPayment(computeTotal(fromDate, toDate, reservation.vin.price) + addonPrice*computeNumOfDays(fromDate,toDate)-previousTotalPrice);
    if ((computeTotal(fromDate, toDate, reservation.vin.price) + addonPrice*computeNumOfDays(fromDate,toDate)-previousTotalPrice) !== 0) {
      setShowPaymentForm(true);
    }else{
      modifyRsv(reservation._id, fromDate, toDate, reservation.addons, reservation.status);
      setModify(false);
    }
  };
    const isCSR = (user && user.role === "representative");

    // temp
  if(modify && showPaymentForm){
    console.log("insurances",localStorage.getItem("insurance"));
    console.log("gps",localStorage.getItem("gps"));
    console.log("childSeat",localStorage.getItem("childSeat"));
  }

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
          updateTotalPrice(null,0);
        }}
      />
      <div className="flex">
        <div className="mb-2 inline-block ml-5">
          <div className="text-2xl font-bold tracking-tight">Add-ons</div>
          <div className="text-stone-600 mb-2">Add extra features to your reservation</div>
          {
            addons.map((a, index) => {
              if(!modify){
                localStorage.setItem(a.storageName, parseInt(reservation.addons[a.storageName]));
              }else{
                localStorage.setItem(a.storageName, parseInt(localStorage.getItem(a.storageName)));
              }
              return <Addon key={index} addon={a} totalAddonPrice={addonPrice} setAddonPrice={setAddonPrice} setModify={updateTotalPrice}/>
            })
          }
        </div>
      </div>
      <div className="grid grid-cols-2 mt-5">
        <div className="text-xl">Total Cost: {previousTotalPrice}$</div>
        {
            modify ? <div className="text-xl mt-1">New Cost: {(computeTotal(fromDate, toDate, reservation.vin.price) + addonPrice*computeNumOfDays(fromDate,toDate))}$ ({(computeTotal(fromDate, toDate, reservation.vin.price) + addonPrice*computeNumOfDays(fromDate,toDate))-previousTotalPrice}$)</div> : null
        }
        {
            modify ? <button
                className="bg-red-700 hover:bg-red-600 text-white font-bold py-2 px-4 rounded ml-2"
                onClick={() => {
                  window.location.reload()
                }}
            >Cancel Changes</button> : null
        }
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
      { showPaymentForm && (
          <Modal onClose={()=>{setShowPaymentForm(false)}}>
            {
              payment>0?<div className={"flex justify-center"}><h1 className="text-2xl font-bold">Make a Deposit</h1></div>:
                  <div className={"flex justify-center"}><h1 className="text-2xl font-bold">Make a Refund</h1></div>
            }
            <PaymentForm paymentType={PaymentTypes.MODIFY_RESERVATION} vehicle={reservation.vin} totalPrice={Math.abs(payment)} backButtonAction={()=>{setShowPaymentForm(false)}} onPaymentAction={async (newAddons)=>{await modifyRsv(reservation._id, fromDate, toDate, newAddons, reservation.status)}} reservationId={reservation._id}/>
          </Modal>
      )
      }
    </div>
  );
}

async function modifyRsv(reservationId, fromDate, toDate, addons, status) {
//  await modifyReservation(reservationId, fromDate, toDate, addons, status);
  console.log(addons);
  await ModifyReservation(reservationId, fromDate, toDate, addons, status);
}

function computeTotal(fromDate, toDate, price) {
  if(fromDate && toDate) {
    const diffTime = Math.abs(toDate - fromDate);
    const diffDays = Math.round(diffTime / (1000 * 3600 * 24));
    return diffDays * price;
  }
}
