import React, { useEffect } from "react";
import Navbar from "../Navbar";
import Workspace from "./Workspace";
import "./style.css";
import { Login } from "../Login";

interface IAuth {
  isAuth: boolean;
}

const Dashboard = ({ isAuth }: IAuth) => {
  useEffect(() => {
    document.title = "Dashboard";
    if (isAuth == false) {
      <Login />;
    }
  });
  return (
    <div className="flex app-wrapper">
      <div className="flex-2">
        <Navbar />
      </div>
      <div className="flex-1">
        <Workspace />
      </div>
    </div>
  );
};

export default Dashboard;
