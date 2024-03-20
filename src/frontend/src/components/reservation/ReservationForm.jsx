
import VehicleViewer from "./VehicleViewer.jsx";
import Payment from "./Payment.jsx";
import AddonSelector from "./AddonSelector.jsx";
import React from "react";
import {Link} from "react-router-dom";

export default function ReservationForm({selectedVehicle}) {
    const pickupDate = new Date(localStorage.getItem("startDate")).toISOString().split('T')[0];
    const returnDate = new Date(localStorage.getItem("endDate")).toISOString().split('T')[0];
    const dates = `${pickupDate} - ${returnDate} (${computeNumOfDays(pickupDate,returnDate)} days)`;
    const vehicleTotalPrice = computeTotalPrice(pickupDate, returnDate, selectedVehicle.price);
    const [addonPrice, setAddonPrice] = React.useState(0);
    return(
        <div className="w-full p-6 my-6 mx-auto bg-white rounded-md shadow-2xl shadow-stone-300 lg:max-w-xl ">
            <table className={""}>
                <tbody>
                <tr>
                    <td>
                        <VehicleViewer vImage={selectedVehicle.Image} price={selectedVehicle.price} make={selectedVehicle.make} dates={dates} vehicleTotalPrice={vehicleTotalPrice}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <AddonSelector addonPrice={addonPrice} setAddonPrice={setAddonPrice}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div className={"mb-5 pl-5"}>
                            <div className="grid justify-items-end mb-2">
                                <div className="mb-2 inline-block mr-5">
                                    <div className="text-stone-600">
                                        <p className={"float-left mr-2"}>Subtotal:</p>
                                        <p className={"float-right"}> {(Math.round((vehicleTotalPrice+addonPrice) * 100) / 100).toFixed(2)}$</p>
                                    </div>
                                    <div className="text-stone-600">
                                        <p className={"float-left mr-2"}>Taxes:</p>
                                        <p className={"float-right"}> {(Math.round((0.14975*(vehicleTotalPrice+addonPrice)) * 100) / 100).toFixed(2)}$</p>
                                    </div>
                                    <div className="text-stone-600">

                                        <p className={"float-left mr-2 font-bold text-2xl mt-4"}>Total:</p>
                                        <p className={"float-right text-2xl mt-4"}> {(Math.round((1.14975*(vehicleTotalPrice+addonPrice)) * 100) / 100).toFixed(2)}$</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <div className="flex justify-between mr-8 ml-8">
                        <Link to={"/"}>
                            <button className="bg-blue-500 text-white p-2 rounded-lg w-20 hover:bg-blue-600">Cancel</button>
                        </Link>
                        <button className="bg-blue-500 text-white p-2 rounded-lg w-20 hover:bg-blue-600">Pay</button>
                    </div>
                </tr>
                </tbody>
            </table>
        </div>
    );
}

function computeNumOfDays(fromDate, toDate) {
    const from = Date.parse(fromDate);
    const to = new Date(toDate);
    const diffTime = Math.abs(to - from);
    const diffDays = Math.round(diffTime / (1000 * 3600 * 24));
    return diffDays;
}


function computeTotalPrice(fromDate, toDate, price) {
    return computeNumOfDays(fromDate, toDate) * price;
}

