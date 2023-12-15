import { Outlet } from "react-router-dom";
import React from "react";
import NavBar from "../../components/NavBar";
import Sidebar from "../../components/Sidebar";

import UserContext from "../userContext";

export default function LayOut() {
  let _user = localStorage.getItem("user");
  let user = {};
  if (_user) {
    user = JSON.parse(_user);
  }

  return (
    <>
      {user.roleTokens?.admin ? (
        <div className="flex flex-col sm:flex-row flex-1 ">
          <div className="  flex flex-row flex-wrap sm:flex-nowrap  sm:flex-col justify-around  border-x-2 border-zinc-200 sm:pt-6 pt-6 sm:pb-96 pb-6 items-center sm:w-2/12 ">
            <Sidebar
              routes={[
                "schedule",
                "employees",
                "rooms",
                "programs",
                "Absence",
                "reports",
                "Announcements",
              ]}
            />
          </div>
          <div className="bg-white flex justify-center sm:w-10/12 ">
            <Outlet />
          </div>
        </div>
      ) : (
        <div className="bg-black w-screen h-full flex flex-col  justify-center items-center ">
          <h1 className="text-red-600 font-bold text-4xl ">
          
            Unauthorized   
          </h1>
          <img
            className="w-6/12 pt-14 pb-60"
            src="https://www.shutterstock.com/shutterstock/photos/2252182031/display_1500/stock-vector-no-unauthorized-entry-sign-vector-illustration-of-red-crossed-out-circular-sign-with-screaming-man-2252182031.jpg"
          />
        </div>
      )}
    </>
  );
}
