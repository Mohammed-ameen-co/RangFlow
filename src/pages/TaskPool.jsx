// src/pages/TaskPool.jsx

import React, { useEffect, useState } from 'react';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { useTaskContext } from '../context/TaskContext';
import { Link } from 'react-router-dom';

const TaskPool = () => {
  const { user } = useAuth();
  const { open } = useTaskContext();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTeamTasks = async () => {
      if (!user?.team) return;
      setLoading(true);
      try {
        const res = await api.get(`/tasks/team-tasks/${user.team._id}`);
        setTasks(res.data);
      } catch (error) {
        toast.error("Failed to fetch tasks.");
        console.error("Error fetching team tasks:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTeamTasks();
  }, [user]);

  const assignTaskToUser = async (taskId, e) => {
    if (e) e.stopPropagation(); 
    try {
      const res = await api.post(`/tasks/${taskId}/assign`);
      toast.success("Task assigned to you successfully!");

      setTasks(prevTasks =>
        prevTasks.map(task => 
          task._id === taskId ? { ...task, assignedTo: user } : task
        )
      );
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to assign task.";
      toast.error(errorMessage);
      console.error("Error assigning task:", error);
    }
  };

  return (
    <div
      className={`pt-20 px-4 sm:px-6 transition-all duration-500 min-h-screen
        ${open ? "ml-64" : "ml-20"} bg-gray-900 text-white`}
    >
      <h1 className="text-4xl font-bold mb-8 text-center text-purple-400">Team Task Pool</h1>
      {loading ? (
        <div className="flex justify-center items-center h-[60vh] text-gray-400">
          Loading tasks...
        </div>
      ) : tasks.length === 0 ? (
        <div className="flex justify-center items-center h-[60vh]">
          <p className="text-gray-400 text-lg">No tasks found in the team pool.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tasks.map(task => (
            <Link 
                key={task._id} 
                to={`/tasks/${task._id}`} 
                className="bg-gray-800 rounded-lg shadow-lg p-5 flex flex-col justify-between border border-gray-700 hover:border-purple-600 transition h-full"
            >
              <div>
                <h3 className="text-xl font-semibold text-purple-300 mb-2">{task.taskname}</h3>
                <p className="text-gray-400 text-sm mb-2">Created by: {task.createdBy?.name || 'Unknown'}</p>
                <p className="text-gray-400 text-sm line-clamp-3">
                  {task.description || "No description provided."}
                </p>
              </div>
              <div className="mt-4">
                {task.assignedTo ? (
                  <p className="text-sm text-yellow-400">
                      Assigned to: {task.assignedTo.name}
                  </p>
                ) : (
                  <button
                    onClick={(e) => assignTaskToUser(task._id, e)}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition"
                  >
                    Assign to Me
                  </button>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskPool;