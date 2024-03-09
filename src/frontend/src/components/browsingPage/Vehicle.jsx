import styles from "../../styles/Vehicle.module.css";
import PersonIcon from '@mui/icons-material/Person';
import LuggageIcon from '@mui/icons-material/Luggage';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
const Vehicle = ({vehicle}) => {
    return (
        <a key={vehicle._id} href={vehicle.href} className="flex border border-gray-400 rounded-lg overflow-hidden h-48 lg:h-100 hover:border-gray-900 duration-200 p-1 group">
        <div className="basis-2/5 overflow-hidden">
          <img
            src={vehicle.Image}
            alt={"car"}
            className="rounded-lg h-full w-full object-cover object-center  group-hover:scale-105 group-hover:rotate-3 duration-200"
          />
        </div>
        <div className="basis-3/5 flex flex-col p-4 group-hover:opacity-75">
        <h3 className="mt-4 text-lg text-gray-900 font-medium ">{vehicle.make}{" "}<span className="text-gray-500">{vehicle.model}</span></h3>
        <div className="mt-1  font-medium text-gray-900">
          <span className="flex items-center space-x-2"><PersonIcon></PersonIcon><span className="pl-0.1">{" Seats:"} {vehicle.numberOfSeats}</span></span>
          <span className="flex items-center space-x-2"><LuggageIcon></LuggageIcon><span className="pl-0.1">{" Baggage:"} {vehicle.numberOfBaggage}</span></span>
          <span className="flex items-center space-x-2"><AirportShuttleIcon></AirportShuttleIcon><span className="pl-0.1">{" Doors:"} {vehicle.numberOfDoors}</span></span>
          <span className="flex items-center space-x-2"><AttachMoneyIcon></AttachMoneyIcon><span className="pl-0.1">{" Price for 1 day:"}  <span className="font-bold text-lg text-gray-900">{"CAD"} {vehicle.price}</span></span></span>
        </div>

        </div>
 
      </a>
     
    )
}
export default Vehicle;