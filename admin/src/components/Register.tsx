import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Call from "../api";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [state, setState] = useState(false);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setState(true);
    const info = await fetch(Call.Production.URI + "/register", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    });
    const data = await info.json();
    console.log(data);
    toast.loading("Loading...");
  };
  return (
    <div className="text-center mt-5">
      <ToastContainer />
      <h1 className="text-2xl font-extrabold text-gray-600">Admin Panel</h1>
      <div className="py-40">
        <h1 className="mb-10 text-gray-600 text-xl font-bold">
          Add new account
        </h1>
        <form
          onSubmit={handleLogin}
          className="w-1/2 m-auto p-5 pt-10 flex flex-col justify-center items-center shadow-2xl"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="pl-2 h-16 w-80 bg-gray-100 mt-10 rounded-md shadow-md outline-none"
            placeholder="Name"
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

export default Register;
