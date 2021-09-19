import { useState, useEffect } from "react";
import Application from "./Layout";
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
  window.scrollTo(0, 1);
  return (
    <div>
      {isToken ? (
        <div className="app-outer-wapper">
          <Application isAuth={isToken} />
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default Home;
