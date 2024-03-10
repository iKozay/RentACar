import React from "react";
import AccountDropdown from "./AccountDropdown";
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <div className="flex justify-between items-center bg-gray-800 text-white p-4 sticky top-0 z-10">
            <div className="flex items-center">
                <Link to="/"><h1 className="text-2xl font-bold cursor-pointer">Rentals.com</h1></Link>
            </div>
            <div className="flex items-center">
                <AccountDropdown/>
            </div>
        </div>
    );

}