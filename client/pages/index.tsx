import { Login } from "../components/login";
import { Dashboard } from "../components/Dashboard/Dashboard";
import { useState, useEffect } from "react";

export default function Home() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    isAuth();
  });

  // check token isVaid
  const isAuth = () => {
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
