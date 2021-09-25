import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Pages/index";
import Register from "./components/Register";
import DeleteAccount from "./components/DeleteAccount";
const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route component={Home} path="/" exact />
          <Route component={Register} path="/n" exact />
          <Route component={DeleteAccount} path="/remove" exact />
          <Route path="*" component={Wrong} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;

const Wrong = () => {
  return <h1>404</h1>;
};
