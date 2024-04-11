import fetchData from "./fetchData";
export default async function logout(setToken) {
  
    const response = await fetchData("http://localhost:3000/api/auth/logout", {
      method: "GET",
      credentials: "include", // Include cookies in the request
      mode: "cors", // Enable CORS
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if(response.data){
         localStorage.removeItem("token");
         setToken(null);
         console.log("done");
    }
   
    }