// src/components/Sidebar.jsx

import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import app_logo from "../assets/app_logo.png";
import { useTaskContext } from "../context/TaskContext";
import { useAuth } from "../context/AuthContext";
import { MdMenuOpen, MdOutlineAddTask, MdDashboard } from "react-icons/md";
import { IoLogoBuffer } from "react-icons/io5";
import { FaProductHunt, FaTasks } from "react-icons/fa";
import { TbReportSearch } from "react-icons/tb";
import { CiSettings } from "react-icons/ci";
import { FcAbout } from "react-icons/fc";
import { MdOutlineNoteAdd } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa"; 
import { MdOutlinePendingActions } from "react-icons/md";

export default function Sidebar() {
  const { open, setOpen } = useTaskContext();
  const { user } = useAuth();
  const location = useLocation();

  const getMenuItems = () => {
    let items = [];

    if (user?.team) {
      items.push({
        icon: <FaUsers size={22} />,
        label: "Team Dashboard",
        to: "/team-dashboard",
      });
    }

    if (user?.team) {
      items.push({
        icon: <MdOutlinePendingActions size={22} />,
        label: "Task Pool",
        to: "/panding-tasks",
      });
    }

    items.push({ icon: <FaUserCircle size={22} />, label: "My Tasks", to: "/my-tasks" });

    items.push(
      { icon: <MdDashboard size={22} />, label: "Dashboard", to: "/dashboard" },
      { icon: <MdOutlineAddTask size={22} />, label: "Add Task", to: "/addtask" },
      { icon: <FaProductHunt size={22} />, label: "Products", to: "/products" },
    );
    
    
    if (user?.role === 'Individual' || user?.role === 'Owner' || user?.role === 'Admin') {
      items.push({ icon: <MdOutlineNoteAdd size={22} />, label: "Add Product", to: "/addproduct" });
    }

    items.push(
      { icon: <IoLogoBuffer size={22} />, label: "Log", to: "/log" },
      { icon: <TbReportSearch size={22} />, label: "Report", to: "/report" },
      { icon: <CiSettings size={22} />, label: "Settings", to: "/settings" },
      // { icon: <FcAbout size={22} />, label: "About Us", to: "/aboutus" }
    );
    return items;
  };

  const menuItems = getMenuItems();

  return (
    <nav
      className={`fixed left-0 top-0 h-screen bg-gray-800 shadow-xl flex flex-col transition-all duration-500 ease-in-out
        ${open ? "w-64" : "w-20"}`}
      style={{
        zIndex: 100,
      }}
    >
      <div className="flex items-center justify-between h-16 px-4">
        <img
          src={app_logo}
          alt="Logo"
        
          className={`rounded-md transition-all duration-300 
            ${open ? "w-15 opacity-100" : "w-0 opacity-0"}`}
        />
        <MdMenuOpen
          size={28}
          className={`cursor-pointer text-gray-400 transition-transform duration-300 ${!open ? "rotate-180" : ""}`}
          onClick={() => setOpen(!open)}
        />
      </div>

      <ul className="mt-4">
        {menuItems.map((item, index) => (
          <li key={index} className="relative group">
            <Link
              to={item.to}
              className={`flex items-center gap-4 px-4 py-3 my-1 rounded-md transition-colors duration-300
                ${location.pathname === item.to
                  ? "bg-purple-600 text-white shadow-lg"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
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
                className="absolute left-full top-1/2 -translate-y-1/2 bg-gray-700 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap ml-2 z-50"
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ul>
      <div className="px-4 py-4 mt-auto">
      </div>
    </nav>
  );
}