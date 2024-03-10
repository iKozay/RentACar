import { useContext } from "react";
import { Navigate, Outlet, Link } from "react-router-dom";
import { UserContext } from "./Root";
export default function AdminVerification() {
  const { user } = useContext(UserContext);
  //  const {user} = useOutletContext();

  console.log("User in AdminVerification:", user);
  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex w-full h-full">
      <aside className="flex flex-col h-full  w-1/4">
        {/* Content for the aside */}
        <Link to="account" className="p-1 font-medium">
          Account
        </Link>
        <Link to="customers" className="p-1 font-medium ">
          Customers
        </Link>
      </aside>
      <main className="h-full w-3/4">
        <Outlet />
      </main>
    </div>
  );
}
