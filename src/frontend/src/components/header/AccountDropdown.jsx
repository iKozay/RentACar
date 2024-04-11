import React from "react";
import LoginButton from "./LoginButton";
import logout from "../../utilities/logout";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./../../Pages/Root";
import notifications from "../../utilities/notifications";

export default function AccountDropdown() {
  const [notification, setNotification] = useState(false);
  useEffect(() => {
    async function notificationFetch() {
      const notify = await notifications(user.id);
      setNotification(notify);
    }
    notificationFetch();
  });
  const { user, setToken, token } = useContext(UserContext);

  // const token = localStorage.getItem("token");
  const isLoggedIn = token !== null;
  if (isLoggedIn) {
    return showAccountButton(setToken, user, notification);
  } else {
    return showLoginButton();
  }
}
function showAccountButton(setToken, user, notification) {
  const [isDropdownVisible, setDropdownVisible] = React.useState(false);
  window.onclick = function (event) {
    if (!event.target.matches(".relative")) {
      setDropdownVisible(false);
    }
  };
  return (
    <div>
      <button
        id="accountBtn"
        className="relative inline-block bg-white text-black font-bold py-2 px-4 rounded"
        onClick={() => setDropdownVisible(!isDropdownVisible)}
      >
        {user && user.username}
      </button>
      {isDropdownVisible && (
        <div
          className={
            "absolute overflow-auto z-10 bg-gray-800 text-white p-2 right-4"
          }
        >
        <Link to="user/MyAccount">
          <p className={"p-2 block cursor-pointer hover:bg-gray-600"}>
            My Account
          </p>
        </Link>
          <Link to="user/reservation">
            <p
              className={
                "p-2 block cursor-pointer hover:bg-gray-600"
              } /* onClick={()=> window.open("/user/reservation", "_self")}*/
            >
              My Reservations
            </p>
          </Link>
          {user && user.role === "admin" && (
            <Link to="dashboard">
              <p className={"p-2 block cursor-pointer hover:bg-slate-600"}>
                Admin Dashboard
              </p>
            </Link>
          )}
          {user && user.role === "representative" && (
            <Link to="/csr/dashboard">
              <p className={"p-2 block cursor-pointer hover:bg-slate-600"}>
                CSR Dashboard
              </p>
            </Link>
          )}
          {user && user.role === "customer" && (
            <Link
              to="issues"
              className={
                notification
                  ? "flex items-center justify-between hover:bg-slate-600"
                  : "hover:bg-slate-600"
              }
            >
              <p className={"p-2 block cursor-pointer "}>Issues </p>
              {notification && (
                <span>
                  <div className="mt-1 mr-5 w-3 h-3 rounded-full bg-red-500"></div>
                </span>
              )}
            </Link>
          )}
          <hr />
          <Link to="/">
            <p
              className={"p-2 block cursor-pointer hover:bg-slate-600"}
              onClick={() => logoutAccount(setToken)}
            >
              Logout
            </p>
          </Link>
        </div>
      )}
    </div>
  );
}

function showLoginButton() {
  return <LoginButton />;
}

// async function calling logout function
async function logoutAccount(setToken) {
  await logout(setToken);
}
