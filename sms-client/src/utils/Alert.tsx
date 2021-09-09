import React from "react";

interface MProp {
  message: string;
}

const AlertBox = ({ message }: MProp) => {
  return (
    <div className="mt-4 shadow-lg hidden bg-red-400 py-3 px-20 rounded-md text-white">
      <p>{message}</p>
    </div>
  );
};

export default AlertBox;
