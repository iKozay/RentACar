import React from 'react';
import VehicleViewer from "./VehicleViewer.jsx";
import Payment from "./Payment.jsx";

export default function ReservationForm({selectedVehicle, currentUser, setReservationBooked}) {
    return(
        <div className="w-full p-6 my-6 mx-auto bg-white rounded-md shadow-2xl shadow-stone-300 lg:max-w-xl ">
            <table className={""}>
                <tbody>
                <tr>
                    <td>
                        <VehicleViewer vehicle={selectedVehicle} changeSelection={goToBrowsing}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <Payment cancel={goToBrowsing} submit={setReservationBooked} vehicleID={selectedVehicle.id} userID={currentUser.id}/>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}

function goToBrowsing() {
    window.open("/", "_self");
}