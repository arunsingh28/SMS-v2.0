import React, { useState } from "react";
import Link from "next/link";
const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="fixed bg-blue-500 overflow-scroll h-screen text-start hover:shadow-lg">
      {/* header */}
      <h2 className="font-bold text-4xl text-white border-b-2 py-4 px-2">
        IPS <span className="font-light text-xl">Mangement</span>
      </h2>
      {/* menu item */}
      <div className="py-5 mb-10">
        <ul>
          <Link href="/">
            <li className="cursor-pointer py-3 text-gray-200 font-medium hover:bg-blue-700 active px-2">
              Dashboard
            </li>
          </Link>

          <li
            className="cursor-pointer py-3 text-gray-200 font-medium hover:bg-blue-700 px-2 relative"
            onClick={() => setOpen(!open)}
          >
            Student
          </li>
          <ul className={open ? "block" : "hidden"}>
            <li>Fees</li>
          </ul>

          <Link href="/">
            <li className="cursor-pointer py-3 text-gray-200 font-medium hover:bg-blue-700 px-2">
              Academic
            </li>
          </Link>
          <Link href="/addm">
            <li className="cursor-pointer py-3 text-gray-200 font-medium hover:bg-blue-700 px-2">
              Administration
            </li>
          </Link>
          <Link href="/fees">
            <li className="cursor-pointer py-3 text-gray-200 font-medium hover:bg-blue-700 px-2">
              Fees
            </li>
          </Link>

          <Link href="/">
            <li className="cursor-pointer py-3 text-gray-200 font-medium hover:bg-blue-700 active px-2">
              Dashboard
            </li>
          </Link>
          <Link href="/">
            <li className="cursor-pointer py-3 text-gray-200 font-medium hover:bg-blue-700 px-2">
              Student
            </li>
          </Link>
          <Link href="/">
            <li className="cursor-pointer py-3 text-gray-200 font-medium hover:bg-blue-700 px-2">
              Academic
            </li>
          </Link>
          <Link href="/addm">
            <li className="cursor-pointer py-3 text-gray-200 font-medium hover:bg-blue-700 px-2">
              Administration
            </li>
          </Link>
          <Link href="/fees">
            <li className="cursor-pointer py-3 text-gray-200 font-medium hover:bg-blue-700 px-2">
              Fees
            </li>
          </Link>

          <Link href="/">
            <li className="cursor-pointer py-3 text-gray-200 font-medium hover:bg-blue-700 active px-2">
              Dashboard
            </li>
          </Link>
          <Link href="/">
            <li className="cursor-pointer py-3 text-gray-200 font-medium hover:bg-blue-700 px-2">
              Student
            </li>
          </Link>
          <Link href="/">
            <li className="cursor-pointer py-3 text-gray-200 font-medium hover:bg-blue-700 px-2">
              Academic
            </li>
          </Link>
          <Link href="/addm">
            <li className="cursor-pointer py-3 text-gray-200 font-medium hover:bg-blue-700 px-2">
              Administration
            </li>
          </Link>
          <Link href="/fees">
            <li className="cursor-pointer py-3 text-gray-200 font-medium hover:bg-blue-700 px-2">
              Fees
            </li>
          </Link>

          <Link href="/">
            <li className="cursor-pointer py-3 text-gray-200 font-medium hover:bg-blue-700 active px-2">
              Dashboard
            </li>
          </Link>
          <Link href="/">
            <li className="cursor-pointer py-3 text-gray-200 font-medium hover:bg-blue-700 px-2">
              Student
            </li>
          </Link>
          <Link href="/">
            <li className="cursor-pointer py-3 text-gray-200 font-medium hover:bg-blue-700 px-2">
              Academic
            </li>
          </Link>
          <Link href="/addm">
            <li className="cursor-pointer py-3 text-gray-200 font-medium hover:bg-blue-700 px-2">
              Administration
            </li>
          </Link>
          <Link href="/fees">
            <li className="cursor-pointer py-3 text-gray-200 font-medium hover:bg-blue-700 px-2">
              Fees
            </li>
          </Link>
          <Link href="/">
            <li className="cursor-pointer py-3 text-gray-200 font-medium hover:bg-blue-700 active px-2">
              Dashboard
            </li>
          </Link>
          <Link href="/">
            <li className="cursor-pointer py-3 text-gray-200 font-medium hover:bg-blue-700 px-2">
              Student
            </li>
          </Link>
          <Link href="/">
            <li className="cursor-pointer py-3 text-gray-200 font-medium hover:bg-blue-700 px-2">
              Academic
            </li>
          </Link>
          <Link href="/addm">
            <li className="cursor-pointer py-3 text-gray-200 font-medium hover:bg-blue-700 px-2">
              Administration
            </li>
          </Link>
          <Link href="/fees">
            <li className="cursor-pointer py-3 text-gray-200 font-medium hover:bg-blue-700 px-2">
              Fees
            </li>
          </Link>
          <button className="fixed w-full left-0 bottom-0 bg-white py-5 px-10 bg-left-bottomfont-bold hover:bg-gray-200">
            Logout
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
