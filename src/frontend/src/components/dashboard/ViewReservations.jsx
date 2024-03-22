import {Link} from 'react-router-dom';

export default function ViewReservations({reservations}){
    return (
        reservations.map((reservation) => (
            reservation && <Link
              to={`/dashboard/reservations/${reservation._id}`}
              key={reservation._id}
              className="border rounded p-4 mb-4 hover:border-gray-700 duration-200 block w-full"
              style={{
                textDecoration: "none",
                transition: "background-color 0.3s",
              }}
            >
              <div className="flex">
                <div
                  className="mb-2 mr-2"
                  style={{ fontWeight: "lighter" }}
                >
                  <strong>Reservation ID:</strong> {reservation._id}
                </div>
                <div
                  className="mb-2 mr-2"
                  style={{ fontWeight: "lighter" }}
                >
                  <strong>Vehicle ID:</strong> {reservation.vin._id}
                </div>
                <div
                  className="mb-2 mr-2"
                  style={{ fontWeight: "lighter" }}
                >
                  <strong>Reservation Date:</strong>{" "}
                  {new Date(
                    reservation.reservationDate
                  ).toLocaleString()}
                </div>
                <div
                  className="mb-2 mr-2"
                  style={{ fontWeight: "lighter" }}
                >
                  <strong>Pickup Date:</strong>{" "}
                  {new Date(reservation.pickupDate).toLocaleString()}
                </div>
                <div className="mb-2" style={{ fontWeight: "lighter" }}>
                  <strong>Return Date:</strong>{" "}
                  {new Date(reservation.returnDate).toLocaleString()}
                </div>
              </div>
            </Link>
          ))
    )
}