import { Outlet } from "react-router-dom";
import React from "react";
import NavBar from "../../components/NavBar";
import Sidebar from "../../components/Sidebar";

import UserContext from "../userContext";

export default function LayOut() {
  const userContext = React.useContext(UserContext);
  console.log(userContext.userRole.role);
  return (
    <>
      <NavBar />

      <>
        {/* <SignIn /> */}
        {userContext.userRole.role == "admin" ? (
          <div className="flex flex-col sm:flex-row  ">
            <div className=" flex flex-row flex-wrap sm:flex-nowrap  sm:flex-col justify-around  border-x-2 border-zinc-200 sm:pt-6 pt-6 sm:pb-96 pb-6 items-center sm:w-2/12 ">
              <Sidebar
                routes={[
                  "schedule",
                  "employees",
                  "rooms",
                  "programs",
                  "RecordingAbsence",
                  "reports",
                  "Announcements",
                ]}
              />
            </div>
            <div className="bg-slate-100 flex justify-center sm:w-10/12">
              <Outlet />
            </div>
          </div>
        ) : (
          ""
        )}
      </>
    </>
  );
}
