// src/pages/ProfilePage.jsx

import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useTaskContext } from "../context/TaskContext";
import { useProductContext } from "../context/ProductContext";
import { uploadProfileImage, updateUserProfile } from "../services/userService";
import { FaUserCircle, FaBuilding, FaPlusCircle, FaTasks } from "react-icons/fa";
import { MdLogout, MdEdit } from "react-icons/md";
import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { API_URL } from '../config'; // 

const ProfilePage = () => {
  const { user, token, setUser, logout } = useContext(AuthContext);
  const { open } = useTaskContext();
  const { products, fetchProducts } = useProductContext();
  
  const [loading, setLoading] = useState(false);
  const [taskCount, setTaskCount] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (user) {
      fetchProducts();
      reset({ name: user.name, email: user.email });
    }
  }, [user, reset]);

  useEffect(() => {
    const countUserTasks = async () => {
      try {
        
        const res = await fetch(`${API_URL}/tasks/my-tasks`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        setTaskCount(data.length);
      } catch (error) {
        console.error("Error fetching user tasks count:", error);
      }
    };
    if (user && token) {
      countUserTasks();
    }
  }, [user, token]);

  if (!user) return <div className="text-center text-white mt-20">Loading...</div>;

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setLoading(true);
      const data = await uploadProfileImage(file, token);
      if (data.success) {
        setUser(data.user);
        toast.success("Profile image updated successfully!");
      }
    } catch (error) {
      console.error("Image upload error", error);
      toast.error("Failed to update profile image.");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await updateUserProfile(data, token); 
      if (response.success) {
        setUser(response.user);
        setIsEditing(false);
        toast.success("Profile updated successfully!");
      } else {
        toast.error(response.message || "Failed to update profile.");
      }
    } catch (error) {
      console.error("Profile update error", error);
      toast.error("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  const userProducts = products.filter(p => p.createdBy === user._id);
  const goBack = () => navigate(-1);

  return (
    <main
      className={`pt-20 px-4 sm:px-6 transition-all duration-500 min-h-screen bg-gray-900 text-white ${
        open ? "ml-64" : "ml-20"
      }`}
    >
      <div className="bg-gray-800 rounded-2xl shadow-lg w-full max-w-2xl p-6 md:p-8 border border-gray-700 mx-auto">
        <button
          onClick={goBack}
          className="text-gray-300 hover:text-white flex items-center gap-2 mb-6 transition-colors"
        >
          <IoChevronBack size={22} />
          <span className="font-medium">Back</span>
        </button>
        
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="w-28 h-28 rounded-full bg-gray-700 overflow-hidden border-4 border-purple-500">
              {user.profileImage ? (
                <img src={user.profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <FaUserCircle size={112} className="text-gray-500" />
              )}
            </div>
            <label className="absolute bottom-0 right-0 bg-purple-600 p-1 rounded-full cursor-pointer hover:bg-purple-700">
              <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              📷
            </label>
          </div>

          {loading && <p className="mt-2 text-sm text-gray-400">Uploading...</p>}

          <h1 className="text-3xl font-bold mt-4 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            {user.name}
          </h1>
          <p className="text-gray-400 text-lg">{user.email}</p>
          <p className="text-sm font-semibold text-purple-300 mt-1">Role: {user.role}</p>
          
          <button
            onClick={() => setIsEditing(true)}
            className="mt-4 flex items-center gap-2 px-4 py-2 font-semibold text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition"
          >
            <MdEdit size={18} />
            Edit Profile
          </button>
        </div>

        <hr className="my-6 border-gray-700" />

        <div className="space-y-4">
          <div className="flex items-center gap-4 bg-gray-700 rounded-lg p-4">
            <FaBuilding size={24} className="text-purple-400" />
            <div>
              <p className="text-gray-400 text-sm">Team</p>
              <p className="text-lg font-semibold">{user.team?.name || "No Team Assigned"}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-4 bg-gray-700 rounded-lg p-4">
              <FaPlusCircle size={24} className="text-pink-400" />
              <div>
                <p className="text-gray-400 text-sm">Products Created</p>
                <p className="text-lg font-semibold">{userProducts.length}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-gray-700 rounded-lg p-4">
              <FaTasks size={24} className="text-yellow-400" />
              <div>
                <p className="text-gray-400 text-sm">Tasks Created</p>
                <p className="text-lg font-semibold">{taskCount}</p>
              </div>
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-700" />

        <div className="flex justify-end">
          <button
            onClick={logout}
            className="flex items-center gap-2 px-6 py-3 font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition"
          >
            <MdLogout size={20} />
            Logout
          </button>
        </div>
      </div>
      
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-800 rounded-2xl p-8 w-full max-w-md border border-gray-700 shadow-xl">
            <h2 className="text-2xl font-bold mb-6 text-center text-purple-400">Edit Profile</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-1">Name</label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-1">Email</label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-2 rounded-lg font-semibold text-gray-400 border border-gray-600 hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg font-semibold text-white bg-purple-600 hover:bg-purple-700 transition"
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default ProfilePage;