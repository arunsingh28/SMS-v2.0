import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Call from "../../api";

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useState(false);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setState(true);
    await fetch(Call.Production.URI + "/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    toast.loading("Loading...");
  };
  return (
    <div className="text-center mt-5">
      <ToastContainer />
      <h1 className="text-2xl font-extrabold">Admin Panel</h1>
      <div className="flex justify-center items-center py-48">
        <form
          onSubmit={handleLogin}
          className="flex flex-col justify-center items-center"
        >
          <input
            type="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="pl-2 h-16 w-80 bg-gray-100 rounded-md shadow-md outline-none"
            placeholder="username"
            required={true}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pl-2 h-16 w-80 bg-gray-100 mt-10 rounded-md shadow-md outline-none"
            placeholder="password"
            required={true}
          />
          <button
            className={
              state
                ? "mt-10 px-16 py-4 rounded-md cursor-wait text-white bg-blue-900"
                : "mt-10 px-16 py-4 bg-blue-700 rounded-md text-white hover:bg-blue-900"
            }
            disabled={state ? true : false}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
