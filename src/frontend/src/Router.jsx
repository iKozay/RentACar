import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import VehicleList from "./components/browsingPage/VehicleList";
import BrowsingPage from "./Pages/BrowsingPage";
import MakeReservationPage from "./Pages/MakeReservationPage";
const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <BrowsingPage />,
    },
    {
      path: "vehicles",
      element: <VehicleList />,
    },
    {
      path: "reservation/book",
      element: <MakeReservationPage />,
    },

  ]);
  return <RouterProvider router={router} />;
};
export default Router;
