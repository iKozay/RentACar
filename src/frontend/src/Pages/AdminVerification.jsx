
import { useContext} from "react";
import {Navigate, Outlet} from "react-router-dom";
import {UserContext} from "./Root";
export default function AdminVerification(){
     const {user} = useContext(UserContext);
    //  const {user} = useOutletContext();

    console.log("User in AdminVerification:", user);
     if(!user || user.role !== "admin"){
        return <Navigate to="/" replace/>;
     }
    

     return (<div>
        <Outlet/>
        </div>)
}