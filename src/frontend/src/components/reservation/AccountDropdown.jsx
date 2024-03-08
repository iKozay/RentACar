import React from 'react';

export default function AccountDropdown() {
    const [isDropdownVisible, setDropdownVisible] = React.useState(false);
    window.onclick = function(event) {
        if (!event.target.matches('.relative')) {
            setDropdownVisible(false);
        }
    }

    return (
        <div>
             <div>
                 <button id="accountBtn" className="relative inline-block bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded"
                            onClick={() => setDropdownVisible(!isDropdownVisible)}>
                    My Account
                 </button>
                 {isDropdownVisible && (
                     <div className={"absolute overflow-auto z-10 bg-slate-800 text-white p-2"}>
                        <p className={"p-2 block cursor-pointer hover:bg-slate-600"}>My Account</p>
                        <p className={"p-2 block cursor-pointer hover:bg-slate-600"}>My Reservations</p>
                        <hr/>
                        <p className={"p-2 block cursor-pointer hover:bg-slate-600"}>Logout</p>
                     </div>
                 )}
             </div>
        </div>
    );

}