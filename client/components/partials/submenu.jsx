import React, { useState } from "react";

const Submenu = () => {
  return (
    <div className="h-16 bg-gray-300 flex justify-between items-center px-5">
      <div className="time">{/* clock here */}</div>
      <div className="profile flex items-center">
        <h3 className="mr-2 font-medium">
          {" "}
          <span className="italic font-normal">Goodmorning</span> Arun Pratap
          Singh
          <h4 className="text-right">Principal</h4>
        </h3>
        <img
          src="https://avatars.githubusercontent.com/u/48112517?v=4"
          alt="profile"
          className="rounded-full h-12"
        />
      </div>
    </div>
  );
};

export default Submenu;
