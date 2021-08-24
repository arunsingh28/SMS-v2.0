import React from "react";
import Navbar from "../../components/Navbar/navbar";
import Submenu from "../../components/Navbar/submenu";
import SEO from "../../components/SEO";

export default function StudentDetail() {
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
            <div className="bg-blue-500 m-10">student Detail page</div>
          </div>
        </div>
      </div>
    </>
  );
}
