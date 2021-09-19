import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
const Workspace = () => {
  return (
    <div className="bg-white h-screen">
      <Switch>
        <Route path="/student" component={Student} exact />
      </Switch>
    </div>
  );
};

export default Workspace;

const Student = () => {
  return <h1>Student</h1>;
};
