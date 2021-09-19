import { useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { menuData } from "./Item";

interface IMporps {
  icon: string;
  title: string;
  path: string;
  isOpen: string;
  isClose: string;
  submenu?: undefined;
  menuName?: undefined;
}

const MenuItem = (data: IMporps) => {
  return (
    <li className="cursor-pointer py-3 text-gray-200 font-medium hover:bg-blue-700 px-2 flex">
      <span className="material-icons-outlined">{data.icon}</span>
      <span className="ml-1">{data.title}</span>
    </li>
  );
};

const Navbar = () => {
  const [student, setStudent] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [message, setMessage] = useState(false);
  const [setting, setSetting] = useState(false);
  const [toggle, setToggle] = useState(false);

  const [subnav, setSubnav] = useState(false);

  const history = useHistory();
  const bg = useRef<any>();
  const handleLogout = () => {
    localStorage.clear();
    history.push("/");
  };

  // change background image
  const changeBackground = () => {
    setToggle(!toggle);
  };
  return (
    <div
      ref={bg}
      className="bg-blue-500 relative overflow-scroll h-screen text-start hover:shadow-lg hide-scroll nav-bg"
    >
      {/* header */}
      <h2 className="font-bold text-4xl text-white border-b-2 py-4 px-2">
        SMS <span className="font-light text-xl">Mangement</span>
      </h2>
      {/* menu item */}
      <div className="py-5 mb-10 flex flex-col">
        <ul>
          {menuData.map((info) => {
            return <MenuItem data={info} />;
          })}

          {/* <li
            className={
              student
                ? "cursor-pointer py-3 bg-blue-700 text-gray-200 font-medium px-2 relative flex justify-between"
                : "cursor-pointer py-3 bg-blue-400 text-gray-200 font-medium hover:bg-blue-700 px-2 relative flex justify-between"
            }
            onClick={() => setStudent(!student)}
          >
            <div className="flex">
              <span className="material-icons-outlined">badge</span>
              <span className="ml-1">Student</span>
            </div>
            {student ? (
              <span className="material-icons-outlined">keyboard_arrow_up</span>
            ) : (
              <span className="material-icons-outlined">expand_more</span>
            )}
          </li>
          <ul className={student ? "block py-1 px-2 bg-blue-100" : "hidden"}>
            <Link to="/student/detail">
              <li className="py-2 text-gray-600 font-medium mt-1 bg-blue-200 rounded-sm px-2 hover:bg-blue-500 hover:text-white cursor-pointer flex">
                <span className="material-icons-outlined mr-1">info</span>
                Student Detail
              </li>
            </Link>
            <li className="py-2 text-gray-600 font-medium mt-1 bg-blue-200 rounded-sm px-2 hover:bg-blue-500 hover:text-white cursor-pointer flex">
              <span className="material-icons-outlined mr-1">add</span>
              Addimission
            </li>
            <li className="py-2 text-gray-600 font-medium mt-1 bg-blue-200 rounded-sm px-2 hover:bg-blue-500 hover:text-white cursor-pointer flex">
              <span className="material-icons-outlined mr-1">
                delete_forever
              </span>
              Cancel Addmission
            </li>
            <li className="py-2 text-gray-600 font-medium mt-1 bg-blue-200 rounded-sm px-2 hover:bg-blue-500 hover:text-white cursor-pointer flex">
              <span className="material-icons-outlined mr-1">filter_alt</span>
              Filter
            </li>
            <li className="py-2 text-gray-600 font-medium mt-1 bg-blue-200 rounded-sm px-2 hover:bg-blue-500 hover:text-white cursor-pointer flex">
              <span className="material-icons-outlined mr-1">
                align_vertical_bottom
              </span>
              Performance
            </li>
          </ul>

          <Link to="/">
            <li className="cursor-pointer py-3 text-gray-200 font-medium hover:bg-blue-700 px-2 flex">
              <span className="material-icons-outlined">local_library</span>{" "}
              <span className="ml-1">Academic</span>
            </li>
          </Link>

          <li
            className={
              admin
                ? "cursor-pointer py-3 bg-blue-700 text-gray-200 font-medium px-2 relative flex justify-between"
                : "cursor-pointer py-3 bg-blue-400 text-gray-200 font-medium hover:bg-blue-700 px-2 relative flex justify-between"
            }
            onClick={() => setAdmin(!admin)}
          >
            <div className="flex">
              <span className="material-icons-outlined">
                admin_panel_settings
              </span>
              <span className="ml-1">Aadministration</span>
            </div>
            {admin ? (
              <span className="material-icons-outlined">keyboard_arrow_up</span>
            ) : (
              <span className="material-icons-outlined">expand_more</span>
            )}
          </li> 
          <ul className={admin ? "block py-1 px-2 bg-blue-100" : "hidden"}>
            <li className="py-2 text-gray-600 font-medium mt-1 bg-blue-200 rounded-sm px-2 hover:bg-blue-500 hover:text-white cursor-pointer flex">
              <span className="material-icons-outlined mr-1">payments</span>
              Fees Manager
            </li>
            <li className="py-2 text-gray-600 font-medium mt-1 bg-blue-200 rounded-sm px-2 hover:bg-blue-500 hover:text-white cursor-pointer flex">
              <span className="material-icons-outlined mr-1">folder</span>
              Record Master
            </li>
            <li className="py-2 text-gray-600 font-medium mt-1 bg-blue-200 rounded-sm px-2 hover:bg-blue-500 hover:text-white cursor-pointer flex">
              <span className="material-icons-outlined mr-1">schedule</span>
              Time Table
            </li>
            <li className="py-2 text-gray-600 font-medium mt-1 bg-blue-200 rounded-sm px-2 hover:bg-blue-500 hover:text-white cursor-pointer flex">
              <span className="material-icons-outlined mr-1">visibility</span>
              Status
            </li>
          </ul>
*/}

          {/* <Link to="/">
            <li className="cursor-pointer py-3 text-gray-200 font-medium hover:bg-red-400 px-2 flex">
              <span className="material-icons-outlined">report</span>{" "}
              <span className="ml-1">Report</span>
            </li>
          </Link> */}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
