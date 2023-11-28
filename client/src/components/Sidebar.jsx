import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <>
      <button className="bg-grey-lighter rounded-full border-grey-lightest sm:p-6 shadow-sm transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ">
        <Link to="/schedule">Schedule</Link>
      </button>

      <button className="bg-grey-lighter rounded-full border-grey-lightest sm:p-6 shadow-sm transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ">
        <Link to="/employees">Employees</Link>
      </button>
      <button className="bg-grey-lighter rounded-full border-grey-lightest sm:p-6 shadow-sm transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ">
        <Link to="/rooms">Rooms</Link>
      </button>
      <button className="bg-grey-lighter rounded-full border-grey-lightest sm:p-6 shadow-sm transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ">
        <Link to="/programs">Programs</Link>
      </button>
      <button className="bg-grey-lighter rounded-full border-grey-lightest sm:p-6 shadow-sm transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ">
        <Link to="/reports">Reports</Link>
      </button>
    </>
  );
}
