import { Link } from "react-router-dom";
import fetchData from "../utilities/fetchData";
import { useState, useEffect } from 'react';

export default function Vehicles() {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        async function fetchVehicles() {
            setLoading(true);
            const response = await fetchData("http://localhost:3000/api/vehicles/vehicles", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
            });
            if (response.data) {
                setVehicles(response.data);
                setLoading(false);
                setSuccess(true);
            } else if (response.error) {
                setLoading(false);
                setError(true);
            }
            setLoading(false);
        }
        fetchVehicles();
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-lg font-semibold mb-2">Vehicles</h2>
            <div className="border border-collapse">
                <div className="bg-gray-100 flex p-2">
                    <div className="flex-1">Make</div>
                    <div className="flex-1">Model</div>
                    <div className="flex-1">Price</div>
                </div>
                {success ? (
                    vehicles.map((vehicle, index) => (
                        <Link 
                            key={vehicle._id} 
                            to={`${vehicle._id}`} 
                            className={`flex items-center p-4 ${index % 2 === 0 ? 'bg-gray-200' : 'bg-white'} border border-gray-300 hover:border-gray-700 rounded-md`}
                            style={{ textDecoration: 'none' }}
                        >
                            <div className="flex-1">{vehicle.make}</div>
                            <div className="flex-1">{vehicle.model}</div>
                            <div className="flex-1">{vehicle.price}</div>
                            <div>
                                <img src={`${vehicle.Image}`} alt="" style={{ maxWidth: "100px" }} />
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="p-2">{loading ? "Loading..." : "Failed to load vehicles"}</div>
                )}
            </div>
        </div>
    );
}
