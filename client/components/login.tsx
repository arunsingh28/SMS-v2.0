import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import SEO from "./SEO";
import api from "../util/api";
import { useDispatch } from "react-redux";
import Router from "next/router";
import { ActionType } from "../store/Actions";
import Loader from "./loader";
import spinner from "../public/circle4.svg";
export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const [loader, setLoader] = useState(false);
  const Alert = useRef<any>();

  const dispatch = useDispatch();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoader(true);
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
    };
    const Data = await fetch(`${api.production.URI}/api/login`, data);
    const load = await Data.json();
    if (load.code == 200) {
      setLoader(false);
      localStorage.setItem("token", `Bearer ${load.token}`);
      dispatch({
        type: ActionType.ADD,
        payload: {
          name: load.data.name,
          role: load.data.role,
        },
      });
    } else {
      setLoader(false);
      setError(load.message);
      Alert.current.style.display! = "block";
      setTimeout(() => {
        Alert.current.style.display! = "none";
      }, 4000);
    }
  };

  return (
    <>
      <SEO
        title="Login"
        description="Login page for Indian public school mangement"
      />
      <div className="flex flex-col justify-center items-center h-screen">
        {/* <img
          src="https://image.shutterstock.com/image-vector/student-book-logo-600w-334176206.jpg"
          alt="logo"
          width="100"
          height="100"
          className="rounded-full shadow-lg"
        /> */}
        <h1 className="text-4xl my-10">SMS</h1>
        {/* <h3 className="font-black text-3xl my-5">SIGN IN</h3> */}
        <p className="text-sm font-medium my-2">
          Hello There ! Sign in and start managing your SMS account
        </p>
        <div
          className="mt-4 shadow-lg hidden bg-red-400 py-3 px-20 rounded-md text-white"
          ref={Alert}
        >
          <h5 className="font-medium"> {error && error.toUpperCase()}</h5>
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
              className="h-12 border-2 p-1 rounded-lg outline-none shadow-md hover:shadow-xl focus:border-blue-600"
              placeholder="email/@username"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-row flex flex-col py-2 relative">
            <label htmlFor="password" className="font-bold text-gray-600 py-1">
              Password
            </label>
            <input
              type={show ? "text" : "password"}
              className={
                show
                  ? "h-12 border-2 p-1 rounded-lg outline-none shadow-md hover:shadow-xl border-1 border-blue-600"
                  : "h-12 border-2 p-1 rounded-lg outline-none shadow-md hover:shadow-xl"
              }
              placeholder="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className={
                show
                  ? "material-icons-outlined absolute right-2 bottom-5 cursor-pointer text-blue-600"
                  : "material-icons-outlined absolute right-2 bottom-5 cursor-pointer hover:text-blue-600"
              }
              onClick={() => {
                setShow(!show);
              }}
            >
              {show ? "visibility" : "visibility_off"}
            </span>
          </div>
          <button
            type="submit"
            className="rounded-full transition-all w-1/2 m-auto bg-blue-500 text-white px-10 py-3 my-10 hover:bg-blue-600"
          >
            {loader ? (
              <Image src={spinner} alt="image" height="30" width="30" />
            ) : (
              "SIGN IN "
            )}
          </button>
        </form>
        <p className="font-medium">
          Have any Issue?{" "}
          <Link href="/reset" passHref>
            <span className="font-bold cursor-pointer hover:text-gray-500">
              Contact us
            </span>
          </Link>
        </p>
        <div className="fixed bottom-0 bg-gray-400 w-full">
          <p className="text-center text-gray-200">
            ©TEA All right reserve {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </>
  );
};
