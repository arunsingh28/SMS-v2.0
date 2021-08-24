import React from "react";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar/navbar";
import Submenu from "../components/Navbar/submenu";
import SEO from "../components/SEO";
import { IUser } from "../store/Reducer/reducer";

export default function Profile() {
  const userName = useSelector<IUser, IUser["name"] | any>(
    (state) => state.name
  );
  const userRole = useSelector<IUser, IUser["role"] | any>((state) => {
    return state.role;
  });
  // const userImage =
  return (
    <>
      <SEO title={`${userName} Profile`} description="Profile" />
      <div className="_">
        <div className="navbar">
          <Navbar />
        </div>
        <div className="workspace">
          <Submenu />
          <div className="workArea w-full">
            <div className="px-10 py-10 bg-gray-200 rounded-md shadow-lg m-10">
              <div className=" flex justify-between items-center gap-4 ">
                <div className="w-1/2 flex flex-col items-center gap-5">
                  {/* <img
                    src="https://avatars.githubusercontent.com/u/48112517?v=4"
                    alt="userProfile"
                    className="h-60 rounded-md"
                  /> */}
                  <input
                    type="text"
                    spellCheck="false"
                    disabled
                    className="h-12 px-2 rounded-md text-lg font-medium text-gray-600 shadow-md outline-none border-2 border-gray-400 text-center capitalize"
                    value={userRole ? userRole : "Client Error"}
                  />
                </div>
                <div className="w-1/2 flex flex-col gap-5">
                  <div className="bg-gray-300 p-2 rounded-md">
                    <label
                      htmlFor="Name"
                      className="font-bold text-gray-600 text-xl"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="Name"
                      autoComplete="off"
                      spellCheck="false"
                      className="w-full h-12 px-2 rounded-md text-lg font-medium text-gray-600 shadow-mdoutline-none border-2 border-gray-400 outline-none"
                      value={userName ? userName : "Client Error"}
                    />
                  </div>
                  <div className="bg-gray-300 p-2 rounded-md">
                    <label
                      htmlFor="Name"
                      className="font-bold text-gray-600 text-xl"
                    >
                      Adhar Card Number
                    </label>
                    <input
                      type="text"
                      spellCheck="false"
                      className="w-full h-12 px-2 rounded-md text-lg font-medium text-gray-600 shadow-md outline-none border-2 border-gray-400"
                      value={userRole ? userRole : "Client Error"}
                    />
                  </div>
                  <div className="bg-gray-300 p-2 rounded-md">
                    <label
                      htmlFor="Name"
                      className="font-bold text-gray-600 text-xl"
                    >
                      Adhar Card Number
                    </label>
                    <input
                      type="text"
                      spellCheck="false"
                      className="w-full h-12 px-2 rounded-md text-lg font-medium text-gray-600 shadow-md outline-none border-2 border-gray-400"
                      value={userRole ? userRole : "Client Error"}
                    />
                  </div>
                  <div className="bg-gray-300 p-2 rounded-md">
                    <label
                      htmlFor="Name"
                      className="font-bold text-gray-600 text-xl"
                    >
                      Adhar Card Number
                    </label>
                    <input
                      type="text"
                      spellCheck="false"
                      className="w-full h-12 px-2 rounded-md text-lg font-medium text-gray-600 shadow-md outline-none border-2 border-gray-400"
                      value={userRole ? userRole : "Client Error"}
                    />
                  </div>
                </div>
              </div>
              <button className="shadow-md block mt-10 mx-auto bg-blue-400 px-14 py-2 text-gray-200 font-medium rounded-md cursor-pointer hover:bg-blue-500">
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
