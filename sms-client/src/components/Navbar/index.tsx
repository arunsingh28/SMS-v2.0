import { useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";

const Navbar = () => {
  const [student, setStudent] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [message, setMessage] = useState(false);
  const [setting, setSetting] = useState(false);
  const [toggle, setToggle] = useState(false);

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
          <Link to="/">
            <li className="cursor-pointer py-3 text-gray-200 font-medium hover:bg-blue-700 px-2 flex">
              <span className="material-icons-outlined">grid_view</span>
              <span className="ml-1">Dashboard</span>
            </li>
          </Link>

          <li
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
            <Link to="/student-detail">
              <li className="py-2 text-gray-600 font-medium mt-1 bg-blue-200 rounded-sm px-2 hover:bg-blue-500 hover:text-white cursor-pointer flex">
                <span className="material-icons-outlined mr-1">info</span>
                Student Detail
              </li>
            </Link>
            <Link to="/addmission">
              <li className="py-2 text-gray-600 font-medium mt-1 bg-blue-200 rounded-sm px-2 hover:bg-blue-500 hover:text-white cursor-pointer flex">
                <span className="material-icons-outlined mr-1">add</span>
                Addimission
              </li>
            </Link>
            <Link to="/cancel-addmission">
              <li className="py-2 text-gray-600 font-medium mt-1 bg-blue-200 rounded-sm px-2 hover:bg-blue-500 hover:text-white cursor-pointer flex">
                <span className="material-icons-outlined mr-1">
                  delete_forever
                </span>
                Cancel Addmission
              </li>
            </Link>
            <Link to="/filter">
              <li className="py-2 text-gray-600 font-medium mt-1 bg-blue-200 rounded-sm px-2 hover:bg-blue-500 hover:text-white cursor-pointer flex">
                <span className="material-icons-outlined mr-1">filter_alt</span>
                Filter
              </li>
            </Link>
            <Link to="/performace">
              <li className="py-2 text-gray-600 font-medium mt-1 bg-blue-200 rounded-sm px-2 hover:bg-blue-500 hover:text-white cursor-pointer flex">
                <span className="material-icons-outlined mr-1">
                  align_vertical_bottom
                </span>
                Performance
              </li>
            </Link>
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

          <Link to="/student">
            <li className="cursor-pointer py-3 text-gray-200 font-medium hover:bg-blue-700 px-2 flex">
              <span className="material-icons-outlined">mms</span>{" "}
              <span className="ml-1">Media Gallary</span>
            </li>
          </Link>

          <li
            className={
              message
                ? "cursor-pointer py-3 bg-blue-700 text-gray-200 font-medium px-2 relative flex justify-between"
                : "cursor-pointer py-3 bg-blue-400 text-gray-200 font-medium hover:bg-blue-700 px-2 relative flex justify-between"
            }
            onClick={() => setMessage(!message)}
          >
            <div className="flex">
              <span className="material-icons-outlined">local_post_office</span>{" "}
              <span className="ml-1">Message</span>
            </div>
            {message ? (
              <span className="material-icons-outlined">keyboard_arrow_up</span>
            ) : (
              <span className="material-icons-outlined">expand_more</span>
            )}
          </li>
          <ul className={message ? "block py-1 px-2 bg-blue-100" : "hidden"}>
            <li className="py-2 text-gray-600 font-medium mt-1 bg-blue-200 rounded-sm px-2 hover:bg-blue-500 hover:text-white cursor-pointer flex">
              <span className="material-icons-outlined mr-1">drafts</span>
              Read Mail
            </li>
            <li className="py-2 text-gray-600 font-medium mt-1 bg-blue-200 rounded-sm px-2 hover:bg-blue-500 hover:text-white cursor-pointer flex">
              <span className="material-icons-outlined mr-1">
                forward_to_inbox
              </span>
              Send Mail
            </li>
            <li className="py-2 text-gray-600 font-medium mt-1 bg-blue-200 rounded-sm px-2 hover:bg-blue-500 hover:text-white cursor-pointer flex">
              <span className="material-icons-outlined mr-1">
                mobile_screen_share
              </span>
              Watsapp Circular
            </li>
          </ul>

          <Link to="/profile">
            <li className="cursor-pointer py-3 text-gray-200 font-medium hover:bg-blue-700 px-2 flex">
              <span className="material-icons-outlined">person</span>
              <span className="ml-1">My Profile</span>
            </li>
          </Link>

          <li
            className={
              message
                ? "cursor-pointer py-3 bg-blue-700 text-gray-200 font-medium px-2 relative flex justify-between"
                : "cursor-pointer py-3 bg-blue-400 text-gray-200 font-medium hover:bg-blue-700 px-2 relative flex justify-between"
            }
            onClick={() => setSetting(!setting)}
          >
            <div className="flex">
              <span className="material-icons-outlined">
                miscellaneous_services
              </span>{" "}
              <span className="ml-1">Mics</span>
            </div>
            {setting ? (
              <span className="material-icons-outlined">keyboard_arrow_up</span>
            ) : (
              <span className="material-icons-outlined">expand_more</span>
            )}
          </li>
          <ul className={setting ? "block py-1 px-2 bg-blue-100" : "hidden"}>
            <li className="py-2 text-gray-600 font-medium mt-1 bg-blue-200 rounded-sm px-2 hover:bg-blue-500 hover:text-white cursor-pointer flex">
              <span className="material-icons-outlined mr-1">drafts</span>
              Mail Setting
            </li>
            <li className="py-2 text-gray-600 font-medium mt-1 bg-blue-200 rounded-sm px-2 hover:bg-blue-500 hover:text-white cursor-pointer flex">
              <span className="material-icons-outlined mr-1">edit</span>
              Edit Info
            </li>
          </ul>

          <Link to="/">
            <li className="cursor-pointer py-3 text-gray-200 font-medium hover:bg-blue-700 px-2 flex">
              <span className="material-icons-outlined">
                home_repair_service
              </span>
              <span className="ml-1">Matanance</span>
            </li>
          </Link>

          <Link to="/contact-us">
            <li className="cursor-pointer py-3 text-gray-200 font-medium hover:bg-red-400 px-2 flex">
              <span className="material-icons-outlined">report</span>
              <span className="ml-1">Report</span>
            </li>
          </Link>

          <Link to="/logout" onClick={handleLogout}>
            <button className=" bg-white py-5 w-full px-10 font-bold hover:bg-gray-200 flex justify-center">
              <span className="material-icons-outlined">logout</span> Logout
            </button>
          </Link>
        </ul>
      </div>
      {/* down menu */}
      <div className=" w-full bg-blue-700">
        <div className="flex justify-between items-center py-4 px-1">
          <img
            src="data:image/jpeg;base64,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"
            alt=""
            className="h-12 -w-12 rounded-full object-cover"
          />
          <h1 className="font-bold text-white">Arun pratap singh</h1>
        </div>
        {/* theme mode */}
        <div className="text-white flex justify-between items-center bg-image bg-blue-900 py-4 px-1">
          <h4 className="font">Change Background </h4>
          <div
            className={
              toggle
                ? "w-10 bg-gray-500 h-5 rounded-xl relative cursor-pointer hover:shadow-md"
                : "w-10 bg-white h-5 rounded-xl relative cursor-pointer hover:shadow-md"
            }
            onClick={changeBackground}
          >
            <div
              className={
                toggle
                  ? "bg-blue-500 h-5 w-5 rounded-full ml-5 transition ease-in-out"
                  : "bg-blue-900 h-5 w-5 rounded-full"
              }
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
