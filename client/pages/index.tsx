import { Login } from "../components/login";
import { Dashboard } from "../components/Dashboard/Dashboard";
import { useState, useEffect } from "react";
import api from "../api/api";

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    checkToken();
  });

  // check token isVaid
  const checkToken = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  };


  return (
    <div className="default_bg">{isLogin ? <Dashboard /> : <Login />}</div>
  );
}
