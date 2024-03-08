import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Pages/Login";
import Root from "./Pages/Root";
import VehicleList from "./Pages/VehicleList";


import MakeReservationPage from "./Pages/MakeReservationPage";
import ConfirmationPage from "./Pages/ConfirmationPage";
import ViewReservationPage from "./Pages/ViewReservationPage";

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
          element: <VehicleList />,
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
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};
export default Router;
