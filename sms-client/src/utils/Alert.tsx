import React, { useRef, useState } from "react";

interface MProp {
  message: string;
  type: string;
}

const AlertBox = ({ message, type }: MProp) => {
  const box = useRef<any>();

  const [isType, setIsType] = useState(false);

  if (type === "sucessfull") {
    setIsType(true);
  }

  return (
    <div
      className={
        isType
          ? "bg-red-900 px-20 py-4 text-white rounded-md shadow-lg z-20"
          : "px-20 py-4 text-white rounded-md shadow-lg z-20 absolute bottom-5 left-5 bg-green-500"
      }
      ref={box}
    >
      <p>{message}</p>
    </div>
  );
};

export default AlertBox;
