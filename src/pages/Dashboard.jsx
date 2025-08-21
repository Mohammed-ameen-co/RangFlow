// src/pages/Dashboard.jsx (Corrected Code)

import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Board from './Board';
import { useProductContext } from '../context/ProductContext';
import { useTaskContext } from '../context/TaskContext';

const Dashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { fetchProducts } = useProductContext();
  const { fetchTasks, open } = useTaskContext(); 

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      fetchProducts();
      fetchTasks();
    }
  }, [user, fetchProducts, fetchTasks]); 

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        Loading...
      </div>
    );
  }

  if (user) {
    const title =
      user.role === 'Owner' || user.role === 'Member'
        ? user.team?.name || 'Dashboard'
        : 'Dashboard';

    return (
      <div
        className={`pt-20 px-4 sm:px-6 transition-all duration-500 min-h-screen bg-gray-900 text-white overflow-hidden
          ${open ? 'ml-64' : 'ml-20'}`}
      >
        {/* Header */}
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700 mb-8">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            {title}
          </h1>
        </div>

        {/* Board */}
        <div>
          <Board />
        </div>
      </div>
    );
  }

  return null;
};

export default Dashboard;
