import React from "react";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar/navbar";
import Submenu from "../components/Navbar/submenu";
import SEO from "../components/SEO";
import { IUser } from "../store/Reducer/reducer";

export default function Profile() {
  const userName = useSelector<IUser, IUser["name"]>((state) => state.name);
  const userRole = useSelector<IUser, IUser["role"]>((state) => {
    return state.role;
  });
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
            <h1>{userName}</h1>
            <h1>{userRole}</h1>
          </div>
        </div>
      </div>
    </>
  );
}
