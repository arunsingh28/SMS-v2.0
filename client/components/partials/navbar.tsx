import React, { useState } from "react";
import Link from "next/link";
import "../../styles/Nav.module.css";
const Navbar = () => {
  const [student, setStudent] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [message, setMessage] = useState(false);
  const [setting, setSetting] = useState(false);
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };
  return (
    <div className="bg-blue-500 overflow-scroll h-screen text-start hover:shadow-lg">
      {/* header */}
      <h2 className="font-bold text-4xl text-white border-b-2 py-4 px-2">
        SMS <span className="font-light text-xl">Mangement</span>
      </h2>
      {/* menu item */}
      <div className="py-5 mb-10">
        <ul>
          <Link href="/">
            <li className="cursor-pointer py-3 text-gray-200 font-medium hover:bg-blue-700 px-2 flex active">
              <span className="material-icons-outlined">grid_view</span>{" "}
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
            <li className="py-2 text-gray-600 font-medium mt-1 bg-blue-200 rounded-sm px-2 hover:bg-blue-500 hover:text-white cursor-pointer flex">
              <span className="material-icons-outlined mr-1">info</span>
              Student Detail
            </li>
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

          <Link href="/">
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

          <Link href="/">
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

          <Link href="/">
            <li className="cursor-pointer py-3 text-gray-200 font-medium hover:bg-blue-700 px-2 flex">
              <span className="material-icons-outlined">person</span>{" "}
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

          <Link href="/">
            <li className="cursor-pointer py-3 text-gray-200 font-medium hover:bg-red-400 px-2 flex">
              <span className="material-icons-outlined">report</span>{" "}
              <span className="ml-1">Report</span>
            </li>
          </Link>

          <button
            className=" bg-white py-5 w-full px-10 font-bold hover:bg-gray-200 flex justify-center"
            onClick={handleLogout}
          >
            <span className="material-icons-outlined">logout</span> Logout
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
