import React from "react";
import AccountDropdown from "./AccountDropdown";

function goToHome() {
    window.open("/", "_self");
}

export default function ReservationHeader({includeMyAccountButton}) {
    return (
        <div className="flex justify-between items-center bg-slate-300 text-black p-4 sticky top-0 ">
            <div className="flex items-center">
                <h1 className="text-2xl font-bold cursor-pointer" onClick={goToHome}>Rentals.co</h1>
            </div>
            <div className="flex items-center">
                {includeMyAccountButton ? <AccountDropdown/> : null}
            </div>
        </div>
    );

}