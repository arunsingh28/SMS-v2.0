import React from "react";
import Navbar from "../Navbar/navbar";
import SEO from "../SEO";
import Submenu from "../Navbar/submenu";
import Quike from "./Quike";
import RecentActivity from "./RecentActivity";

export const Dashboard = () => {
  return (
    <>
      <SEO title="Dashbaord" description="dashboard" />
      <div className="_">
        <div className="navbar">
          <Navbar />
        </div>
        <div className="workspace">
          <Submenu />
          <div className="workArea w-full">
            <Quike />
            <RecentActivity />
          </div>
        </div>
      </div>
    </>
  );
};
