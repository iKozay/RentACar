import fetchData from "./fetchData"

export default async function createReservation({vin,userId}){

    const response = await fetchData("http://localhost:3000/api/reservations", {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
        vin,
        reservationDate: new Date("2024/3/8"), // Convert string to Date object
        pickupDate: new Date("2024/3/9"), // Convert string to Date object
        returnDate: new Date("2024/3/15"), // Convert string to Date object
        userID: userId,
    })
});
    if(response.data){
       alert("Successfully created the reservation")
    }
    else if(response.error){
        alert("failed to create the reservation");
    }
}