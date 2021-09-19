import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
const Workspace = () => {
  return (
    <div className="bg-white h-screen">
      <Switch>
        <Route path="/student" component={Student} exact />
        <Route path="/add" component={Addmission} exact />
      </Switch>
    </div>
  );
};

export default Workspace;

const Student = () => {
  return <h1>Student</h1>;
};

const Addmission = () => {
  return <h1>Addmission</h1>;
};
