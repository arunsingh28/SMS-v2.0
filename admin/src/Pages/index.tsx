import { useEffect, useState } from "react";
import useAuth from "../Auth/useAuth";
import Login from "../components/Login";

const Home = () => {
  const [IsToken, setIsToken] = useState(false);

  const auth = useAuth();

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
  return <div>User:{JSON.stringify(auth?.user)}</div>;
  // return <div>{IsToken ? <h1>Logged in</h1> : <Login />}</div>;
};

export default Home;
