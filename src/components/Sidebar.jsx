import React from "react";
import { Link } from "react-router-dom";
import app_logo from "../assets/app_logo.png";
import { useTaskContext } from "../context/TaskContext";

import { MdMenuOpen, MdOutlineDashboard, MdOutlineAddTask } from "react-icons/md";
import { IoHomeOutline, IoLogoBuffer } from "react-icons/io5";
import { FaProductHunt, FaUserCircle } from "react-icons/fa";
import { TbReportSearch } from "react-icons/tb";
import { CiSettings } from "react-icons/ci";
import { FcAbout } from "react-icons/fc";

const menuItems = [
  { icon: <IoHomeOutline size={22} />, label: "Home", to: "/" },
  { icon: <FcAbout size={22} />, label: "About", to: "/about" },
  { icon: <MdOutlineAddTask size={22} />, label: "Add Task", to: "/addtask" },
  { icon: <FaProductHunt size={22} />, label: "Products", to: "/products" },
  { icon: <MdOutlineDashboard size={22} />, label: "Dashboard", to: "/dashboard" },
  { icon: <CiSettings size={22} />, label: "Setting", to: "/setting" },
  { icon: <IoLogoBuffer size={22} />, label: "Log", to: "/log" },
  { icon: <TbReportSearch size={22} />, label: "Report", to: "/report" },
];

export default function Sidebar() {
  const { open, setOpen } = useTaskContext();

  return (
    <nav
      className={`fixed left-0 bg-white shadow-md flex flex-col transition-width duration-500 ease-in-out
        ${open ? "w-60" : "w-16"}`}
      style={{
        top: "4rem",                  // Navbar height 4rem
        height: "calc(100vh - 4rem)", // Screen height minus navbar height
        zIndex: 100,
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between h-20 px-3">
        <img
          src={app_logo}
          alt="Logo"
          className={`rounded-md transition-all duration-300 
            ${open ? "w-12 opacity-100" : "w-0 opacity-0"}`}
        />
        <MdMenuOpen
          size={28}
          className={`cursor-pointer text-gray-700 transition-transform duration-300 ${!open ? "rotate-180" : ""}`}
          onClick={() => setOpen(!open)}
        />
      </div>

      <ul className="mt-4">
        {menuItems.map((item, index) => (
          <li key={index} className="relative group">
            <Link
              to={item.to}
              className="flex items-center gap-4 px-4 py-3 my-1 rounded-md hover:bg-blue-700 hover:text-white transition-colors duration-300"
            >
              <div className="flex-shrink-0">{item.icon}</div>
              <span
                className={`whitespace-nowrap transition-all duration-300 ease-in-out
                  ${open ? "opacity-100 w-auto" : "opacity-0 w-0 overflow-hidden"}`}
              >
                {item.label}
              </span>
            </Link>

            {!open && (
              <span
                className="absolute left-full top-1/2 -translate-y-1/2 bg-gray-800 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap ml-2 z-50"
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ul>

      {/* Footer */}
      <div className="mt-auto flex items-center gap-3 px-4 py-4 border-t border-gray-200 flex-shrink-0">
        <FaUserCircle size={28} className="text-gray-600" />
        <div
          className={`transition-all duration-300 ease-in-out 
            ${open ? "opacity-100 w-auto" : "opacity-0 w-0 overflow-hidden"}`}
        >
          <p className="text-sm font-semibold text-gray-800">Saheb</p>
          <span className="text-xs text-gray-500">saheb@gmail.com</span>
        </div>
      </div>
    </nav>
  );
}


