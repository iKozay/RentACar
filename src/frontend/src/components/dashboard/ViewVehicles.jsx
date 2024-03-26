import {Link} from 'react-router-dom'; 
export default function ViewVehicles({vehicles}){
  return (    vehicles.map((vehicle, index) => (
        <Link
          key={vehicle._id}
          to={`/dashboard/vehicles/${vehicle._id}`}
          className={`flex items-center p-3 ${
            index % 2 === 0 ? "bg-gray-200" : "bg-white"
          } border border-gray-300 hover:border-gray-700 rounded-md`}
          style={{ textDecoration: "none" }}
        >
          <div className="flex-1 text-center">{vehicle.make}</div>
          <div className="flex-1 text-center">{vehicle.model}</div>
          <div className="flex-1 text-center">{vehicle.price}</div>
          <div className="flex-1 text-center">
            <img
              src={`${vehicle.Image}`}
              alt=""
              style={{textAlign:"center", maxWidth: "100px" }}
            />
          </div>
        </Link>
      ))
  )
}