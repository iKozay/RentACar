import React, {useState} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'

export default function SearchBox(){

    const [pickupDate, setPickupDate] = useState(new Date());
    const [dropOffDate, setDropOffDate] = useState(new Date());

    return(

        <form class="flex mt-1">
            <div className="bg-white mx-1 flex w-1/2 p-1 border-solid h-9 border-black">
                <input placeholder='    Location' className='mx-0 flex p-1 h-auto border-none'></input>
            </div>
            <div>
                <DatePicker showIcon selected={pickupDate} onChange={(date) => setPickupDate(date)} showTimeSelect timeFormat='HH:mm' timeIntervals={30} timeCaption='Time' dateFormat="MM/d/yyyy h:mm aa"/>
            </div>
            <div>
                <DatePicker showIcon selected={dropOffDate} onChange={(date) => setDropOffDate(date)} showTimeSelect timeFormat='HH:mm' timeIntervals={30} timeCaption='Time' dateFormat="MM/d/yyyy h:mm aa"/>
            </div>
        </form>

    );
  
};
