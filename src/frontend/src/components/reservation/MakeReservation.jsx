import React from "react";
import ReservationForm from "./ReservationForm.jsx";

export default function MakeReservation() {
//////////////////////////////////////
// The following data is for testing purposes. Normally it would be passed in as props
    const selectedVehicle =
        {
            id: 1,
            name: 'Mclaren 765LT',
            href: '#',
            price: 50,
            imageSrc: 'https://www.gearpatrol.com/wp-content/uploads/sites/2/2021/07/mclaren-765lt-6-1624918618-jpg.webp',
            imageAlt: 'car',
            fromDate: 'Jan 25, 2024',
            toDate: 'Jan 30, 2024',
        };
    const currentUser = {
        id: 1
        // other info here
    }
//////////////////////////////////////
    return(
        <div>
            <ReservationForm selectedVehicle={selectedVehicle} currentUser={currentUser} setReservationBooked={goToConfirmation}/>
        </div>
    );
}

function goToConfirmation() {
    window.open("/reservation/confirmation", "_self");
}
