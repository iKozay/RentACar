import fetchData from "./fetchData"

export async function CreateReservation(vin,userId,pickupDate,returnDate,addons){

    const response = await fetchData(`http://localhost:3000/api/reservations/`, {
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
        console.log("Successfully created the reservation")
        return response.data;
    }
    else if(response.error){
        alert("failed to create the reservation");
    }
    return false;
}

export async function ModifyReservation(reservationID,pickupDate,returnDate, addons, status){

    const response = await fetchData(`http://localhost:3000/api/reservations/${reservationID}`, {
        method: "PUT",
        mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(getBody(pickupDate,returnDate, addons, status))
    });
    if(response.data){
        console.log("Successfully modified the reservation.")
    }
    else if(response.error){
        alert("failed to modify the reservation.");
    }
}

function getBody(pickupDate,returnDate, addons, status){
    if(addons==null || pickupDate==null || returnDate==null) {
        return {
            status: status
        };
    }else{
        return {
            pickupDate: pickupDate,
            returnDate: returnDate,
            status: status,
            addons: addons
        };
    }
}

export async function CancelReservation(reservationID){
    await ModifyReservation(reservationID,null,null,null,"Cancelled");
}

export async function CheckInReservation(reservationID){
    await ModifyReservation(reservationID,null,null,null,"Checked In");
}

export async function CheckOutReservation(reservationID){
    await ModifyReservation(reservationID,null,null,null,"Checked Out");
}

export async function FetchReservationById(reservationID){
    const response = await fetchData(`http://localhost:3000/api/reservations/${reservationID}`, {
        method: "GET",
        credentials: "include", // Include cookies in the request
        mode: "cors", // Enable CORS
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
        }
    });
    if(response.data){
        console.log("Successfully fetched the reservation by id.")
        return response.data;
    }
    else if(response.error){
        alert("failed to fetch the reservation by id.");
    }
    return null;
}

export async function FetchReservationsByUserId(userId){
    let response = await fetchData(`http://localhost:3000/api/reservations/user/${userId}`, {
        method: "GET",
        credentials: "include", // Include cookies in the request
        mode: "cors", // Enable CORS
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
        }
    });
    if(response.data){
        console.log("Successfully fetched the reservations by user id.")
        return response.data;
    }
    else {
        alert("failed to fetch the reservation by user id.");
    }
    return null;
}

export async function DeleteReservation(reservationID){
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
        console.log("Successfully canceled the reservation.")
    }
    else if(response.error){
        alert("failed to cancel the reservation.");
    }
}