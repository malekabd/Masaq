import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { AuthCard } from "../../components/AuthCard";

export default function TraineeLayOut() {
  let _user = localStorage.getItem("user");
  let user = {};
  if (_user) {
    user = JSON.parse(_user);
  }
  return (
    <>
      {user.roleTokens?.trainee ? (
        <div className="flex flex-col sm:flex-row  ">
          <div className=" flex flex-row flex-wrap sm:flex-nowrap  sm:flex-col justify-around sm:pt-6 border-x-2 border-zinc-200 pt-6 sm:pb-96 pb-6 items-center sm:w-2/12">
            <Sidebar routes={["trainee", "evaluation"]} />
          </div>
          <div className="bg-slate-100 flex justify-center sm:w-10/12">
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
