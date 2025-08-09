import React from "react";
import { FaPlus } from "react-icons/fa";
import { IoNotificationsOutline } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

import appLogo from "../assets/app_logo.png";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white shadow-md flex items-center justify-between px-6 z-40">
      {/* Left: Logo + App Name */}
      <div className="flex items-center space-x-3">
        <img src={appLogo} alt="Logo" className="h-8 w-8" />
        <span className="font-semibold text-xl text-gray-800">Task Manager</span>
      </div>

      {/* Middle: Search Bar */}
      <div className="flex-1 max-w-lg mx-6">
        <input
          type="text"
          placeholder="Search..."
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Right: Add Task, Notifications, Profile */}
      <div className="flex items-center space-x-5">
        <Link to={"/addtask"}>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition">
          <FaPlus />
          <span className="font-medium">Add Task</span>
        </button>
        </Link>

        <button className="text-gray-600 hover:text-gray-900 transition">
          <IoNotificationsOutline size={24} />
        </button>

        <div className="relative group">
          <FaUserCircle size={28} className="text-gray-600 cursor-pointer" />
          {/* Dropdown Menu */}
          <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-opacity duration-300 z-50">
            <ul className="text-sm">
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Profile</li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Settings</li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Logout</li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}


