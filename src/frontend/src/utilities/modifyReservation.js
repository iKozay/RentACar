import fetchData from "./fetchData"

export default async function modifyReservation(reservationID,pickupDate,returnDate){

    const response = await fetchData(`http://localhost:3000/api/reservations/${reservationID}`, {
    method: "PUT",
    mode: "cors",
    credentials: "include",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
        pickupDate: new Date(pickupDate), // Convert string to Date object
        returnDate: new Date(returnDate), // Convert string to Date object
    })
});
    if(response.data){
       console.log("Successfully modified the reservation")
    }
    else if(response.error){
        alert("failed to modify the reservation");
    }
}