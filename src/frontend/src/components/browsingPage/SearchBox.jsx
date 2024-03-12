import React, {useState} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'

export default function SearchBox(){

    const [dateRange, setDateRange] = useState([new Date(), new Date()]);
    const [startDate, endDate] = dateRange;

    return(

        <div className='flex my-4 justify-center mb-10'>
            <form className="flex mt-10 bg-slate-800 rounded-full p-4">
                <div className="flex items-stretch border-solid h-42px border-black mx-1">
                    <input placeholder='Location' className='flex-grow h-auto'></input>
                </div>
                <div>
                <DatePicker selectsRange={true} startDate={startDate} endDate={endDate} minDate={new Date()} onChange={(update) => updateDates(setDateRange,update)}/>
                </div>
                <button type='button' className='text-black bg-white hover:bg-neutral-200 font-medium rounded-full px-4 py-2 ml-2'>Search</button>
            </form>
        </div>

    );
}

function updateDates(setDateRange,update){
    setDateRange(update);
    localStorage.setItem('startDate',update[0].toDateString());
    localStorage.setItem('endDate',update[1].toDateString());
}


