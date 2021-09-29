import React from "react";

const Index = () => {
  return (
    <div className="w-full bg-blue-gradient text-white rounded-lg shadow-md px-3 py-10">
      <h1 className="text-3xl ">Your Product Overview</h1>
      <p className="py-2 text-sm text-gray-100">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis
        fugiat est voluptatum officiis saepe similique reiciendis, illum laborum
        ut ipsam illo ullam odit atque sit aliquid eos quidem doloremque dicta?
      </p>
      <div className="flex mt-5">
        <button className="py-2 px-10 bg-white text-blue-900 rounded-md font-medium shadow-lg">
          Accecpt
        </button>
        <button className="py-2 px-10 bg-white text-blue-900 ml-10 rounded-md font-medium shadow-lg">
          Reject
        </button>
      </div>
    </div>
  );
};

export default Index;
