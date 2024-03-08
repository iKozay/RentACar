import React from 'react';
import LoginButton from "./LoginButton";
import {useState, useEffect} from "react";
import {useOutletContext} from "react-router-dom";
import logout from "../../utilities/logout";

export default function AccountDropdown(LogIn) {
    // get token using outlet context
//    const outlet = useOutletContext();
    const setToken = LogIn.LogIn.LogIn;
    const token = localStorage.getItem("token");
    const isLoggedIn = (token !== null);
    if(isLoggedIn){
        return showAccountButton(setToken);
    }else {
        return showLoginButton();
    }

}
function showAccountButton(setToken){
    const [isDropdownVisible, setDropdownVisible] = React.useState(false);
    window.onclick = function(event) {
        if (!event.target.matches('.relative')) {
            setDropdownVisible(false);
        }
    }
    return (
        <div>
            <button id="accountBtn" className="relative inline-block bg-white text-black font-bold py-2 px-4 rounded"
                    onClick={() => setDropdownVisible(!isDropdownVisible)}>
                My Account
            </button>
            {isDropdownVisible && (
                <div className={"absolute overflow-auto z-10 bg-gray-800 text-white p-2"}>
                    <p className={"p-2 block cursor-pointer hover:bg-gray-600"}>My Account</p>
                    <p className={"p-2 block cursor-pointer hover:bg-gray-600"} onClick={(e)=> window.open("/user/reservation", "_self")}>My Reservations</p>
                    <hr/>
                    <p className={"p-2 block cursor-pointer hover:bg-slate-600"} onClick={(e)=>logoutAccount(setToken)}>Logout</p>
                </div>
            )}
        </div>
    );
}

function showLoginButton() {
    return (
        <LoginButton/>
    );
}

// async function calling logout function
async function logoutAccount(setToken){
    await logout(setToken);
    window.open("/", "_self");
}
