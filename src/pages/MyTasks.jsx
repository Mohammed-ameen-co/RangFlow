// src/pages/MyTasks.jsx
import React, { useState, useEffect } from 'react';
import { useTaskContext } from '../context/TaskContext';
import { useAuth } from '../context/AuthContext';
import api from '../api';
import { toast } from 'react-toastify';
import TaskEditForm from '../components/TaskEditForm'; 
import { useNavigate } from "react-router-dom";


export default function MyTasks() {
  const { open } = useTaskContext();
  const { token } = useAuth();
  const [myTasks, setMyTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTask, setEditingTask] = useState(null); 
  const navigate = useNavigate();


  useEffect(() => {
    const fetchMyTasks = async () => {
      if (!token) return;
      setLoading(true);
      try {
        const response = await api.get('/tasks/my-tasks');
        setMyTasks(response.data || []);//passing empty array
      } catch (error) {
        toast.error("Failed to fetch your tasks.");
        console.error("Error fetching user tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyTasks();
  }, [token]);

  const handleDeleteTask = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await api.delete(`/tasks/${taskId}`);
        toast.success("Task deleted successfully!");
        setMyTasks(prevTasks => prevTasks.filter(task => task._id !== taskId));
      } catch (error) {
        const errorMessage = error.response?.data?.message || "Failed to delete task.";
        toast.error(errorMessage);
        console.error("Error deleting task:", error);
      }
    }
  };
  
  const handleEditClick = (task) => {
    setEditingTask(task);
  };

  const handleUpdateTask = async (updatedData) => {
    try {
      const response = await api.put(`/tasks/${updatedData._id}`, updatedData);
      setMyTasks(prevTasks =>
        prevTasks.map(task => 
          task._id === updatedData._id ? response.data.updatedTask : task
        )
      );
      setEditingTask(null); 
      toast.success("Task updated successfully!");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to update task.";
      toast.error(errorMessage);
      console.error("Error updating task:", error);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-white">Loading your tasks...</div>;
  }

 

  return (
    <div  className={`pt-20 px-4 sm:px-6 transition-all duration-500 min-h-screen bg-gray-900 text-white ${open ? 'ml-64' : 'ml-20'}`}>
      <h1 className="text-4xl font-bold mb-8 text-center text-purple-400">My Uploaded Tasks</h1>
      {editingTask && (
        <TaskEditForm 
          task={editingTask} 
          onUpdate={handleUpdateTask} 
          onClose={() => setEditingTask(null)} 
        />
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myTasks.length > 0 ? (
          myTasks.map(task => (
            <div key={task._id}  className="bg-gray-800 rounded-lg p-6 shadow-md border border-gray-700">
              <h3 className="text-xl font-semibold text-purple-300">{task.taskname}</h3> 
              <p className="text-gray-400 mt-2">{task.description}</p>
              <div className="mt-4 flex justify-end space-x-4">
                <button
                  onClick={() => handleEditClick(task)} 
                  className="px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-600 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteTask(task._id)}
                  className="px-4 py-2 bg-red-500 rounded-md hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center w-full text-gray-400">You haven't uploaded any tasks yet.</p>
        )}
      </div>
    </div>
  );
}