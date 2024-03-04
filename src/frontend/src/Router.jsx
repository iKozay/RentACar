import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import VehicleList from "./components/browsingPage/VehicleList";
import BrowsingPage from "./Pages/BrowsingPage";
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
  ]);
  return <RouterProvider router={router} />;
};
export default Router;
