import React from "react";
import Navbar from "./partials/navbar";
import SEO from "./SEO";
import WorkSpace from "./Workspace";
import Submenu from "./partials/submenu";

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
          <div className="workArea">
            <WorkSpace />
          </div>
        </div>
      </div>
    </>
  );
};
