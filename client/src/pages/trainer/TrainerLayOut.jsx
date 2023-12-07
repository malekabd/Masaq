import React from "react";
import { Outlet } from "react-router-dom";

import UserContext from "../userContext";
import Sidebar from "../../components/Sidebar";

export default function TrainerLayOut() {
  const userContext = React.useContext(UserContext);
  console.log(userContext.userRole.role);
  return (
    <>
      <div className="flex flex-col sm:flex-row  ">
        <div className=" flex flex-row flex-wrap sm:flex-nowrap  sm:flex-col justify-around sm:pt-6 border-x-2 border-zinc-200 pt-6 sm:pb-96 pb-6 items-center sm:w-2/12">
          <Sidebar routes={["evaluation"]} />
        </div>
        <div className="bg-slate-100 flex justify-center sm:w-10/12">
          <Outlet />
        </div>
      </div>
    </>
  );
}