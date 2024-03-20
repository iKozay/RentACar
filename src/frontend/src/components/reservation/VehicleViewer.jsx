import React from "react";
import {useContext} from "react";
import {UserContext} from "../../Pages/Root";
import { Link } from 'react-router-dom';
import createReservation from "../../utilities/createReservation";
export default function VehicleViewer({vImage, dates, make,price,vehicleTotalPrice}) {
    //const {user} = useContext(UserContext);
    return (
        <div className="flex justify-center">
                <div className="p-3">
                    <div className="block text-sm font-medium justify-end flex text-sky-500 mb-2">
                        <Link to="/">
                            <div className={'hover:text-sky-700 cursor-pointer'}>Change Selection</div>
                        </Link>
                    </div>
                    <div className={'box-border border-inherit border-2 flex justify-center items-center'}>
                        <img src={vImage}/>
                    </div>
                    <div className={"flex justify-center"}>
                        <div className="mb-2 text-2xl font-bold tracking-tight">{dates}</div>
                    </div>
                    <div className={"flex justify-center"}>
                        <div className="mb-3 font-normal text-stone-600 inline-block">
                            <div >
                                <div className={'block mr-2 mb-2'}>{make}</div>
                            </div>
                            <div className={'flex justify-center'}>
                                <div className={'block mb-2'}>{price}$/day</div>
                            </div>
                        </div>
                    </div>
                    <div className="grid justify-items-end mb-2">
                        <div className="mt-2 inline-block">
                            <div className="text-stone-600 font-semibold">Vehicle: {(Math.round(vehicleTotalPrice * 100) / 100).toFixed(2)}$</div>
                        </div>
                    </div>
                    {/*<div className={"flex justify-center pb-1"}>*/}
                    {/*    <Link to={user?`/reservation/confirmation`:'/login'}>*/}
                    {/*        <button className={'bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded'}*/}
                    {/*            onClick={()=>{user? createReservation(vehicle._id,user.id,vehicle.pickupDate,vehicle.returnDate):()=>{}}}> Book Vehicle</button>*/}
                    {/*    </Link>*/}
                    {/*</div>*/}
                    <hr className={'border-1 border-stone-300'}/>
                </div>
        </div>
    );
}
