import fetchData from "./fetchData";
export default function isTokenValide(){
    const response = fetch("http://localhost:3000/api/auth/checkToken",{
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        }
    });
    if(response.ok)return true;
    else return false;
}