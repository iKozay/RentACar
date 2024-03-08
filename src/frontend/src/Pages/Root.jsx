import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import decodeToken from "../utilities/decodeToken";
import logout from "../utilities/logout";
import refreshToken from "../utilities/refreshToken";
import getUser from "../utilities/getUser";

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
    <>
      <nav
        className="mx-auto flex items-center justify-between p-6 bg-slate-300"
        aria-label="Global"
      >
        <Link to="/">
          <div className="p-4">
            <h1 className="text-2xl font-bold text-black">Rentals.co</h1>
          </div>
        </Link>
        {/* <div className="flex-grow flex items-center justify-center">
      <SearchBox />
    </div> */}
        <div>
          <Link to="vehicles">
            <button
              style={{
                backgroundColor: "white",
                padding: "5px",
              }}
            >
              Browse Vehicles
            </button>
          </Link>
        </div>
        {!user && (
          <Link to="/login">
            <div className="p-4">
              <button className="bg-white hover:underline text-black font-bold py-2 px-4 rounded inline-flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span>Login/Sign-Up</span>
              </button>
            </div>
          </Link>
        )}
        {user && (
          <div
            style={{
              backgroundColor: "white",
              padding: "10px",
              fontWeight: "bold",
            }}
          >
            <span>{user.username}</span>
            <button
              style={{
                backgroundColor: "#ccc",
                padding: "3px",
                marginLeft: "5px",
              }}
              type="button"
              onClick={(e) => {
                e.preventDefault();
                logoutUser(token);
              }}
            >
              logout
            </button>
            <button onClick={() => refreshToken(setToken)}>refresh</button>{" "}
            <button onClick={() => getUser()}>getVehicles</button>
          </div>
        )}
      </nav>
      <div>
        <Outlet context={{ user, setUser, token, setToken }} />
      </div>
    </>
  );
};
export default Root;
