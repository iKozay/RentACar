import fetchData from "./fetchData";
export default function isTokenValide(){
    const response = fetch("http://localhost:3000/api/auth/checkToken",{
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
        }
    });
    if(response.ok)return true;
    else return false;
}