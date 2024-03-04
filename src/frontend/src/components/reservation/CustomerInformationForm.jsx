import React from "react";

export default function CustomerInformationForm() {

    //

    return (
        <div className="flex ">
            <div
                className="w-full p-6 mx-auto my-10 bg-white rounded-md shadow-2xl shadow-stone-300 text-sky-600 lg:max-w-xl ">
                <div className="mb-2 inline-block ">
                        <label className="block text-sm font-semibold text-gray-800 ">First Name</label>
                        <input type="email" className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"/>
                </div>
                <div className="ml-5 inline-block">
                    <label className="block text-sm font-semibold text-gray-800 ">Last Name</label>
                    <input type="email" className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"/>
                </div>
                <div className="mb-2 inline-block">
                    <label className="block text-sm font-semibold text-gray-800 ">Email</label>
                    <input type="email" className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"/>
                </div>
                <div className="ml-5 inline-block">
                    <label className="block text-sm font-semibold text-gray-800 ">Phone Number</label>
                    <input type="email" className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"/>
                </div>
            </div>
        </div>
    );
}