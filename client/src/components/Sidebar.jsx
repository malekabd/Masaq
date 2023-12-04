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
        console.log(index);
        return (
          <button
            key={{ randomInteger }}
            className=" capitalize sm:text-lg bg-grey-lighter rounded-full border-grey-lightest sm:p-5 shadow-sm transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 "
          >
            <Link to={route}>{route}</Link>
          </button>
        );
      })}
    </>
  );
}
