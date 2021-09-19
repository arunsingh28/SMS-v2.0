import React from "react";
import { Switch, Route } from "react-router-dom";
import WrongRoute from "../components/404";
import Contact from "../pages/Contact_us";
import Home from "../pages/Home";
import Student_detail from "../pages/Student_detail";

const Router = () => {
  return (
    <Switch>
      <Route component={Home} path="/" exact />
      <Route component={Contact} path="/contact-us" exact />
      <Route component={Student_detail} path="/student-detail" exact />
      <Route path="*" component={WrongRoute} exact />
    </Switch>
  );
};

export default Router;
