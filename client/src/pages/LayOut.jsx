import { Outlet } from "react-router-dom";
import React from "react";
import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import SignIn from "../pages/SignIn";
import UserContext from "../pages/userContext";
export default function LayOut() {
  const userContext = React.useContext(UserContext);
  console.log(userContext.userRole);
  return (
    <>
      <NavBar />
      {/* <SignIn /> */}

      <div className="flex flex-col sm:flex-row  ">
        <div className=" flex flex-row flex-wrap sm:flex-nowrap  sm:flex-col justify-around sm:pt-6 border-x-2 border-zinc-200 pt-6 sm:pb-96 pb-6 items-center sm:w-2/12">
          <Sidebar />
        </div>
        <div className="bg-slate-400 flex justify-center sm:w-10/12">
          <Outlet />
        </div>
      </div>
    </>
  );
}
