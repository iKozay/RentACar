import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Pages/Login";
import Root from "./Pages/Root";
import VehicleList from "./components/browsingPage/VehicleList";
// import BrowsingPage from "./Pages/BrowsingPage";
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
   
  ]);
  return <RouterProvider router={router} />;
};
export default Router;
