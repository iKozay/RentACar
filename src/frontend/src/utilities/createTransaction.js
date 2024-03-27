import fetchData from "./fetchData"

export default async function createTransaction(name,cardNumber, expDate, ccv, amount, userId, reservationId){

    const response = await fetchData(`http://localhost:3000/api/transactions/add`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
        name: name,
        cardNumber: cardNumber,
        expDate: expDate,
        ccv: ccv,
        date: new Date().toISOString(),
        amount: amount,
        userId: userId,
        reservationId: reservationId
    })
});
    if(response.data){
       console.log("Successfully created the transaction")
    }
    else if(response.error){
        alert("failed to create the transaction");
        console.log(response.error);
    }
}