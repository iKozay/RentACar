import SearchBox from "../components/browsingPage/SearchBox";
import VehicleList from "../components/browsingPage/VehicleList";

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
    </>
)
}

export default BrowsingPage;