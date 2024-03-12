import React from 'react';
import VehicleViewer from "./VehicleViewer.jsx";
import Payment from "./Payment.jsx";

export default function ReservationForm({selectedVehicle, currentUser}) {
    return(
        <div className="w-full p-6 my-6 mx-auto bg-white rounded-md shadow-2xl shadow-stone-300 lg:max-w-xl ">
            <table className={""}>
                <tbody>
                <tr>
                    <td>
                        <VehicleViewer vehicle={selectedVehicle}/>
                    </td>
                </tr>
                <tr>
                    {/* <td>
                        <Payment cancel={goToBrowsing} submit={setReservationBooked} vehicleID={selectedVehicle._id} userID={currentUser.id}/>
                    </td> */}
                </tr>
                </tbody>
            </table>
        </div>
    );
}