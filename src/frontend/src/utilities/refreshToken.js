import fetchData from "./fetchData"

export default async function refreshToken(setToken){

     const response =await fetchData("http://localhost:3000/api/auth/refreshToken",{
            method: "GET",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
              },
        });
    if(response.data){
        setToken(response.data.token);
    }
    else if(response.error){
        setToken(null);
    }
}