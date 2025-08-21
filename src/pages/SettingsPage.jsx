// src/pages/SettingsPage.jsx
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useProductContext } from "../context/ProductContext";
import { useTaskContext } from "../context/TaskContext";
import { MdOutlineSecurity, MdOutlineGroup, MdOutlineAccountCircle } from "react-icons/md";
import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import ChangePasswordModal from "../components/ChangePasswordModal";
import ProfileSettings from "../components/ProfileSettings";
import TeamSettings from "../components/TeamSettings"; 

const SettingsPage = () => {
  const { user, open } = useTaskContext();
  const { products } = useProductContext();
  const { user: authUser } = useContext(AuthContext); 

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");

  if (!authUser) return <div className="text-center text-white mt-20">Loading...</div>;

  const goBack = () => navigate(-1);

  return (
    <main
      className={`pt-20 px-4 sm:px-6 transition-all duration-500 min-h-screen bg-gray-900 text-white ${
        open ? "ml-64" : "ml-20"
      }`}
    >
      <div className="bg-gray-800 rounded-2xl shadow-lg w-full max-w-4xl p-6 md:p-8 border border-gray-700 mx-auto">
        <button
          onClick={goBack}
          className="text-gray-300 hover:text-white flex items-center gap-2 mb-6 transition-colors"
        >
          <IoChevronBack size={22} />
          <span className="font-medium">Back</span>
        </button>

        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-6">Settings</h1>
        <hr className="my-6 border-gray-700" />

        <div className="flex border-b border-gray-700 mb-6">
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
              activeTab === "profile" ? "border-b-2 border-purple-500 text-purple-400" : "text-gray-400 hover:text-white"
            }`}
          >
            <MdOutlineAccountCircle size={20} className="inline-block mr-2" /> Profile
          </button>
          <button
            onClick={() => setActiveTab("team")}
            className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
              activeTab === "team" ? "border-b-2 border-purple-500 text-purple-400" : "text-gray-400 hover:text-white"
            }`}
          >
            <MdOutlineGroup size={20} className="inline-block mr-2" /> Team
          </button>
        </div>

        <div className="mt-8">
          {activeTab === "profile" && (
            <ProfileSettings authUser={authUser} />
          )}
          {activeTab === "team" && (
            <TeamSettings authUser={authUser} />
          )}
        </div>
      </div>
    </main>
  );
};

export default SettingsPage;