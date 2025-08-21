// src/components/Navbar.jsx

import React, { useContext } from "react";
import { FaPlus } from "react-icons/fa";
import { IoNotificationsOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useTaskContext } from "../context/TaskContext";
import appLogo from "../assets/app_logo.png";
import ProfileDropdown from "./ProfileDropdown";
import Searchbar from "./Searchbar"; 

export default function Navbar() {
  const { token } = useContext(AuthContext);
  const { open } = useTaskContext();

  return (
    <nav
      className={`fixed top-0 bg-gray-900 shadow-xl flex items-center justify-between px-4 sm:px-6 z-40 transition-all duration-500 ease-in-out h-16
        ${token ? (open ? "left-64 md:left-64 w-[calc(100%-16rem)]" : "left-20 md:left-20 w-[calc(100%-5rem)]") : "left-0 w-full"}`}
    >
      <div className="flex items-center space-x-3">
        <img src={appLogo} alt="Logo" className=" w-25" />
{/*         <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4 md:mb-0">RangFlow</span> */}
      </div>
      
      {token && <Searchbar />}

      <div className="flex items-center space-x-2 sm:space-x-5">
        {token ? (
          <>
            <Link to="/addtask" className="hidden sm:block">
              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-purple-700 transition">
                <FaPlus />
                <span className="font-medium">Add Task</span>
              </button>
            </Link>
            <Link to="/addtask" className="sm:hidden text-gray-400 hover:text-white transition">
              <FaPlus size={24} />
            </Link>
            <button className="text-gray-400 hover:text-white transition">
              <IoNotificationsOutline size={24} />
            </button>
            <ProfileDropdown /> 
          </>
        ) : (
          <div className="flex space-x-2 sm:space-x-4">
            <Link to="/login" className="bg-purple-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-purple-700 transition">
              Login
            </Link>
            <Link to="/register" className="border border-purple-600 text-purple-600 px-3 sm:px-4 py-2 rounded-lg hover:bg-purple-50 transition">
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

