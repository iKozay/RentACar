import SearchBox from "../components/browsingPage/SearchBox";
import VehicleList from "../components/browsingPage/VehicleList";
import RecentlyViewed from "../components/swiper/recentlyViewed";

import { createContext,useState ,useEffect } from "react";
export const  branchContext = createContext(null);
const BrowsingPage = () => {
    const [branchName, setBranchName] = useState("");

    const [recentVehicle, setRecentVehicle] = useState([]);

    

    useEffect(() => {

      
        const fetchAll = async() => {
            let vehicles = JSON.parse(localStorage.getItem("vehicles") || "[]");

            if (vehicles.length ===4){
                setRecentVehicle(vehicles);
            }
            else {

                const response = await fetch(
                    "http://localhost:3000/api/vehicles/vehicles",
                    {
                      method: "GET",
                      headers: {
                        "Content-Type": "application/json",
                        //Authorization: `Bearer ${localStorage.getItem("token")}`,
                      },
                    }
                  );            
                const data = await response.json();
                console.log(data)

                localStorage.setItem("vehicles", JSON.stringify(data.slice(0,4)));

                setRecentVehicle(data.slice(0,4));

                }
            };
            fetchAll();
        },[] )
    
return (
    
    <>
    <branchContext.Provider value={{branchName,setBranchName}}>
    <SearchBox/>
    <VehicleList/>
    </branchContext.Provider>
    <RecentlyViewed recentVehicle={recentVehicle}/>
    </>
)
}

export default BrowsingPage;