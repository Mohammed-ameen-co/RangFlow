// src/components/TeamView.jsx
import React from "react";
import { FaUsers, FaPlus, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { leaveTeam, deleteTeam } from "../services/userService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; 

const TeamView = ({ user }) => {
  const navigate = useNavigate();
  const { fetchUserProfile } = useAuth();
  const team = user.team;

  const handleCopyInviteCode = () => {
    navigator.clipboard.writeText(team?.inviteCode);
    toast.success("Invitation code copied to clipboard!");
  };

  const handleLeaveTeam = async () => {
    if (window.confirm("Are you sure you want to leave the team?")) {
      try {
        await leaveTeam(); 
        toast.success("Successfully left the team.");
        await fetchUserProfile(); 
        navigate("/dashboard");
      } catch (error) {
        toast.error(error.response?.data?.message || "Error leaving team.");
        console.error("Error leaving team:", error);
      }
    }
  };

  const handleDeleteTeam = async () => {
    if (window.confirm("Are you sure you want to delete the team? This action is irreversible.")) {
      try {
        await deleteTeam(user.team?._id);
        toast.success("Team deleted successfully.");
        await fetchUserProfile();
        navigate("/dashboard");
      } catch (error) {
        toast.error(error.response?.data?.message || "Error deleting team.");
        console.error("Error deleting team:", error);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="p-4 bg-gray-700 rounded-lg">
        <h3 className="text-lg font-semibold">Team Information</h3>
        <p className="text-gray-400 text-sm">Team Name: <span className="text-white font-medium">{team?.name || 'N/A'}</span></p>
        <p className="text-gray-400 text-sm">
          Team Owner: <span className="text-white font-medium">
            {team?.owner?.toString() === user.id?.toString() ? "You" : team?.members?.find(member => member._id?.toString() === team.owner?.toString())?.name || 'N/A'}
          </span>
        </p>
      </div>

      {(user.role === 'Owner' || user.role === 'Admin') && (
        <div className="flex items-center space-x-4 p-4 bg-gray-700 rounded-lg">
          <FaPlus size={24} className="text-green-400" />
          <div>
            <h3 className="text-lg font-semibold">Invite Members</h3>
            <p className="text-gray-400 text-sm">Share this code to invite new members to your team.</p>
          </div>
          <button onClick={handleCopyInviteCode} className="ml-auto px-4 py-2 bg-green-600 rounded-lg font-semibold hover:bg-green-700 transition">
            Copy Code
          </button>
        </div>
      )}

      <div className="p-4 bg-gray-700 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Team Members</h3>
        <ul className="space-y-2">
          {team?.members?.map(member => (
            <li key={member._id} className="flex justify-between items-center py-2 px-4 bg-gray-800 rounded-lg">
              <span className="text-white font-medium">{member.name}</span>
              <span className="text-sm text-gray-400">({member.role})</span>
            </li>
          ))}
        </ul>
      </div>

      {user.role !== 'Owner' && (
        <div className="flex items-center space-x-4 p-4 bg-gray-700 rounded-lg">
          <FaTrash size={24} className="text-red-400" />
          <div>
            <h3 className="text-lg font-semibold">Leave Team</h3>
            <p className="text-gray-400 text-sm">Leave the current team permanently.</p>
          </div>
          <button onClick={handleLeaveTeam} className="ml-auto px-4 py-2 bg-red-600 rounded-lg font-semibold hover:bg-red-700 transition">
            Leave
          </button>
        </div>
      )}
      {user.role === 'Owner' && (
        <div className="flex items-center space-x-4 p-4 bg-gray-700 rounded-lg">
          <FaTrash size={24} className="text-red-400" />
          <div>
            <h3 className="text-lg font-semibold">Delete Team</h3>
            <p className="text-gray-400 text-sm">Permanently delete the team. This action cannot be undone.</p>
          </div>
          <button onClick={handleDeleteTeam} className="ml-auto px-4 py-2 bg-red-600 rounded-lg font-semibold hover:bg-red-700 transition">
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default TeamView;