import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./Pages/index";
import Register from "./components/Register";
import DeleteAccount from "./components/DeleteAccount";
import Login from "./components/Login";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route component={Login} path="/" exact />
        <Route component={Register} path="/n" exact />
        <Route component={DeleteAccount} path="/remove" exact />
        <Route path="*" component={Wrong} />
      </Switch>
    </Router>
  );
};

export default App;

const Wrong = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="font-extrabold text-7xl text-gray-700">
        404
        <span className="ml-5 text-center text-gray-500 text-lg font-normal">
          Something went wrong
        </span>
      </h1>

      <Link to="/">
        <button className="mt-10 bg-blue-600 py-3 px-16 rounded-md text-white shadow-lg hover:bg-blue-800">
          Back
        </button>
      </Link>
    </div>
  );
};
