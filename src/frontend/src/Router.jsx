import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Pages/Login";
import Root from "./Pages/Root";
import BrowsingPage from "./Pages/BrowsingPage";
import Signup from "./Pages/Signup.jsx";

import MakeReservationPage from "./Pages/MakeReservationPage";
import ConfirmationPage from "./Pages/ConfirmationPage";
import ViewReservationPage from "./Pages/ViewReservationPage";
import ReservationDetailsPage from "./Pages/ReservationDetailsPage.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import Customers from "./Pages/Customers.jsx";
import Account from "./Pages/Account.jsx";
import Customer from "./Pages/Customer.jsx";
import Reservation from "./Pages/Reservation.jsx";
import Vehicles from "./Pages/Vehicles.jsx";
import Vehicle from "./Pages/Vehicle.jsx";
import AddVehicle from "./Pages/AddVehicle.jsx";
import LocationMap from "./Pages/LocationMap.jsx";
import RepresentativeDashboard from "./Pages/RepresentativeDashboard.jsx";
import Branches from "./Pages/Branches.jsx";
import Branch from "./Pages/branch.jsx";

import DashboardAnalysis from "./Pages/DashboardAnalysis.jsx";
import Reservations from "./Pages/Reservations.jsx";

import CheckInPage from "./Pages/CheckInPage.jsx";
import AddBranch from "./Pages/AddBranch.jsx";
import CheckOutPage from "./Pages/CheckOutPage.jsx";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        // {
        //   index: true,
        //   element: <div>Welcome to CarRentals</div>,
        // },
        {
          index: true,
          element: <BrowsingPage />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "signup",
          element: <Signup />,
        },
        {
          path: "reservation/book/:vehicleId",
          element: <MakeReservationPage />,
        },
        {
          path: "reservation/confirmation",
          element: <ConfirmationPage />,
        },
        {
          path: "user/reservation",
          element: <ViewReservationPage />,
        },
        {
          path: "reservation/details/:reservationId",
          element: <ReservationDetailsPage />,
        },
        {
          path: "reservation/branches",
          element: <LocationMap />,
        },
        {
          path: "csr/dashboard",
          element: <RepresentativeDashboard />,
        },
        {
          path: "reservation/checkin/:reservationId",
          element: <CheckInPage/>,
        },
        {
          path: "reservation/checkout/:reservationId",
          element: <CheckOutPage/>,
        },

        {
          path: "dashboard",
          element: <Dashboard />,
          children: [
            {
              index:true,
              element:<DashboardAnalysis/>
            },
            {
              path: "customers",
              element: <Customers />,
            },
            {
              path: "customers/:customerId",
              element: <Customer />,
            },
            {
              path: "account",
              element: <Account />,
            },
            {
              path: "reservations/:reservationId",
              element: <Reservation />,
            },
            {
              path: "vehicles",
              element: <Vehicles />,
            },
            {
              path: "vehicles/:vehicleId",
              element: <Vehicle />,
            },
            {
              path: "vehicles/add-vehicle",
              element: <AddVehicle />,
            },
            {
              path: "branches",
              element: <Branches />,
            },
            {
              path: "branches/:branchId",
              element: <Branch />,
            },
            {
              path: "branches/add-branch",
              element:<AddBranch/>
            },
            {
              path: "reservations",
              element: <Reservations/>,
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};
export default Router;
