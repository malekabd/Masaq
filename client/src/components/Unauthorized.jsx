import React from "react";

export default function Unauthorized() {
  return (
    <div className="bg-black w-screen h-screen flex flex-col  justify-center items-center ">
      <h1 className="text-red-600 font-bold text-4xl ">Unauthorized</h1>
      <img
        className="w-full pt-14 pb-20"
        src="https://www.alaraby.com/sites/default/files/styles/d08_standard/public/2023-11/377339.jpeg?h=c44fcfa1&itok=Gd4Hh7ft"
      />
    </div>
  );
}
