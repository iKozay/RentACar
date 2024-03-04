import React from "react";

export default function Payment() {
    return (
        <div className="flex ">
            <div
                className="w-full p-6 my-6 mx-auto bg-white rounded-md shadow-2xl shadow-stone-300 text-sky-600 lg:max-w-xl ">
                <div className="mb-2 inline-block ">
                    <label className="block text-sm font-semibold text-gray-800 ">Name</label>
                    <input type="email" className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"/>
                    <label className="block text-sm mt-2 font-semibold text-gray-800 ">Card Number</label>
                    <input type="email" className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"/>
                    <div className="mb-2 mr-5 inline-block">
                        <label className="block text-sm font-semibold mt-2 text-gray-800 ">Expiration Date</label>
                        <input type="email" className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"/>
                    </div>
                    <div className="mb-2 inline-block">
                        <label className="block text-sm font-semibold mt-2 text-gray-800 ">CVV/CCV</label>
                        <input type="email" className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"/>
                    </div>
                </div>
            </div>
        </div>


    );
}