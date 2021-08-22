import { Login } from "../components/login";
import { Dashboard } from "../components/Dashboard";
import { useState, useEffect } from "react";

export default function Home() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    chekcToken();
  });

  // check token isVaid
  const chekcToken = () => {
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
