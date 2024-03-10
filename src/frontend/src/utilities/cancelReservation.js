import fetchData from "./fetchData"

export default async function cancelReservation(reservationID){

    const response = await fetchData(`http://localhost:3000/api/reservations/${reservationID}`, {
    method: "DELETE",
    mode: "cors",
    credentials: "include",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
    }
});
    if(response.data){
       console.log("Successfully canceled the reservation")
    }
    else if(response.error){
        alert("failed to cancel the reservation");
    }
}