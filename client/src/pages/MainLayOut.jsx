import { Outlet } from "react-router-dom";
import React from "react";
import NavBar from "../components/NavBar";

import UserContext from "./userContext";

export default function MainLayOut() {
  const userContext = React.useContext(UserContext);
  console.log(userContext.userRole.role);
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}
