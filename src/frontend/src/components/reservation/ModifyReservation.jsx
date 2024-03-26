import { useContext, useEffect, useState } from "react";
import {Link, useNavigation} from "react-router-dom";
import ReservationDetails from "./ReservationDetails.jsx";
import VehicleDetails from "./VehicleDetails.jsx";
import { UserContext } from "../../Pages/Root.jsx";
import {CancelReservation, FetchReservationById, FetchReservationsByUserId} from "../../utilities/ReservationUtils.js";
export default function ModifyReservation() {
  const reservationId = window.location.pathname.split("/").pop();
  const { user } = useContext(UserContext);
  const [response, setResponse] = useState(null);
  const [cancelled, setCancelled] = useState(false);
  const isCSR = (user && user.role === "representative");

  useEffect(()=>{
    if(user){
        FetchReservationById(reservationId).then((res) => {setResponse(res)});
    }
  },[])

  if (response && response.vin) {
    return (
      <div className="p-6 my-6 mx-10 bg-white rounded-md shadow-2xl shadow-stone-300">
        {cancelled && (
      <>
      <h2 className="text-red-600 font-bold mb-2">Reservation cancelled successfully</h2>
      <Link to="/user/reservation"><span className="mt-2 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">Go to My Reservations</span></Link>
    </>
    
        )}

        {!cancelled && (
          <table>
            <thead>
              <tr>
                <th>
                  <h2>VEHICLE DETAILS</h2>
                  <hr className={"pb-1"} />
                </th>
                <th>
                  <h2>RESERVATION DETAILS</h2>
                  <hr className={"pb-1"} />
                </th>
              </tr>
            </thead>
            <tr>
              <td className={"w-1/2"}>
                <VehicleDetails vehicle={response.vin}/>
              </td>
              <td className={"w-1/2"}>
                <ReservationDetails reservation={response} />
              </td>
            </tr>
            <tr>
              <td>
                <Link to={isCSR?"/csr/dashboard":"/user/reservation"}>
                  <button className="mt-5 float-left bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
                    Back
                  </button>
                </Link>
                {new Date(response.returnDate) > new Date() ? (
                  <button
                    className="mt-5 float-right bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                    onClick={async() => {await cancel(reservationId);setCancelled(true)}}
                  >
                    Cancel
                  </button>
                ) : null}
              </td>
            </tr>
          </table>
        )}
      </div>
    );
  }else{
    return <div></div>
  }
}

async function cancel(reservationId) {
    CancelReservation(reservationId);
}
