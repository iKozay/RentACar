import fetchData from "./fetchData";
export default async function getUser() {
  
    const response = await fetchData("http://localhost:3000/api/users", {
      method: "GET",
      credentials: "include", // Include cookies in the request
      mode: "cors", // Enable CORS
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
    });
 console.log(response);
//    console.log(response.error);
   
    }