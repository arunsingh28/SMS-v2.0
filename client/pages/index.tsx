import { Login } from "../components/login";
import { Dashboard } from "../components/Dashboard/Dashboard";
import { useState, useEffect } from "react";
import api from "../util/api";

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

  const isAuth = async () => {
    const token = localStorage.getItem("token")!;
    console.log("isAuth:", token);
    const requestHeader: HeadersInit = new Headers();
    requestHeader.set("content-type", "application/json");
    requestHeader.set("authorization", token);
    const result = await fetch(`${api.production.URI}/api/verify`, {
      method: "get",
      headers: requestHeader,
    });
    const data = await result.json();
    console.log("verfiy api", data);
  };

  // isAuth();

  return (
    <div className="default_bg">{isLogin ? <Dashboard /> : <Login />}</div>
  );
}
