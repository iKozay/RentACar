import fetchData from "../utilities/fetchData";
import { useState, useEffect } from "react";
import ViewReservations from "../components/dashboard/ViewReservations";
import Button from "../components/generalPurpose/Button";

export default function Reservations() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [reservations, setReservations] = useState([]);
  const [minimized, setMinimized] = useState(false);

  useEffect(() => {
    async function fetchReservations() {
      setLoading(true);
      const response = await fetchData(
        "http://localhost:3000/api/reservations",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data) {
        console.log(response.data);
        setReservations(response.data);
        setLoading(false);
        setSuccess(true);
      } else if (response.error) {
        setLoading(false);
        setError(true);
      }
    }
    fetchReservations();
  }, []); // Empty dependency array to fetch reservations only once when the component mounts

  return (
   
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Reservations</h2>
        <div>
          <Button
            handler={setMinimized}
            value={!minimized}
            color={"blue"}
            text={minimized ? "Expand" : "Minimize"}
            inline={true}
          />
        </div>
      </div>
      {!minimized && (
        success ? (
          reservations && <ViewReservations reservations={reservations} />
        ) : (
          <div className="p-2">
            {loading ? "Loading..." : "Failed to load vehicles"}
          </div>
        )
      )}
    </div>
  );
}
