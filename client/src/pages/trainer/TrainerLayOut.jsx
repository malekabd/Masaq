import React from "react";
import { Outlet } from "react-router-dom";
import { AuthCard } from "../../components/AuthCard";

export default function TraineeLayOut() {
  let _user = localStorage.getItem("user");
  let user = {};
  if (_user) {
    user = JSON.parse(_user);
  }

  return (
    <>
      {user.roleTokens?.trainer ? (
        <div className="bg-white flex justify-center ">
          <Outlet />
        </div>
      ) : (
        <div className="flex flex-col  justify-center items-center ">
          <AuthCard />
        </div>
      )}
    </>
  );
}
