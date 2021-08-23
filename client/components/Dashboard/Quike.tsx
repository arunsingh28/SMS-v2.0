import React from "react";
import SubMenu from "../partials/submenu";
const Quike = () => {
  return (
    <div className="bg-gray-100 py-5 rounded-md shadow-md mx-5 my-5">
      <h4 className="font-medium ml-14 pb-3 text-lg">Quike Start</h4>
      <div className="flex justify-around">
        <div className="cursor-pointer h-24 w-44 bg-gray-200 rounded-sm hover:bg-blue-300 hover:text-white flex justify-center items-center flex-col hover:shadow-md">
          <span className="material-icons-outlined mr-1">payments</span>
          <h5 className="font-bold">Fees Manager</h5>
        </div>
        <div className="cursor-pointer h-24 w-44 bg-gray-200 rounded-sm hover:bg-blue-300 hover:text-white flex justify-center items-center flex-col hover:shadow-md">
          <span className="material-icons-outlined mr-1">drafts</span>
          <h5 className="font-bold">Read Mail</h5>
        </div>
        <div className="cursor-pointer h-24 w-44 bg-gray-200 rounded-sm hover:bg-blue-300 hover:text-white flex justify-center items-center flex-col hover:shadow-md">
          <span className="material-icons-outlined mr-1">edit</span>
          <h5 className="font-bold">Edit Info</h5>
        </div>
      </div>
    </div>
  );
};

export default Quike;
