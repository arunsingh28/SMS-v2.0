import React from "react";

interface IProps {
  message: string;
}

const Alert = ({ message }: IProps) => {
  return (
    <div className={message ? "transition duration-500 ease-in-out" : "hidden"}>
      <p className="px-10 bg-gray-700 text-white shadow-xl h-14 flex justify-center items-center rounded-md fixed right-10 bottom-10">
        {message}
      </p>
    </div>
  );
};

export default Alert;
