import { useEffect, useState } from "react";
import Login from "../components/Login";

const Home = () => {
  const token = localStorage.getItem("adminToken");
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    if (token) {
      setAuth(true);
    }
  });
  return <div>{auth ? <h1>Looged in</h1> : <Login />}</div>;
};

export default Home;
