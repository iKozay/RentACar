import { Link } from "react-router-dom";

export default function ViewReservations({ reservations }) {
  return (
    reservations &&
    reservations.map(
      (reservation) =>
        reservation && (
          <Link
            to={`/dashboard/reservations/${reservation._id}`}
            key={reservation._id}
            className="border rounded p-4 mb-4 hover:border-gray-700 duration-200 block w-full shadow-md hover:shadow-lg bg-white"
            style={{
              textDecoration: "none",
              transition: "background-color 0.3s",
            }}
          >
            <div className="flex flex-col">
              <div className="flex items-center mb-2">
                <strong className="mr-2 text-gray-700">Reservation ID:</strong>
                <span className="text-blue-600">{reservation._id}</span>
              </div>
              <div className="flex items-center mb-2">
                <strong className="mr-2 text-gray-700">Vehicle ID:</strong>
                <span className="text-blue-600">{reservation.vin?reservation.vin._id:"No car associated"}</span>
              </div>
              <div className="flex items-center mb-2">
                <strong className="mr-2 text-gray-700">
                  Reservation Date:
                </strong>
                <span className="text-blue-600">
                  {new Date(reservation.reservationDate).toLocaleString()}
                </span>
              </div>
              <div className="flex items-center mb-2">
                <strong className="mr-2 text-gray-700">Pickup Date:</strong>
                <span className="text-blue-600">
                  {new Date(reservation.pickupDate).toLocaleString()}
                </span>
              </div>
              <div className="flex items-center">
                <strong className="mr-2 text-gray-700">Return Date:</strong>
                <span className="text-blue-600">
                  {new Date(reservation.returnDate).toLocaleString()}
                </span>
              </div>
            </div>
          </Link>
        )
    )
  );
}
