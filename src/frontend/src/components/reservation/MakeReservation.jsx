import React, { useState, useEffect } from "react";
import ReservationForm from "./ReservationForm.jsx";
import { useParams,useOutletContext } from "react-router-dom";

export default function MakeReservation() {
    const {user} = useOutletContext()
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [loading, setLoading] = useState(true);
    const { vehicleId } = useParams(); // Extract vehicleId from URL params

    useEffect(() => {
        async function fetchVehicle() {
            try {
                const response = await fetch(`http://localhost:3000/api/vehicles/vehicle/${vehicleId}`, {
                    method: "GET",
                    credentials: "include", // Include cookies in the request
                    mode: "cors", // Enable CORS
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch vehicle");
                }
                const vehicleData = await response.json();
                setSelectedVehicle(vehicleData);
            } catch (error) {
                console.error("Error fetching vehicle:", error);
                // Handle error (e.g., display error message)
            } finally {
                setLoading(false);
            }
        }
        fetchVehicle();
    }, [vehicleId]); // Fetch when vehicleId changes

    const currentUser = {
        id: 1
        // other info here
    };

    const goToConfirmation = () => {
        window.open("/reservation/confirmation", "_self");
    };

    return (
        <div>
            {loading && <div>Loading</div>}
            {!loading && selectedVehicle && (
                <div>
                    <ReservationForm selectedVehicle={selectedVehicle} currentUser={currentUser} setReservationBooked={goToConfirmation} />
                </div>
            )}
        </div>
    );
}