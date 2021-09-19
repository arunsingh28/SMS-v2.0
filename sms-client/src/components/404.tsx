import React from "react";
import { useLocation } from "react-router-dom";

const WrongRoute = () => {
  const location = useLocation();
  return (
    <div className="grid justify-center items-center text-6xl h-screen">
      path: {location.pathname}
      <br />
      <div className="text-uppercase"> 404 page not found</div>
    </div>
  );
};

export default WrongRoute;
