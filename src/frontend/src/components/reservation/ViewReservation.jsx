import React from "react";
import { Link } from 'react-router-dom';
import { UserContext } from "../../Pages/Root";
import {useContext, useState, useEffect} from "react";
export default function ViewReservation() {
    const {user} = useContext(UserContext);
    const [currentTab, setCurrentTab] = React.useState(0); // 0 for upcoming, 1 for past
    const [response,setResponse] = useState([]);
    console.log(user);
    useEffect(()=>{
        async function fetchVehicle(vin){
            let vehicle = await fetch(`http://localhost:3000/api/vehicles/vehicle/${vin}`,{
                method: "GET",
                credentials: "include", // Include cookies in the request
                mode: "cors", // Enable CORS
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                }
            });
            vehicle = await vehicle.json();
            return vehicle;
        }
        async function fetchReservations(){
         let response = await fetch(`http://localhost:3000/api/reservations/user/${user.id}`,{
             method: "GET",
             credentials: "include", // Include cookies in the request
             mode: "cors", // Enable CORS
             headers: {
               "Content-Type": "application/json",
               "Authorization": `Bearer ${localStorage.getItem("token")}`,
             }
         });
         response = await response.json();
            for(let i = 0; i < response.length; i++){
                let vehicle = await fetchVehicle(response[i].vin);
                response[i].vehicle = vehicle;
            }
         setResponse(response);
        }

        fetchReservations();
     },[user])
    const tabStyle = "p-3 transition duration-300 ease-in-out w-1/2";
    const selectedTab = (tab) => {
        return currentTab === tab ? " bg-white border-hidden" : " bg-zinc-300 hover:bg-zinc-400 border";
    }
    
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
                    <th className="px-6 py-3">Action</th>
                </tr>
                </thead>
                <tbody>
                {response.map((reservation) => (
                        <tr key={reservation._id} className={"odd:bg-white even:bg-gray-50 border-b"}>
                            <td className={"px-6 py-4 font-medium text-gray-900 whitespace-nowrap"}>{reservation._id}</td>
                            <td className={"px-6 py-4 font-medium text-gray-900 whitespace-nowrap"}>
                                <img src={reservation.vehicle.Image} alt="Vehicle" width="12%" height="12%" className={"float-left"}/>
                                <p>{reservation.vehicle.make}</p>
                            </td>
                            <td className={"px-6 py-4 font-medium text-gray-900 whitespace-nowrap"}>{new Date(reservation.pickupDate).toISOString().split('T')[0]}</td>
                            <td className={"px-6 py-4 font-medium text-gray-900 whitespace-nowrap"}>{new Date(reservation.returnDate).toISOString().split('T')[0]}</td>
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