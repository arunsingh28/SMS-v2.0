import React from "react";
import Navbar from "./partials/navbar";
import SEO from "./SEO";
import WorkSpace from "./Workspace";
export const Dashboard = () => {
  return (
    <>
      <SEO title="Dashbaord" description="dashboard" />
      <div className="flex">
        <div className="w-1/5">
          <Navbar />
        </div>
        <div className="w-5/6">
          <WorkSpace />
        </div>
      </div>
    </>
  );
};
