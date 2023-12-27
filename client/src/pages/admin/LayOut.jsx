import { Outlet } from "react-router-dom";
import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";

import { AuthCard } from "../../components/AuthCard";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
export default function LayOut() {
  const [isMobileCollapsed, setIsMobileCollapsed] = useState(true);

  const toggleMobileCollapse = () => {
    setIsMobileCollapsed(!isMobileCollapsed);
  };
  let _user = localStorage.getItem("user");
  let user = {};
  if (_user) {
    user = JSON.parse(_user);
  }

  return (
    <>
      {user.roleTokens?.admin ? (
        <div className="flex flex-col sm:flex-row flex-1 ">
          <button
            onClick={toggleMobileCollapse}
            className="sm:hidden block bg-blue-500 text-white py-2 px-4 rounded-full m-2 hover:bg-blue-400 focus:outline-none focus:ring focus:border-green-300 w-50 self-center "
          >
            {isMobileCollapsed ? <ExpandMoreIcon /> : <ExpandLessIcon />}
          </button>
          <div
            className={` flex flex-row flex-wrap sm:flex-nowrap  sm:flex-col justify-around ${
              isMobileCollapsed ? "hidden sm:flex " : ""
            }  border-x-2 border-zinc-200 sm:pt-6 pt-6 sm:pb-96 pb-6 items-center sm:w-2/12 `}
          >
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
