import React, { useState, useEffect } from "react";
import Dashboard from "../components/Dashboard/Dashboard";
import { Login } from "../components/Login";

const Home = () => {
  const [isToken, setIsToken] = useState(false);
  useEffect(() => {
    checkToken();
  });
  const checkToken = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsToken(false);
    } else {
      setIsToken(true);
    }
  };
  return (
    <div>
      {isToken ? (
        <div className="app-outer-wapper">
          <Dashboard isAuth={isToken} />
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default Home;
