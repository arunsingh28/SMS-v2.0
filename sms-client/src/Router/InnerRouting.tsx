import { Switch, Route, useHistory } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Addmission from "../pages/student/Addmission";
import Cancel_addmission from "../pages/student/Cancel_addmission";
import Filter from "../pages/student/Filter";
import Student_detail from "../pages/student/Student_detail";
import Performance from "../pages/student/Performance";
import { toast, ToastContainer } from "react-toastify";

const InnerRouting = () => {
  return (
    <Switch>
      {/* Dashboard route */}
      <Route path="/" component={Dashboard} exact />
      {/* end of Dashboard route */}

      {/* student routing */}
      <Route path="/student-detail" component={Student_detail} exact />
      <Route path="/addmission" component={Addmission} exact />
      <Route path="/cancel-addmission" component={Cancel_addmission} exact />
      <Route path="/filter" component={Filter} exact />
      <Route path="/performace" component={Performance} exact />
      {/* end of student routing */}

      {/* Academin route */}
      {/* <Route path="/academic" component={} exact /> */}
      {/* end of academic route */}

      {/* <Route path="/logout" exact render={() => <Redirect to="/" />} /> */}

      {/* wrong 404 routing */}
      <Route path="*" component={WrongRoute} />
      {/* end of wrong 404 routing */}
    </Switch>
  );
};

const WrongRoute = () => {
  const history = useHistory();
  toast("Invalid Url Taking back to Dashboard", {
    type: "warning",
    progress: undefined,
  });
  setTimeout(() => {
    history.replace("/");
  }, 4000);
  return <ToastContainer />;
};

export default InnerRouting;
