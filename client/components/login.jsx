import React, { useState } from "react";
import Link from "next/link";
import SEO from "./SEO";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
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
          className="rounded-full shadow-lg"
        />
        <h3 className="font-black text-3xl my-5">SIGN IN</h3>
        <p className="text-sm font-medium my-2">
          Hello There ! Sign in and start managing your TEA account
        </p>
        <form
          className="w-1/3 mt-10 flex flex-col justify-center"
          onSubmit={handleSubmit}
        >
          <div className="input-row flex flex-col py-2">
            <label htmlFor="email" className="font-bold text-gray-600 py-1">
              email/username
            </label>
            <input
              type="text"
              className="h-12 border-2 p-1 rounded-lg outline-none"
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
              className="h-12 border-2 p-1 rounded-lg outline-none"
              placeholder="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="rounded-full bg-blue-500 text-white px-10 py-3 my-10"
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
