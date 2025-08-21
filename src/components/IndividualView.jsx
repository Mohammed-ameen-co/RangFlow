// src/components/IndividualView.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaPlusCircle } from "react-icons/fa";

const IndividualView = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 p-4 bg-gray-700 rounded-lg">
        <FaPlusCircle size={24} className="text-blue-400" />
        <div>
          <h3 className="text-lg font-semibold">Create a Team</h3>
          <p className="text-gray-400 text-sm">Start a new team to collaborate with others.</p>
        </div>
        <button
          onClick={() => navigate('/create-team')}
          className="ml-auto px-4 py-2 bg-blue-600 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Create Team
        </button>
      </div>
    </div>
  );
};

export default IndividualView;