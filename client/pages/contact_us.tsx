import React from "react";
import SEO from "../components/SEO";
import Image from "next/image";
import Link from "next/link";
// import l from "";
const Contact = () => {
  return (
    <div className="h-screen">
      <SEO title="Contact us" description="Contact us page" />
      <div className="h-1/3 bg-blue-700"></div>
      <div className="flex justify-center items-start -mt-40">
        <div className="bg-white w-1/2 rounded-md shadow-lg py-10">
          <div className="m-auto flex justify-center items-center">
            <img
              src="https://ouch-cdn2.icons8.com/5i6_E8WXRbDNaweOEJSsWnluUH8rfFfNTEv7g9m06fU/rs:fit:579:912/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvOTA4/L2IwYWIzZGE2LTA0/ZWItNDJlYy1iNjMz/LTE4MmQ5YmVlMTY0/MS5zdmc.png"
              alt="asdf"
              height="50"
              width="50"
              className="mr-4"
            />
            <h1 className="font-thin text-4xl">Say Hello!</h1>
          </div>
          <div className="flex gap-5 mt-10 py-1 px-5">
            <div className="flex-1">
              <div className="flex flex-col">
                <label htmlFor="name" className="text-gray-400 font-semibold">
                  Your name*
                </label>
                <input
                  type="text"
                  placeholder="Aawsome name"
                  className="border h-12 mt-2 rounded-md pl-2 "
                />
              </div>
              <div className="flex flex-col mt-3">
                <label htmlFor="name" className="text-gray-400 font-semibold">
                  Name*
                </label>
                <input
                  type="text"
                  placeholder="awsomename"
                  className="border h-12 mt-2 rounded-md pl-2"
                />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex flex-col">
                <label htmlFor="name" className="text-gray-400 font-semibold">
                  Contact email*
                </label>
                <input
                  type="text"
                  placeholder="your@example.com"
                  className="border h-12 mt-2 rounded-md pl-2"
                />
              </div>
              <div className="flex flex-col mt-3">
                <label htmlFor="name" className="text-gray-400 font-semibold">
                  School name*
                </label>
                <input
                  type="text"
                  placeholder="exelant school"
                  className="border h-12 mt-2 rounded-md pl-2"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col px-5 mt-3">
            <label htmlFor="name" className="text-gray-400 font-semibold">
              Message *
            </label>
            <textarea
              placeholder="Enter Your name"
              className="border h-24 mt-2 rounded-md pl-2"
            />
          </div>
          <p className="mx-5 my-3 font-light text-sm text-gray-700">
            By submiting this form you agree to our terms and conditions and our
            privac which explains we may collect,uyse and diclose your personal
            information including to third parties.
          </p>
          <div className="flex justify-center items-center mt-10">
            <button className="shadow-xl bg-blue-700 text-white font-medium px-10 py-2 rounded-md ransition duration-150 ease-in-out hover:bg-blue-800">
              Submit
            </button>
            <Link href="/">
              <button className="shadow-xl bg-blue-700 text-white font-medium px-10 py-2 rounded-md ml-10 transition duration-150 ease-in-out hover:bg-blue-800">
                Back
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
