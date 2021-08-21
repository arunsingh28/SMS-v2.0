import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import SEO from "./SEO";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const Alert = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // api call
    const data = {
      method: "post",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
      mode: "cors",
    };
    const result = await fetch("http://localhost:8080/api/login", data);
    if (result.ok === true) {
      // logged in manage logged in state
    } else {
      Alert.current.style.display = "block";
    }
  };

  return (
    <>
      <SEO
        title="Login"
        description="Login page for Indian public school mangement"
      />
      <div className="flex flex-col justify-center items-center h-screen">
        <img
          src="https://image.shutterstock.com/image-vector/student-book-logo-600w-334176206.jpg"
          alt="logo"
          width="100"
          height="100"
          className="rounded-full shadow-lg"
        />
        <h3 className="font-black text-3xl my-5">SIGN IN</h3>
        <p className="text-sm font-medium my-2">
          Hello There ! Sign in and start managing your TEA account
        </p>
        <div
          className="mt-4 shadow-lg hidden bg-red-400 py-3 px-20 rounded-md text-white"
          ref={Alert}
        >
          Unauthorized Access
        </div>
        <form
          className="w-2/3 lg:w-1/3 md:w-2/3 mt-10 flex flex-col justify-center"
          onSubmit={handleSubmit}
        >
          <div className="input-row flex flex-col py-2">
            <label htmlFor="email" className="font-bold text-gray-600 py-1">
              email/username
            </label>
            <input
              type="text"
              className="h-12 border-2 p-1 rounded-lg outline-none shadow-md hover:shadow-xl"
              placeholder="email/@username"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-row flex flex-col py-2">
            <label htmlFor="password" className="font-bold text-gray-600 py-1">
              Password
            </label>
            <input
              type="password"
              className="h-12 border-2 p-1 rounded-lg outline-none shadow-md hover:shadow-xl"
              placeholder="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="rounded-full w-1/2 m-auto bg-blue-500 text-white px-10 py-3 my-10 hover:bg-blue-600"
          >
            SIGN IN
          </button>
        </form>
        <p className="font-medium">
          Forgot Password?{" "}
          <Link href="/reset">
            <span className="font-bold">Reset</span>
          </Link>
        </p>
        <div className="fixed bottom-0 bg-gray-400 w-full">
          <p className="text-center">
            ©TEA All right reserve {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </>
  );
};
