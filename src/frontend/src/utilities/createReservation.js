import fetchData from "./fetchData"

export default async function createReservation(vin,userId,pickupDate,returnDate,addons){

    let  response = await fetchData(`http://localhost:3000/api/reservations/`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
        vin:vin,
        reservationDate: new Date().toISOString(),
        pickupDate: new Date(pickupDate), // Convert string to Date object
        returnDate: new Date(returnDate), // Convert string to Date object
        userID: userId,
        addons: addons
    })
});
    if(response.data){
        const reservationId = response.data._id;
        const currentBranch = JSON.parse(localStorage.getItem('branch'));
       response= await fetchData(`http://localhost:3000/api/branches/reservations/${currentBranch.id}`,{
        method:"PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
           reservationId
        })
       })
       console.log("Successfully created the reservation")
        return response.data;
    }
    else if(response.error){
        alert("failed to create the reservation");
    }
}