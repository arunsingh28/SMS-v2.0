import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import api from "../utils/api";
import spinner from "../Assets/images/loader.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loader, setLoader] = useState(false);

  const history = useHistory();

  useEffect(() => {
    document.title = "Login";
  });

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
      localStorage.setItem("token", `Bearer ${load.accessToken}`);
      // routing to dashboad
      history.push("/");
      setLoader(false);
    } else {
      toast(load?.message || 'something went wrong', { type: "error" });
      setLoader(false);
    }
  }


  return (
    <>
      <ToastContainer />
      <div className="flex flex-col justify-center items-center h-screen relative">
        <img
          src="https://ouch-cdn2.icons8.com/cRcyWU3CWZRI0Vmed5qNqLu-61XofFBJhfW6UGkZrFI/rs:fit:1420:912/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvNDM5/L2Y1MDIwMTA3LTIz/ZWMtNGNiNi04OTli/LWJlODA2MWJlYWE0/Mi5zdmc.png"
          alt="logo"
          width="100"
          height="150"
          className="rounded-full shadow-lg pointer-events-none"
        />
        <h1 className="text-4xl my-10">SMS</h1>
        {/* <h3 className="font-black text-3xl my-5">SIGN IN</h3> */}
        <p className="text-sm font-medium my-2">
          Hello There ! Sign in and start managing your SMS account
        </p>
        <form
          className="w-full px-8 lg:w-1/3 md:w-2/3 mt-10 flex flex-col justify-center"
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
                  ? "pr-1 h-14 border-2 p-1 rounded-lg outline-none shadow-md hover:shadow-xl border-1 border-blue-600"
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
            className="rounded-full transition-all w-1/2 m-auto bg-blue-500 text-white px-10 py-3 my-10 hover:bg-blue-600 flex items-center justify-center"
          >
            {loader ? (
              <img src={spinner} alt="image" height="30" width="30" />
            ) : (
              "SIGN IN "
            )}
          </button>
        </form>
        <p className="font-medium">
          Have any Issue?{" "}
          <Link to="/contact-us">
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
