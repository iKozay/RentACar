import React, {useContext, useEffect} from "react";
import { Link } from 'react-router-dom';
import {useState} from "react";
import {FetchReservationsByUserId} from "../../utilities/ReservationUtils.js";
import {UserContext} from "../../Pages/Root.jsx";
export default function ViewReservation() {
    const [currentTab, setCurrentTab] = React.useState(0); // 0 for upcoming, 1 for past
    const [response,setResponse] = useState(null);

    const {user} = useContext(UserContext);
    useEffect(()=>{
        if(user){
            FetchReservationsByUserId(user.id).then((res) => {setResponse(res)});
        }
    },[user])


    const tabStyle = "p-3 transition duration-300 ease-in-out w-1/2";
    const selectedTab = (tab) => {
        return currentTab === tab ? " bg-white border-hidden" : " bg-zinc-300 hover:bg-zinc-400 border";
    }
    
    if(response){
        return (
            <div>
                <div className="p-6 my-6 mx-10 bg-white rounded-md shadow-2xl shadow-stone-300">
                    <div>
                        <Link to="/">
                            <button className="float-right ml-20 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">Make Reservation</button>
                        </Link>
                    </div>
                    <div className="overflow-hidden border">
                        <button className={tabStyle+selectedTab(0)}  onClick={(e) => setCurrentTab(0)}>Upcoming</button>
                        <button className={tabStyle+selectedTab(1)} onClick={(e) => setCurrentTab(1)}>Past</button>
                    </div>
                    {response && currentTab === 0 ? tabContent(currentTab === 0,response) : tabContent(currentTab === 0,response)}
                </div>
            </div>
        );
    }
}

function tabContent(upcoming,response) {

    // modify the response to only include upcoming or past reservations
    if(upcoming){
        response = response.filter((reservation) => new Date(reservation.returnDate) > new Date());
    }else {
        response = response.filter((reservation) => new Date(reservation.returnDate) < new Date());
    }
    
    // return table displaying the reservations
    return (
        <div className={"overflow-x-auto"}>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className={"text-xs text-gray-700 uppercase bg-gray-50"}>
                <tr>
                    <th className="px-6 py-3">ID</th>
                    <th className="px-6 py-3">Vehicle</th>
                    <th className="px-6 py-3">From</th>
                    <th className="px-6 py-3">To</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Action</th>
                </tr>
                </thead>
                <tbody>
                {response && response.map((reservation) => (
                       reservation.vin &&  <tr key={reservation._id} className={"odd:bg-white even:bg-gray-50 border-b"}>
                            <td className={"px-6 py-4 font-medium text-gray-900 whitespace-nowrap"}>{reservation._id}</td>
                            <td className={"px-6 py-4 font-medium text-gray-900 whitespace-nowrap"}>
                            <img src={reservation.vin.Image} alt="Vehicle" width="12%" height="12%" className={"float-left"}/>
                                <p>{reservation.vin.make}</p>
                            </td>
                            <td className={"px-6 py-4 font-medium text-gray-900 whitespace-nowrap"}>{new Date(reservation.pickupDate).toISOString().split('T')[0]}</td>
                            <td className={"px-6 py-4 font-medium text-gray-900 whitespace-nowrap"}>{new Date(reservation.returnDate).toISOString().split('T')[0]}</td>
                            <td className={"px-6 py-4 font-medium text-gray-900 whitespace-nowrap"}>{reservation.status}</td>
                            <td className="font-medium text-blue-600 hover:underline ">
                                <Link to={"/reservation/details/"+reservation._id}>
                                    <button className="font-medium text-blue-600 hover:underline">View</button>
                                </Link>
                            </td>
                        </tr>
                    )
                )}
                </tbody>
            </table>
        </div>
    );
}