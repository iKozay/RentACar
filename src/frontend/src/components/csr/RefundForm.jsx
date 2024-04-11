import React from "react";
import {PaymentForm, PaymentTypes} from "../generalPurpose/PaymentForm.jsx";
export default function RefundForm({backButtonAction, totalPrice}) {
    const reservationId = window.location.pathname.split("/").pop();
    return(
        <PaymentForm paymentType={PaymentTypes.REFUND} vehicle={null} totalPrice={totalPrice} backButtonAction={backButtonAction} reservationId={reservationId} onPaymentAction={null}/>
    );

}
