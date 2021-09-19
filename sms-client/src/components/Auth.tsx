import { useState, useEffect } from "react";
import Dashboard from "./Layout";
import { Login } from "../pages/Login";

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
