import React, { useState } from "react";
import { FaUserEdit, FaLock, FaTrash } from "react-icons/fa";
import ChangePasswordModal from "./ChangePasswordModal";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom"; 
import DeleteAccountModal from "./DeleteAccountModal"; 

const ProfileSettings = ({ authUser }) => {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); 
  const { logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleDeleteAccount = () => {
    setIsDeleteModalOpen(true);
  };
 const handleEditProfile = () => {
    navigate("/profile"); 
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 p-4 bg-gray-700 rounded-lg">
        <FaUserEdit size={24} className="text-purple-400" />
        <div>
          <h3 className="text-lg font-semibold">Update Profile</h3>
          <p className="text-gray-400 text-sm">Update your name, email, or profile picture.</p>
        </div>
        <button
          onClick={ handleEditProfile }
          className="ml-auto px-4 py-2 bg-purple-600 rounded-lg font-semibold hover:bg-purple-700 transition"
        >
          Edit
        </button>
      </div>

      <div className="flex items-center space-x-4 p-4 bg-gray-700 rounded-lg">
        <FaLock size={24} className="text-yellow-400" />
        <div>
          <h3 className="text-lg font-semibold">Change Password</h3>
          <p className="text-gray-400 text-sm">Update your password to keep your account secure.</p>
        </div>
        <button
          onClick={() => setIsPasswordModalOpen(true)}
          className="ml-auto px-4 py-2 bg-purple-600 rounded-lg font-semibold hover:bg-purple-700 transition"
        >
          Change
        </button>
      </div>

      <div className="flex items-center space-x-4 p-4 bg-gray-700 rounded-lg">
        <FaTrash size={24} className="text-red-400" />
        <div>
          <h3 className="text-lg font-semibold">Delete Account</h3>
          <p className="text-gray-400 text-sm">Permanently delete your account and all associated data.</p>
        </div>
        <button
          onClick={handleDeleteAccount}
          className="ml-auto px-4 py-2 bg-red-600 rounded-lg font-semibold hover:bg-red-700 transition"
        >
          Delete
        </button>
      </div>

      {isPasswordModalOpen && (
        <ChangePasswordModal onClose={() => setIsPasswordModalOpen(false)} />
      )}
      {isDeleteModalOpen && (
        <DeleteAccountModal onClose={() => setIsDeleteModalOpen(false)} />
      )}
    </div>
  );
};

export default ProfileSettings;