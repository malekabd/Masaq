import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar({ routes }) {
  return (
    <>
      {routes?.map((route) => {
        return (
          <button className=" capitalize sm:text-lg bg-grey-lighter rounded-full border-grey-lightest sm:p-5 shadow-sm transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ">
            <Link to={route}>{route}</Link>
          </button>
        );
      })}
    </>
  );
}
