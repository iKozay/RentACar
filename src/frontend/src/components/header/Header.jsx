import React from "react";
import AccountDropdown from "./AccountDropdown";

function goToHome() {
    window.open("/", "_self");
}

export default function Header(LogIn) {
    return (
        <div className="flex justify-between items-center bg-gray-800 text-white p-4 sticky top-0 ">
            <div className="flex items-center">
                <h1 className="text-2xl font-bold cursor-pointer" onClick={goToHome}>Rentals.com</h1>
            </div>
            <div className="flex items-center">
                <AccountDropdown LogIn={LogIn}/>
            </div>
        </div>
    );

}