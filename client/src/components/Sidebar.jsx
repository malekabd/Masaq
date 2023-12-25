import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar({ routes }) {
  const location = useLocation();
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  return (
    <>
      {routes?.map((route, index) => {
        const randomInteger = getRandomInt(1, 1000);
        const existingClassName =
          "capitalize flex-wrap sm:w-full font-semibold lg:text-sm lg:max-w-[80%] text-sm  text-sky-700 bg-grey-lighter rounded-full border-grey-lightest sm:p-4 sm:my-1 shadow-md transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300";
        return (
          <button
            key={{ randomInteger }}
            className={`${existingClassName} ${
              location.pathname.slice(1) == route
                ? "bg-blue-200 text-blue-950"
                : ""
            }`}
          >
            <Link to={route}>{route}</Link>
          </button>
        );
      })}
    </>
  );
}
