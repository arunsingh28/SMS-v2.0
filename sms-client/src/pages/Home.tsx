import React, { useState, useEffect } from "react";
import Dashboard from "../components/Dashboard";
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
  return <div>{isToken ? <Dashboard /> : <Login />}</div>;
};

export default Home;
