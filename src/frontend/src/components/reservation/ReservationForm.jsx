
import VehicleViewer from "./VehicleViewer.jsx";
import Payment from "./Payment.jsx";
import AddonSelector from "./AddonSelector.jsx";
import React from "react";
import {Link} from "react-router-dom";

export default function ReservationForm({selectedVehicle}) {
    selectedVehicle.pickupDate = new Date(localStorage.getItem("startDate")).toISOString().split('T')[0];
    selectedVehicle.returnDate = new Date(localStorage.getItem("endDate")).toISOString().split('T')[0];
    const dates = `${selectedVehicle.pickupDate} - ${selectedVehicle.returnDate} (${computeNumOfDays(selectedVehicle.pickupDate,selectedVehicle.returnDate)} days)`;
    const vehicleTotalPrice = computeTotalPrice(selectedVehicle.pickupDate, selectedVehicle.returnDate, selectedVehicle.price);
    const [addonPrice, setAddonPrice] = React.useState(0);

    const [transaction, setTransaction] = React.useState(false);

    return(
        <div className={"flex justify-center"}>
            <div className={`${transaction ? "w-1/6 m-6 h-fit flex-none" : "p-6 my-6 mx-auto"}  bg-white rounded-md shadow-2xl shadow-stone-300 lg:max-w-xl`}>
                <table className={""}>
                    <tbody>
                    <tr>
                        <td>
                            {!transaction &&
                                <VehicleViewer vImage={selectedVehicle.Image} price={selectedVehicle.price} make={selectedVehicle.make} dates={dates} vehicleTotalPrice={vehicleTotalPrice}/>}
                        </td>
                    </tr>
                    <tr>
                        {!transaction &&
                            <td><AddonSelector addonPrice={addonPrice} setAddonPrice={setAddonPrice} totalDays={computeNumOfDays(selectedVehicle.pickupDate,selectedVehicle.returnDate)}/></td>}
                    </tr>
                    <tr>
                        <td>
                            <div className={`p-3`}>
                                {transaction && <div className={""}>
                                    <img src={selectedVehicle.Image}/>
                                </div>}
                                <div className={`grid ${transaction?"justify-items-center":"justify-items-end"} mb-2`}>
                                    <div className={`mb-2 inline-block ${!transaction && "mr-5"}`}>
                                        {transaction ?
                                            <div className="text-stone-600">
                                                <p className={"float-left mr-2"}>Vehicle:</p>
                                                <p className={"float-right"}> {(Math.round((vehicleTotalPrice) * 100) / 100).toFixed(2)}$</p>
                                            </div> : ""
                                        }
                                        {transaction ?
                                            <div className="text-stone-600">
                                                <p className={"float-left mr-2"}>Addons:</p>
                                                <p className={"float-right"}> {(Math.round((0.14975*(addonPrice)) * 100) / 100).toFixed(2)}$</p>
                                            </div> : ""
                                        }
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
                        {!transaction &&
                            <div className="flex justify-between mr-8 ml-8">
                                <Link to={"/"}>
                                    <button className="bg-blue-500 text-white p-2 rounded-lg w-20 hover:bg-blue-600">Cancel</button>
                                </Link>
                                <button className="bg-blue-500 text-white p-2 rounded-lg w-20 hover:bg-blue-600" onClick={(e)=>setTransaction(true)}>Pay</button>
                            </div>
                        }
                    </tr>
                    </tbody>
                </table>
            </div>
            {transaction &&
                <div className={"w-full p-6 my-6 bg-white rounded-md shadow-2xl shadow-stone-300 lg:max-w-xl"}>
                    <Payment setTransaction={setTransaction} vehicle={selectedVehicle} totalPrice={((Math.round((1.14975*(vehicleTotalPrice+addonPrice)) * 100) / 100).toFixed(2))}/>
                </div>}
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


