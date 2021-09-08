import React, { MutableRefObject, useState } from "react";
import Alert from "../components/Alert_Message";
import Navbar from "../components/Navbar/navbar";
import Submenu from "../components/Navbar/submenu";
import SEO from "../components/SEO";
import api from "../util/api";

export default function StudentDetail() {
  const [reg, setReg] = React.useState("");
  const [error_msg, setError_msg] = useState("");
  const [error, setError] = React.useState(false);
  const message = React.useRef<any>();
  const handleDetail = async () => {
    if (reg.length < 3) {
      setError_msg("Invalid Registration number");
    } else {
      const token: any = localStorage.getItem("token");
      const Header: HeadersInit = new Headers();
      Header.set("authorization", token);
      Header.set("content-type", "application/json");
      const data = {
        method: "post",
        headers: Header,
        body: JSON.stringify({
          reg,
        }),
      };
      // show student data
      const cb = await fetch(`${api.production.URI}/api/student/detail`, data);
      const message_from_serve: any = await cb.json();
      setError_msg(message_from_serve.message);
      console.log(message_from_serve.message);
    }
  };

  return (
    <>
      <SEO title="Student Detail" description="Student Detail page" />
      <div className="_">
        <div className="navbar">
          <Navbar />
        </div>
        <div className="workspace">
          <Submenu />

          <div className="workArea w-full">
            <div className="bg-gray-100 mx-5 py-10 rounded-md my-5 shadow-md">
              <div
                ref={message}
                className="text-center rounded-sm px-2 py-3 mx-64 my-5 bg-red-300 text-white font-medium hidden"
              >
                {error}
              </div>
              <div className="flex justify-center items-center">
                <input
                  type="text"
                  className="h-10 mr-10 px-2 rounded-md outline-none border-2 focus:border-blue-500"
                  placeholder="Student Reg No."
                  value={reg}
                  onChange={(e) => setReg(e.target.value)}
                />
                <button
                  className="bg-blue-400 px-10 py-1.5 rounded-sm text-white hover:bg-blue-500"
                  onClick={handleDetail}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
