import { Switch, Route, Redirect } from "react-router-dom";
import Contact from "../pages/Contact_us";
import Dashboard from "../pages/Dashboard";
import Addmission from "../pages/student/Addmission";
import Student_detail from "../pages/student/Student_detail";

const InnerRouting = () => {
  return (
    <Switch>
      <Route path="/" component={Dashboard} exact />
      <Route path="/student-detail" component={Student_detail} exact />
      <Route path="/addmission" component={Addmission} exact />
      <Route path="/profile" component={Contact} exact />
      <Route path="/logout" exact render={() => <Redirect to="/" />} />
      <Route path="*" component={WrongRoute} exact />
    </Switch>
  );
};

const WrongRoute = () => {
  return <div>Page not found</div>;
};

export default InnerRouting;
