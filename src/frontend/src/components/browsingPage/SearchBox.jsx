import { useState, useEffect, useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import LocationMap from "../../Pages/LocationMap";
import Modal from "../generalPurpose/Modal";
import { branchContext } from "../../Pages/BrowsingPage";

export default function SearchBox() {
  const {branchName, setBranchName} = useContext(branchContext);
  const [dateRange, setDateRange] = useState([new Date(), new Date(new Date().setDate(new Date().getDate() + 7))]);
 
  const [expandMap, setExpandMap] = useState(false);

  useEffect(() => {
    const storedBranch = JSON.parse(localStorage.getItem("branch"));
    if (storedBranch) {
      setBranchName(storedBranch.name);
    }
  }, []);

  function updateDates(update) {
    setDateRange(update);
    localStorage.setItem("startDate", update[0].toDateString());
    localStorage.setItem("endDate", update[1].toDateString());
  }

  return (
    <div className="flex-column">
      <div className="flex justify-center my-4">
        <form className="flex items-center bg-gray-800 rounded-full p-4">
          <div className="flex items-center px-2 mr-2">
            <button
              type="button"
              onClick={() => setExpandMap(true)}
              className="px-4 py-1 rounded-full bg-blue-500 text-white"
            >
              {branchName}
            </button>
          </div>
          <div>
            <DatePicker
              selectsRange={true}
              startDate={dateRange[0]}
              endDate={dateRange[1]}
              minDate={new Date()}
              onChange={updateDates}
              className="px-2 py-1 bg-white text-black rounded-full"
            />
          </div>
          <button
            type="button"
            className="ml-2 px-4 py-2 bg-white text-black rounded-full hover:bg-gray-300 focus:outline-none focus:ring focus:ring-gray-400"
          >
            Search
          </button>
        </form>
      </div>
      {expandMap && (
     
        <Modal onClose={() => setExpandMap(false)}>
          <LocationMap />
        </Modal>
      
      )}
    </div>
  );
}
