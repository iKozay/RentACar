import { useState, useEffect } from "react";
import {Outlet, } from "react-router-dom";
import decodeToken from "../utilities/decodeToken";
import logout from "../utilities/logout";

import Header from "../components/header/Header.jsx";
import { createContext,  } from "react";

import isTokenValide from "../utilities/isTokenValide.js";
export const UserContext = createContext(null);
const Root = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const logoutUser = async () => {
    await logout(setToken);
    // <Navigate to="/" replace />
  };
  useEffect(() => {
    async function updateToken(){

    const isTokenValid =await isTokenValide();
    console.log(isTokenValid);
    if(!isTokenValid) await logoutUser();
    else setToken(localStorage.getItem("token"));
    }
    updateToken();
  });
  useEffect(()=>{
    localStorage.setItem("branch","Jean-Talon Ouest Branch");
  },[])
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
    <div className="bg-fafbfc">
      <UserContext.Provider value={{ user, setUser, token, setToken }}>
        <Header key={token}  />
        <div>
          <Outlet context={{ user, setUser, token, setToken }} />
        </div>
      </UserContext.Provider>
    </div>
  );
};
export default Root;
