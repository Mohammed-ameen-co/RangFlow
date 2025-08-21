// src/context/TaskContext.jsx (Corrected Code)

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import { useProductContext } from "./ProductContext";
import { API_URL } from '../config';
import { toast } from 'react-toastify';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const { user, token } = useContext(AuthContext);
  const { setProducts } = useProductContext();
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [isButton, setIsButton] = useState(false);

  const fetchTasks = useCallback(async () => {
    if (!token || !user) return;
    try {
      const response = await axios.get(`${API_URL}/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data);
    } catch (error) {
      toast.error("Error fetching tasks.");
      console.error("Error fetching tasks:", error);
    }
  }, [token, user]); 

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]); 

  const addTask = async (newTaskData) => {
    try {
      const response = await axios.post(
        `${API_URL}/tasks`,
        newTaskData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      await fetchTasks();
      toast.success("Task added successfully!");
    } catch (error) {
      toast.error("Error adding task.");
      console.error("Error adding task:", error);
    }
  };

  const updateTaskStatus = async (taskId, newCategory) => {
    try {
      const response = await axios.put(
        `${API_URL}/tasks/${taskId}`,
        { category: newCategory },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const { updatedTask, updatedProduct } = response.data;
      
      setTasks(prevTasks =>
        prevTasks.map(task => (task._id === taskId ? updatedTask : task))
      );
      
      setProducts(prevProducts =>
        prevProducts.map(p => (p._id === updatedProduct._id ? updatedProduct : p))
      );
      toast.success("Task status updated!");

    } catch (error) {
      toast.error("Error updating task status.");
      console.error("Error updating task status:", error);
    }
  };
  
  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`${API_URL}/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId));
      toast.success("Task deleted successfully!");
      
    } catch (error) {
      toast.error("Error deleting task.");
      console.error("Error deleting task:", error);
    }
  };

  const value = {
    tasks,
    setTasks,
    open,
    setOpen,
    isButton,
    setIsButton,
    addTask,
    updateTaskStatus,
    fetchTasks,
    deleteTask,
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => useContext(TaskContext);