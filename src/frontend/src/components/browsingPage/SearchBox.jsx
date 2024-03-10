import React, {useState} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'

export default function SearchBox(){

    const [pickupDate, setPickupDate] = useState(new Date());
    const [dropOffDate, setDropOffDate] = useState(new Date());

    return(

        <div className='flex my-4 justify-center mb-10'>
            <form className="flex mt-10 bg-slate-800 rounded-full p-4">
                <div className="flex items-stretch border-solid h-9 border-black mx-1">
                    <input placeholder='Location' className='flex-grow h-auto'></input>
                </div>
                <div>
                    <DatePicker showIcon selected={pickupDate} onChange={(date) => setPickupDate(date)} showTimeSelect timeFormat='HH:mm' timeIntervals={30} timeCaption='Time' dateFormat="MM/d/yyyy h:mm aa"/>
                </div>
                <div>
                    <DatePicker showIcon selected={dropOffDate} onChange={(date) => setDropOffDate(date)} showTimeSelect timeFormat='HH:mm' timeIntervals={30} timeCaption='Time' dateFormat="MM/d/yyyy h:mm aa"/>
                </div>
                <button type='button' className='text-black bg-white hover:bg-neutral-200 font-medium rounded-full px-4 py-2 ml-2'>Search</button>
            </form>
        </div>

    );
  
};
