import { useState, useEffect } from "react";
import { Link, Outlet, Navigate } from "react-router-dom";
import decodeToken from "../utilities/decodeToken";
import logout from "../utilities/logout";
import refreshToken from "../utilities/refreshToken";
import getUser from "../utilities/getUser";
import Header from "../components/header/Header.jsx";
import { createContext, useContext } from "react";
import styles from "./../styles/Root.module.css";

export const UserContext = createContext(null);
const Root = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const logoutUser = async () => {
    await logout(setToken);
    // <Navigate to="/" replace />
  };
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);
  
  useEffect(() => {
    console.log("User in Root:", user);
  }, [user]);
  
  useEffect(() => {
    if(token)
    setUser(decodeToken(token));
  }, [token]);

  // useEffect(() => {
  //   alert("positive");
  //   setUser(decodeToken(localStorage.getItem("token")));
  // }, [token]);

  return (
    <div >
      <UserContext.Provider value={{ user, setUser, token, setToken }}>
        <Header key={token}  />
   

        {/* <nav
  className="mx-auto flex items-center justify-between p-6 bg-slate-300"
  aria-label="Global"
>
      <button onClick={() => refreshToken(setToken)}>refresh</button>{" "}
      <button onClick={() => getUser()}>getVehicles</button>
</nav>  */}

        <div>
          <Outlet context={{ user, setUser, token, setToken }} />
        </div>
      </UserContext.Provider>
    </div>
  );
};
export default Root;
