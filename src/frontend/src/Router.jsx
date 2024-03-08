import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Pages/Login";
import Root from "./Pages/Root";
import VehicleList from "./components/browsingPage/VehicleList";

import BrowsingPage from "./Pages/BrowsingPage";
import MakeReservationPage from "./Pages/MakeReservationPage";
import ConfirmationPage from "./Pages/ConfirmationPage";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children:[
        {
          index: true,
          element:<div>Welcome to CarRentals</div>
        },{
          path: "vehicles",
          element: <VehicleList />,
        },
        {
          path:"login",
          element: <Login/>,
    
        }
      ]
    },

    {
      path: "reservation/book",
      element: <MakeReservationPage />,
    },
    {
        path: "reservation/confirmation",
        element: <ConfirmationPage />,
    },


  ]);
  return <RouterProvider router={router} />;
};
export default Router;
