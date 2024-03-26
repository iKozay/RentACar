import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {UserContext} from "../../Pages/Root";
import {useContext} from "react";
import createTransaction from "../../utilities/createTransaction.js";
import {CheckOutReservation} from "../../utilities/ReservationUtils.js";
import {PaymentForm, PaymentTypes} from "../generalPurpose/PaymentForm.jsx";
export default function RefundForm({backButtonAction, totalPrice}) {
    const reservationId = window.location.pathname.split("/").pop();
    return(
        <PaymentForm paymentType={PaymentTypes.REFUND} vehicle={null} totalPrice={totalPrice} backButtonAction={backButtonAction} reservationId={reservationId}/>
    );

}
