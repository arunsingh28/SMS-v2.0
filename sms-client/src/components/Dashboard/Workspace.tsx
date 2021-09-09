import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
const Workspace = () => {
  return (
    <div className="bg-white h-screen">
      <BrowserRouter>
        <Route path="/student" component={Student} exact />
      </BrowserRouter>
    </div>
  );
};

export default Workspace;

const Student = () => {
  return <h1>Student</h1>;
};
