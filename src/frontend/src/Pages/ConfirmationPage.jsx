import React from "react";
import ReservationHeader from "../components/reservation/ReservationHeader.jsx";
import Confirmation from "../components/reservation/Confirmation";

export default function ConfirmationPage() {
    return (
        <div>
            <ReservationHeader includeMyAccountButton={false}/>
            <Confirmation/>
        </div>
    );
}