import { useEffect } from "react";
import Navbar from "./Navbar";
import Workspace from "./Dashboard/Workspace";
import "../styles/style.css";
import { Login } from "../pages/Login";
import { HashRouter } from "react-router-dom";

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
    <HashRouter>
      <div className="flex app-wrapper">
        <div className="flex-2">
          <Navbar />
        </div>
        <div className="flex-1">
          <Workspace />
        </div>
      </div>
    </HashRouter>
  );
};

export default Dashboard;
