import React from "react";
import Protected from "./components/Protected";
import { Route, Switch } from "react-router-dom";
const App = () => {
  return (
    <Switch>
      <Route path="/" exact>
        <h1>Home page</h1>
      </Route>
      <Route component={Protected} exact path="/app" />
    </Switch>
  );
};

export default App;
