import React, { useState } from "react";
import CheckVehicle from "../components/checkIn/CheckVehicle"
import RefundForm from "../components/csr/RefundForm.jsx";
export default function CheckOutPage() {
    // get id from url

  const [page, setPage] = useState(0);

    const CheckOutTitles = ["Check Vehicle", "Make Refund"];
    const [damageCost, setDamageCost] = useState(0);

const PageDisplay = () => {
        if (page === 0) {
            return <CheckVehicle goToPayment={()=>{setPage(1)}} damageCost={damageCost} setDamageCost={setDamageCost} />;
        } else {
            return <RefundForm backButtonAction={()=>{setPage(0)}} totalPrice={500-damageCost}/>;
        }
    };

    return (
        <div className="container mx-auto mt-10 max-w-screen-lg">
            {/* Progress Bar */}
            <div className="w-full bg-white mx-auto mt-10">
                <div className="h-4 bg-gray-200">
                    <div
                        className="h-full bg-blue-500"
                        style={{ width: `${(page + 1) * (100 / CheckOutTitles.length)}%` }}
                    ></div>
                </div>
            </div>
            <div className="form-container bg-white rounded-lg shadow-lg p-6 mt-6">
                <div className="flex justify-center">
                    <h1 className="text-2xl font-bold">{CheckOutTitles[page]}</h1>
                </div>
                <div className="body">{PageDisplay()}</div>
            </div>
        </div>
    );
}