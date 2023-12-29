import React from "react";
import SideBar from "./sidebar/SideBar";

function RootLayout({ children }) {
  return (
    <div className="flex gap-1 max-w-max ">
      <SideBar />
      <main className=" flex-1 mx-auto py-4 overflow-auto ">{children}</main>
    </div>
  );
}

export default RootLayout;
