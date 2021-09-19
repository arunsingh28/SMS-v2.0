import React, { useEffect } from "react";

const Dashboard = () => {
  useEffect(() => {
    document.title = "Dashboard";
  });
  return <div>Dashboard</div>;
};

export default Dashboard;
