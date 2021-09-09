import React, { useState, forwardRef,useImperativeHandle } from "react";
import "./snakebar.css";

interface IProps {
  message: string;
}

const Index = forwardRef((props: IProps,ref) => {
  const [showBar, setShowBar] = useState(true);

  useImperativeHandle(ref, () => ({
    show() {
      alert('show')
    }
  }));

  return (
    <div
      className={
        showBar
          ? "sackbar absolute z-10 w-80 rounded-sm py-3 shadow-lg bg-gray-500"
          : "hidden"
      }
    >
      <div className="flex justify-around">
        <div>
          <p className="text-gray-50 font-bold">{props.message}</p>
        </div>
        <div
          className="p-1 bg-gray-900 relative text-white rounded-full flex items-center justify-center -mt-1
        "
          onClick={() => setShowBar(!showBar)}
        >
          x
        </div>
      </div>
    </div>
  );
};

export default Index;
