import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import SEO from "./SEO";
import apiCall from "../api/api";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { ActionType } from "../store/Actions";
import { toast } from 'react-toastify'
import spinner from "../public/circle4.svg";


export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loader, setLoader] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  interface Ierror {
    response: {
      status: number | string
    },
    message: string
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // validate form
    if (!email || !password) {
      toast('Fill all the detail', { type: 'error', theme: 'colored' })
    } else {
      setLoader(true);
      try {
        const d = await apiCall('/api/login', { email, password })
        const load = await d.data
        if (load.code == 200) {
          localStorage.setItem("token", `Bearer ${load.accessToken}`);
          dispatch({
            type: ActionType.ADD,
            payload: {
              name: load.data.name,
              role: load.data.role,
            },
          });
          router.push("/");
          setLoader(false);
        } else {
          toast(load.message, { type: 'error' });
          setLoader(false);
        }
      } catch (error) {
        console.log(error)
        if (!(error as Ierror)?.response) {
          toast('No server response', { type: 'error' })
          setLoader(false);
        } else if ((error as Ierror)?.response?.status === 400) {
          toast('Missing username or password', { type: 'error', theme: 'dark' })
          setLoader(false);
        } else if ((error as Ierror)?.response?.status === 401) {
          toast('Invalid cred', { type: 'error' })
          setLoader(false);
        } else {
          toast((error as Ierror)?.message, { type: 'error' })
          setLoader(false);
        }
      }
    }
  };
  return (
    <>
      <SEO
        title="Login"
        description="Login page for Indian public school mangement"
      />
      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="text-4xl my-10">SMS</h1>
        {/* <h3 className="font-black text-3xl my-5">SIGN IN</h3> */}
        <p className="text-sm font-medium my-2">
          Hello There ! Sign in and start managing your SMS account
        </p>
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
              className="h-14 border-2 p-1 rounded-lg outline-none shadow-md hover:shadow-xl focus:border-blue-600"
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
                  ? "h-14 border-2 p-1 rounded-lg outline-none shadow-md hover:shadow-xl border-1 border-blue-600"
                  : "h-14 border-2 p-1 rounded-lg outline-none shadow-md hover:shadow-xl"
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
          <Link href="/contact_us" passHref>
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
