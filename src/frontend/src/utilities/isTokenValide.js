import fetchData from "./fetchData";
export default function isTokenValide(){
    const response = fetchData("http://localhost:3000/api/auth/checkToken",{
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        }
    });
    if(response.error)return false;
    return true;
}