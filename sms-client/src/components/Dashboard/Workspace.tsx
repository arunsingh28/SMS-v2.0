import React from "react";
import { Route, Switch } from "react-router-dom";
import Student_detail from "../../pages/Student_detail";
const Workspace = () => {
  return (
    <div className="bg-white h-screen">
      <Switch>
        <Route path="/student-detail" component={Student_detail} exact />
        <Route path="/addmission" component={Addmission} exact />
      </Switch>
    </div>
  );
};

export default Workspace;

const Addmission = () => {
  return <h1>Addmission</h1>;
};
