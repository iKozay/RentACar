import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Pages/Login";
import Root from "./Pages/Root";
import BrowsingPage from "./Pages/BrowsingPage"


import MakeReservationPage from "./Pages/MakeReservationPage";
import ConfirmationPage from "./Pages/ConfirmationPage";
import ViewReservationPage from "./Pages/ViewReservationPage";
import ReservationDetailsPage from "./Pages/ReservationDetailsPage.jsx";
import AdminVerification from "./Pages/AdminVerification.jsx";
import Dashboard from "./Pages/Dashboard.jsx";

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
          path:"admin",
          element:<AdminVerification/>,
          children:[
            {
              index: true,
              element:<Dashboard/>
            }
          ]
        }
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};
export default Router;
