import React from "react";
import Contact from "./pages/Contact_us";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import WrongRoute from "./components/404";
import Student_detail from "./pages/Student_detail";

function App() {
  return (
    <Switch>
      <Route component={Home} path="/" exact />
      <Route component={Contact} path="/contact-us" exact />
      <Route component={Student_detail} path="/student-detail" exact />
      <Route path="*" component={WrongRoute} exact />
    </Switch>
  );
}

export default App;
