import { Outlet } from "react-router-dom";
import React from "react";
import Sidebar from "../../components/Sidebar";


import { AuthCard } from "../../components/AuthCard";

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
        <div className="flex flex-col  justify-center items-center ">
          <AuthCard />
        </div>
      )}
    </>
  );
}
