import React from "react";
import SideBar from "./sidebar/SideBar";

function RootLayout({ children }) {
  return (
    <div className="flex gap-1 ">
      <SideBar />
      <main className=" flex-1 w-full py-4 overflow-auto  ">{children}</main>
    </div>
  );
}

export default RootLayout;
