import React from "react";
import Contact from "./pages/Contact_us";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import WrongRoute from "./components/404";

function App() {
  return (
    <Router>
      <Switch>
        <Route component={Home} path="/" exact />
        <Route component={Contact} path="/contact-us" exact />
        <Route path="*" component={WrongRoute} exact />
      </Switch>
    </Router>
  );
}

export default App;
