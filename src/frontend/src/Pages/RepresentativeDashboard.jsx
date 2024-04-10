import {Link, Navigate} from "react-router-dom";
import {UserContext} from "./Root.jsx";
import {useContext, useEffect, useState} from "react";

export default function RepresentativeDashboard() {
    const {user} = useContext(UserContext);
    const [response,setResponse] = useState([]);
    const [searchable,setSearchable] = useState([]);
    const [filter,setFilter] = useState("Username");

    if (!user || user.role !== "representative") {
        return <Navigate to="/" replace />;
    }

    useEffect(()=>{
        async function fetchReservations(){

            let response = await fetch(`http://localhost:3000/api/reservations/`,{
                method: "GET",
                credentials: "include", // Include cookies in the request
                mode: "cors", // Enable CORS
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                }
            });
            response = await response.json();
            setResponse(response);
            setSearchable(response);

        }
        fetchReservations();
    },[user])

    const filterBy = (e) => {
        let temp = [];
        if(filter === "reservation"){
            temp = response.filter((reservation) => reservation._id.includes(e.target.value))
        }else {
            temp = response.filter((reservation) => reservation.userID && reservation.userID.username.includes(e.target.value))
        }
        setSearchable(temp);
    }
    const selectFilter = (e) => {
        setFilter(e.target.value);
        document.getElementById("search").value = "";
        setSearchable(response);
    }



    return (
        <div>
            <div className="p-6 my-6 mx-10 bg-white rounded-md shadow-2xl shadow-stone-300">
                {(response) ?
                <div className={"overflow-x-auto"}>
                    <div className={"flex justify-center"}>
                        <select className="w-1/6 my-2 p-2 mx-2 border border-gray-300 rounded-md" onChange={selectFilter}>
                            <option value="user" selected="selected">Username</option>
                            <option value="reservation" >Reservation ID</option>
                        </select>
                        <input type="text" className="w-1/2 my-2 p-2 border border-gray-300 rounded-md" placeholder="Search..."
                               onChange={(e) => filterBy(e)} id={"search"}
                        />
                    </div>
                    <div className={"overflow-y-scroll h-80"}>
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className={"text-xs text-gray-700 uppercase bg-gray-50"}>
                            <tr>
                                <th className="px-6 py-3">ID</th>
                                <th className="px-6 py-3">Username</th>
                                <th className="px-6 py-3">Vehicle</th>
                                <th className="px-6 py-3">From</th>
                                <th className="px-6 py-3">To</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {response && searchable.map((reservation) => (
                                    reservation.vin && reservation.userID &&  <tr key={reservation._id} className={"odd:bg-white even:bg-gray-50 border-b"}>
                                        <td className={"px-6 py-4 font-medium text-gray-900 whitespace-nowrap"}>{reservation._id}</td>
                                        <td className={"px-6 py-4 font-medium text-gray-900 whitespace-nowrap"}>{(reservation.userID.username)}</td>
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
                </div>:null}
            </div>
        </div>
    );
}