import React from "react";
import {Link} from "react-router-dom";
import Addon from "./Addon.jsx";

export default function AddonSelector({addonPrice, setAddonPrice, totalDays}) {
    // list of addons such as insurance, gps, etc
    const addons = [
        {
            name: "Insurance",
            price: 10,
            max: 1,
            storageName: "insurance"
        },
        {
            name: "GPS",
            price: 5,
            max: 1,
            storageName: "gps"
        },
        {
            name: "Child Seat",
            price: 5,
            max: 2,
            storageName: "childSeat"
        }
    ];


    return (
        <div className={"p-3"}>
            <div className="flex">
                <div className="mb-2 inline-block ml-5">
                    <div className="text-2xl font-bold tracking-tight">Add-ons</div>
                    <div className="text-stone-600 mb-2">Add extra features to your reservation</div>
                    {
                        addons.map((a, index) => {
                            return <Addon key={index} addon={a} totalAddonPrice={addonPrice} setAddonPrice={setAddonPrice}/>
                        })
                    }
                </div>
            </div>

            <div className="grid justify-items-end mb-2">
                <div className="mt-2 inline-block">
                    <div className="text-stone-600 font-semibold">Add-ons: {(Math.round((addonPrice * totalDays) * 100) / 100).toFixed(2)}$</div>
                </div>
            </div>
            <hr className={'border-1 border-stone-300'}/>
        </div>
    );
}