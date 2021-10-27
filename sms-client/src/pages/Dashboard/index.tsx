import React, { useEffect } from "react";
import MailBanner from "../../components/Banner/MailBanner";
import Profile from "../../components/Profile/Index";

const Dashboard = () => {
  useEffect(() => {
    document.title = "Dashboard";
  });
  return (
    <div>
      <Profile />
      <MailBanner />
    </div>
  );
};

export default Dashboard;
