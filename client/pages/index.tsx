import { Login } from "../components/login";
import { Dashboard } from "../components/Dashboard";
import { useState } from "react";

export default function Home() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div className="bg-blue-100">{isLogin ? <Dashboard /> : <Login />}</div>
  );
}
