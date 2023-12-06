import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar({ routes }) {
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  return (
    <>
      {routes?.map((route, index) => {
        const randomInteger = getRandomInt(1, 1000);

        return (
          <button
            key={{ randomInteger }}
            className=" capitalize flex-wrap sm:w-full font-semibold lg:text-sm lg:max-w-[80%] text-sm  text-sky-700 bg-grey-lighter rounded-full border-grey-lightest sm:p-4 sm:my-2 shadow-md transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 "
          >
            <Link to={route}>{route}</Link>
          </button>
        );
      })}
    </>
  );
}
