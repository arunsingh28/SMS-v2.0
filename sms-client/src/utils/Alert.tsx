import React from "react";

interface MProp {
  message: string;
  type: string;
}

const AlertBox = ({ message, type }: MProp) => {
  console.log(type);
  return (
    <div className="shadow-2xl py-3 px-20 rounded-md text-white bg-gray-600 absolute bottom-5 left-5 z-10 text-uppercase">
      <p>{message}</p>
    </div>
  );
};

export default AlertBox;
