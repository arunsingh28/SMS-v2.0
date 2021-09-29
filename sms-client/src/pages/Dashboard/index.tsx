import React, { useEffect } from "react";
import Profile from "../../components/Profile/Index";

const Dashboard = () => {
  useEffect(() => {
    document.title = "Dashboard";
  });
  return (
    <div>
      <Profile />
    </div>
  );
};

export default Dashboard;
