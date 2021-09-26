import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import Call from "../api";

const Register = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [btnstate, setBtnState] = useState(false);
  const [error, setError] = useState("");
  const [success, setSucess] = useState("");

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setBtnState(true);

    const token = JSON.parse(localStorage.getItem("adminToken")!);
    const requestHeader: HeadersInit = new Headers();
    requestHeader.set("Content-Type", "application/json");
    requestHeader.set("authorization", token);

    let Decide = () => {
      const resolveAfter4sec = new Promise(async (resolve, reject) => {
        const info = await fetch(Call.Production.URI + "/accountTerminate", {
          method: "POST",
          headers: requestHeader,
          body: JSON.stringify({
            email,
            code,
          }),
        });
        const data = await info.json();
        if (data.type === "success") {
          setTimeout(resolve, 4000);
          setSucess(data.message);
        }
        if (data.type === "error") {
          setTimeout(reject, 4000);
          setError(data.message);
        } else {
          setTimeout(reject, 4000);
        }
      });

      toast.promise(resolveAfter4sec, {
        pending: "Request dispatch",
        success: success || "Delete Succssfully",
        error: error || "Error 404",
      });
    };
    Decide();
    setBtnState(false);
  };
  return (
    <div className="text-center mt-5">
      <ToastContainer />
      <h1 className="text-2xl font-extrabold text-gray-600">Admin Panel</h1>
      <div className="py-40">
        <h1 className="mb-10 text-gray-600 text-xl font-bold">
          Renmove account
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
            placeholder="Enter @email"
            required={true}
          />
          <input
            type="password"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter Code**"
            className="pl-2 h-16 w-80 bg-gray-100 rounded-md shadow-md outline-none mt-10"
            required={true}
          />
          <button
            className={
              btnstate
                ? "mt-10 px-16 py-4 rounded-md cursor-wait text-white bg-blue-900"
                : "mt-10 px-16 py-4 bg-blue-700 rounded-md text-white hover:bg-blue-900"
            }
            disabled={btnstate ? true : false}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
