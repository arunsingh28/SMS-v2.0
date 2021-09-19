import { Switch, Route, BrowserRouter } from "react-router-dom";
import WrongRoute from "../pages/404";
import Contact from "../pages/Contact_us";
import Home from "../components/Home";

const OutterRouter = () => {
  return (
    // <HashRouter>
    <BrowserRouter>
      <Switch>
        <Route component={Home} path="/" exact />
        <Route component={Contact} path="/contact-us" exact />
        <Route component={WrongRoute} path="*" exact />
      </Switch>
    </BrowserRouter>
    // </HashRouter>
  );
};

export default OutterRouter;
