import React, { useState } from "react";
import { useSelector } from "react-redux";
import { IUser } from "../../store/Reducer/reducer";

const Submenu = () => {
  const userName = useSelector<IUser, IUser["name"]>((state) => state.name);
  const userRole = useSelector<IUser, IUser["role"]>((state) => {
    return state.role;
  });
  return (
    <div className="h-16 bg-gray-300 flex justify-between items-center px-5 shadow-sm">
      <div className="time">{/* clock here */}</div>
      <div className="profile flex items-center">
        <h4 className="mr-2 font-medium text-gray-600">
          <span className="italic font-normal">Goodmorning</span>{" "}
          {userName ? userName : "Client Error"}
          <h3 className="text-right">{userRole ? userRole : "Client Error"}</h3>
        </h4>
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
