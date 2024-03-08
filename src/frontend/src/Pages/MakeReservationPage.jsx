import React from "react";
import ReservationHeader from "../components/reservation/ReservationHeader.jsx";
import MakeReservation from "../components/reservation/MakeReservation.jsx";

export default function MakeReservationPage() {
    return (
        <div>
            <ReservationHeader includeMyAccountButton={true}/>
            <MakeReservation/>
        </div>
    );
}