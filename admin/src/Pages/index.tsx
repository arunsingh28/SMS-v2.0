import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../Auth/useAuth";
import Login from "../components/Login";

const Home = () => {
  const [IsToken, setIsToken] = useState(false);

  const auth = useAuth();
  const handleLogin = () => {
    auth?.signIn(() => {});
  };
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
  return (
    <div>
      User:{JSON.stringify(auth?.user)}
      <button
        onClick={handleLogin}
        className="bg-blue-800 px-20 py-3 text-white"
      >
        Login
      </button>
      <button
        className="bg-blue-800 px-20 py-3 text-white ml-5"
        onClick={() => {
          auth?.singOut(() => {});
        }}
      >
        Logout
      </button>
      <Link to="/remove">Private Route</Link>
    </div>
  );
  // return <div>{IsToken ? <h1>Logged in</h1> : <Login />}</div>;
};

export default Home;
