// src/components/ProfileDropdown.jsx
import React, { useContext, useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { getInitials } from "../utils/helperFunctions";

const ProfileDropdown = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition"
      >
        {user.profileImage ? (
          <img
            src={user.profileImage}
            alt="User"
            className="w-8 h-8 rounded-full object-cover border border-gray-500"
          />
        ) : (
          <div className="w-8 h-8 bg-purple-600 text-white flex items-center justify-center rounded-full text-sm">
            {getInitials(user.name || user.username)}
          </div>
        )}
        <span className="hidden sm:inline text-sm font-medium text-white">
          {user.name || user.username}
        </span>
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50">
          <ul className="text-sm text-gray-300">
             <Link to="/profile">
            <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
             Profile
            </li>
            </Link>
            <Link to="/settings">
            <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
              Settings
            </li>
            </Link>
            <li
              onClick={handleLogout}
              className="px-4 py-2 hover:bg-gray-700 text-red-400 hover:text-red-300 cursor-pointer"
            >
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;







