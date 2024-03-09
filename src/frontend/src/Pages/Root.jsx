import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import decodeToken from "../utilities/decodeToken";
import logout from "../utilities/logout";
import refreshToken from "../utilities/refreshToken";
import getUser from "../utilities/getUser";
import Header from "../components/header/Header.jsx";
import {createContext, useContext} from "react"
import styles from "./../styles/Root.module.css"

export const UserContext = createContext(null);
const Root = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const logoutUser = async () => {
    await logout(setToken);
  };

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    // refreshToken(setToken);
  }, []);

  useEffect(() => {
    if (token) {
      setUser(decodeToken(token));
    }
    else{
      setUser(null);
    }
  }, [token]);

  return (
    <div className={styles.red}>
    <UserContext.Provider value = {{user,setUser,token}}>
      <Header />
       {/* <nav
  className="mx-auto flex items-center justify-between p-6 bg-slate-300"
  aria-label="Global"
>
      <button onClick={() => refreshToken(setToken)}>refresh</button>{" "}
      <button onClick={() => getUser()}>getVehicles</button>
</nav>  */}

      <div >
        <Outlet context={{ user, setUser, token, setToken }} />
      </div>
      </UserContext.Provider>
    </div>
  );
};
export default Root;
