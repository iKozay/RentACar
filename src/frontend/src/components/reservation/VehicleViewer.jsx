import React from "react";

export default function VehicleViewer({vehicle, changeSelection}) {
    return (
        <div className="flex justify-center">
                <div className="p-5">
                    <div className="block text-sm font-medium justify-end flex text-sky-500 mb-2">
                        <div className={'hover:text-sky-700 cursor-pointer'} onClick={changeSelection}>Change Selection</div>
                    </div>
                    <div className={'box-border border-inherit border-2 flex justify-center items-center'}>
                        <img src={vehicle.imageSrc}/>
                    </div>
                    <div className={"flex justify-center"}>
                        <div className="mb-2 text-2xl font-bold tracking-tight">{vehicle.fromDate} - {vehicle.toDate} ({computeNumOfDays(vehicle.fromDate,vehicle.toDate)} days)</div>
                    </div>
                    <div className={"flex justify-center"}>
                        <div className="mb-3 font-normal text-stone-600 inline-block">
                            <div className={'flex justify-center'}>
                                <div className={'block mr-2 mb-2'}>{vehicle.name}</div>
                                <div className={'block mb-2'}>{vehicle.price}$/day</div>
                            </div>
                            <div className={'flex justify-center'}>
                                <div className={'block mr-2 mb-2'}>Total: </div>
                                <div className={'block mr-2 mb-2'}>{computeTotal(vehicle.fromDate,vehicle.toDate,vehicle.price)}$</div>
                            </div>
                        </div>
                    </div>
                    <hr className={'border-1 border-stone-300'}/>
                </div>
        </div>
    );
}

function computeNumOfDays(fromDate, toDate) {
    const from = Date.parse(fromDate);
    const to = new Date(toDate);
    const diffTime = Math.abs(to - from);
    const diffDays = Math.round(diffTime / (1000 * 3600 * 24));
    return diffDays;
}


function computeTotal(fromDate, toDate, price) {
    return computeNumOfDays(fromDate, toDate) * price;
}
