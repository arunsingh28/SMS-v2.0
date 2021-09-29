import InnerRouting from "../../Router/InnerRouting";
import Banner from "../Banner/Index";

const Workspace = () => {
  return (
    <div className="bg-white h-screen p-1">
      {/* Banner */}
      <Banner />
      {/* end of Banner */}
      <InnerRouting />
    </div>
  );
};

export default Workspace;
