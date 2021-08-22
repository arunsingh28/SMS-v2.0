import React from "react";

const Navbar = () => {
  return (
    <div className="bg-gray-100 w-100">
      <div className="px-20 py-4 flex items-center justify-between md:px-10">
        <div className="font-bold">
          <img
            className="object-fit h-10 bg-scroll"
            src="https://s3.amazonaws.com/logosnap/logos/2021/Jul/original-2928-60fffbf7a33fcwm.png"
          />
        </div>
        <div className="">
          <button
            className="px-6 py-2 bg-blue-600 rounded text-white"
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
