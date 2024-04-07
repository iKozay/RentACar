import SearchBox from "../components/browsingPage/SearchBox";
import VehicleList from "../components/browsingPage/VehicleList";
import RecentlyViewed from "../components/swiper/recentlyViewed";

import { createContext,useState  } from "react";
export const  branchContext = createContext(null);
const BrowsingPage = () => {
    const [branchName, setBranchName] = useState("");
return (
    
    <>
       <branchContext.Provider value={{branchName,setBranchName}}>
    <SearchBox/>
    <VehicleList/>
    </branchContext.Provider>
    <RecentlyViewed/>
    </>
)
}

export default BrowsingPage;