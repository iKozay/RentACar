import React from 'react';
export default function Addon({addon, totalAddonPrice,setAddonPrice}) {
    const [quantity, setQuantity] = React.useState(0);
    localStorage.setItem(addon.storageName, quantity);

    const increment = () => {
        if(quantity < addon.max) {
            setQuantity(quantity+1);
            setAddonPrice(totalAddonPrice+addon.price);
        }
    }
    const decrement = () => {
        if(quantity > 0) {
            setQuantity(quantity-1);
            setAddonPrice(totalAddonPrice-addon.price);
            // localStorage.setItem(addon.storageName, quantity);
        }
    }
    return (
        <div className="pb-16">
            <div className="text-stone-600 float-left">{addon.name} ({addon.price}$)</div>
            <div className="grid justify-items-end float-right">
                <div className="relative flex items-center max-w-[8rem] ">
                    <button
                        onClick={decrement}
                        className="bg-gray-50 hover:bg-slate-100 border rounded-s-lg p-3 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none">
                        <svg className="w-3 h-3 text-black" aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M1 1h16"/>
                        </svg>
                    </button>
                    <input className="bg-white border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5"
                           required value={quantity}/>
                    <button
                        onClick={increment}
                            className="bg-gray-50 hover:bg-slate-100 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none">
                        <svg className="w-3 h-3 text-black" aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M9 1v16M1 9h16"/>
                        </svg>
                    </button>
                </div>
                {/*<button className="bg-blue-500 text-white p-2 rounded-lg w-10" onClick={decrement}>-</button>*/}
                {/*<div className="bg-white p-2 rounded-lg w-10">{quantity}</div>*/}
                {/*<button className="bg-blue-500 text-white p-2 rounded-lg w-10" onClick={increment}>+</button>*/}
            </div>
        </div>
    );
}