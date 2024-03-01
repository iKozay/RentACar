import React from "react";

export function Confirmation() {
    const firstName = "John";
    const lastName = "Doe";
    const email = "john.doe@example.com";
    const phoneNumber = "123-456-7890";
    const carDetails = "Car details here";
    const fromDate = "From date here";
    const toDate = "To date here";
    const cardName = "John Doe";
    const cardNumber = "**** **** **** 1121";
    const cardExp = "12/23";

    return (
        <div className="flex ">
            <div
                className="w-full p-6 my-6 mx-auto bg-white rounded-md shadow-2xl shadow-stone-300 lg:max-w-xl ">
                <div>
                    <h1 className={'text-left'}>Customer Information</h1><hr></hr>
                    <div className="mb-2 inline-block ">
                        <div className={'m-1'}>First Name: {firstName}</div>
                        <div className={'m-1'}>Last Name: {lastName}</div>
                    </div>
                    <div className="mb-2 inline-block ">
                        <div className={'m-1'}>Email: {email}</div>
                        <div className={'m-1'}>Phone Number: {phoneNumber}</div>
                    </div>
                </div>
                <div>
                    <h1 className={'text-left'}>Car Selection</h1><hr></hr>
                    <div className="mb-2 inline-block ">
                        <div>{carDetails}</div>
                        <div>From: {fromDate}</div>
                        <div>To: {toDate}</div>
                    </div>
                </div>
                <div>
                    <h1 className={'text-left'}>Payment</h1><hr></hr>
                    <div className="mb-2 inline-block ">
                        <div>Name on Card: {cardName}</div>
                        <div>Card Number: {cardNumber}</div>
                        <div>Expiration: {cardExp}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}