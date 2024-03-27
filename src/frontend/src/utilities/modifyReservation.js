// import fetchData from "./fetchData"
//
//
//
// export default async function modifyReservation(reservationID,pickupDate,returnDate, addons, status){
//
//     const response = await fetchData(`http://localhost:3000/api/reservations/${reservationID}`, {
//     method: "PUT",
//     mode: "cors",
//     credentials: "include",
//     headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${localStorage.getItem("token")}`,
//     },
//     body: JSON.stringify(getBody(pickupDate,returnDate, addons, status))
// });
//     if(response.data){
//        console.log("Successfully modified the reservation")
//     }
//     else if(response.error){
//         alert("failed to modify the reservation");
//     }
// }
//
// function getBody(pickupDate,returnDate, addons, status){
//     if(addons==null || pickupDate==null || returnDate==null) {
//         return {
//             status: status
//         };
//     }else{
//         return {
//             pickupDate: pickupDate,
//             returnDate: returnDate,
//             status: status,
//             addons: addons
//         };
//     }
// }