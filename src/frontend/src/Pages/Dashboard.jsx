import { useContext,useEffect,useState } from "react";
import { Navigate, Outlet, Link } from "react-router-dom";
import { UserContext } from "./Root";
import notifications from "../utilities/notifications";
export default function AdminVerification() {
  const { user } = useContext(UserContext);
  const [notification,setNotification]=useState(false);
  // Redirect to homepage if user is not an admin

  useEffect(()=>{
     async function notificationFetch(){
      const notify = await notifications(user.id);
      setNotification(notify);
     }
     notificationFetch();
  })
  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }
  return (
    <div className="bg-gray-800 h-full">
      <div className="flex h-screen">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-800 text-white">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Admin Dashboard</h2>
            <nav>
              <ul>
                {/* <li>
                <Link
                  to="account"
                  className="block py-2 px-4 hover:bg-gray-700"
                >
                  Account
                </Link>
              </li> */}
                <li>
                  <Link
                    to="/dashboard"
                    className="block py-2 px-4 hover:bg-gray-700"
                  >
                    home
                  </Link>
                </li>
                <li>
                  <Link
                    to="customers"
                    className="block py-2 px-4 hover:bg-gray-700"
                  >
                    Customers
                  </Link>
                </li>
                <li>
                  <Link
                    to="vehicles"
                    className="block py-2 px-4 hover:bg-gray-700"
                  >
                    Vehicles
                  </Link>
                </li>
                <li>
                  <Link
                    to="branches"
                    className="block py-2 px-4 hover:bg-gray-700"
                  >
                    Branches
                  </Link>
                </li>
                <li>
                  <Link
                    to="reservations"
                    className="block py-2 px-4 hover:bg-gray-700"
                  >
                    Reservations
                  </Link>
                </li>
                <li>
                  <Link
                    to="issues"
                    className="flex items-center justify-between block py-2 px-4 hover:bg-gray-700"
                  >
                    Issues{" "}
                    {(notification) && (
                      <span><div className="mt-1 mr-5 w-3 h-3 rounded-full bg-red-500"></div></span>
                    )}
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </aside>

        <main className="flex-1 bg-gray-100 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
