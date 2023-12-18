import { Outlet } from "react-router-dom";
import React from "react";

import UserContext from "../pages/userContext";

export default function MainLayOut() {
  const userContext = React.useContext(UserContext);
  console.log(userContext.userRole.role);
  return <Outlet />;
}
