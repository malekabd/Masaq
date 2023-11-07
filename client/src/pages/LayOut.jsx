import { Outlet } from "react-router-dom";
import React from "react";
import NavBar from "../components/NavBar";
export default function LayOut() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}
