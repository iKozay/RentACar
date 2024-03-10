import React from 'react';
import LoginButton from "./LoginButton";
import logout from "../../utilities/logout";
import {useContext} from 'react';
import { Link } from 'react-router-dom';
import {UserContext} from "./../../Pages/Root";

export default function AccountDropdown() {
    const {user} = useContext(UserContext);
    const {setToken,token} = useContext(UserContext);

    // const token = localStorage.getItem("token");
    const isLoggedIn = (token !== null);
    if(isLoggedIn){
        return showAccountButton(setToken,user);
    }else {
        return showLoginButton();
    }

}
function showAccountButton(setToken,user){
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
                    <p className={"p-2 block cursor-pointer hover:bg-gray-600"} onClick={()=> window.open("/user/reservation", "_self")}>My Reservations</p>
                    {(user && user.role==="admin") &&  <Link to="admin"><p className={"p-2 block cursor-pointer hover:bg-slate-600"}>Admin Dashboard</p></Link>}
                    <hr/>
                    <p className={"p-2 block cursor-pointer hover:bg-slate-600"} onClick={()=>logoutAccount(setToken)}>Logout</p>
                    
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
