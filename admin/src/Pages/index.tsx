import { useEffect, useState } from "react";
import Login from "../components/Login";

const Home = () => {
  const [IsToken, setIsToken] = useState(false);

  useEffect(() => {
    checkToken();
  });
  const checkToken = () => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      setIsToken(false);
    } else {
      setIsToken(true);
    }
  };
  return <div>{IsToken ? <h1></h1> : <Login />}</div>;
};

export default Home;
