import React from "react";
import {PaymentForm, PaymentTypes} from "../generalPurpose/PaymentForm.jsx";

export default function MakeDeposit({backButtonAction}) {
    const totalPrice = 500;
    const reservationId = window.location.pathname.split("/").pop();
    return(
        <PaymentForm paymentType={PaymentTypes.DEPOSIT} vehicle={null} totalPrice={totalPrice} backButtonAction={backButtonAction} reservationId={reservationId}/>
    );

}
