import React, { useContext, useEffect } from "react";
import { useTaskContext } from "../context/TaskContext"; 
import { useProductContext } from "../context/ProductContext"; 
import moment from "moment"; 
import { useTaskContext as useSidebarTaskContext } from '../context/TaskContext'; 

export default function Report() {
  const { tasks, fetchTasks } = useTaskContext(); 
  const { products, fetchProducts } = useProductContext(); 
  const { open } = useSidebarTaskContext();
  useEffect(() => {
    fetchTasks();
    fetchProducts(); 
  }, [fetchTasks, fetchProducts]);

  const now = moment();
  const completedTasks = tasks.filter(task => task.category === "Done").length;
  const pendingTasks = tasks.filter(task => task.category !== "Done").length;
  const overdueTasks = tasks.filter(task => 
    task.dueDate && task.category !== "Done" && moment(task.dueDate).isBefore(now)
  ).length;

  const totalTasks = tasks.length;
  const completionPercent = totalTasks > 0 ? ((completedTasks / totalTasks) * 100).toFixed(1) : 0;


  const totalProducts = products.length;
  const completedProducts = products.filter(p => p.status === "Completed").length;
  const activeProducts = products.filter(p => p.status === "Active").length;
  const planningProducts = products.filter(p => p.status === "Planning").length;

  return (
    <div className={`pt-20 px-4 sm:px-6 transition-all duration-500 min-h-screen bg-gray-900 text-white
          ${open ? 'ml-64' : 'ml-20'}`}>
      <h1 className="text-4xl font-bold mb-8 text-center text-purple-400">Reports & Analytics</h1>
      
     
      <h2 className="text-2xl font-bold mb-4">Task Overview</h2>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-6 mb-8">
        <div className="flex justify-between">
          <span>Total Tasks:</span>
          <span>{totalTasks}</span>
        </div>
        <div className="flex justify-between">
          <span>Completed Tasks:</span>
          <span>{completedTasks}</span>
        </div>
        <div className="flex justify-between">
          <span>Pending Tasks:</span>
          <span>{pendingTasks}</span>
        </div>
        <div className="flex justify-between">
          <span>Overdue Tasks:</span>
          <span>{overdueTasks}</span>
        </div>

        <div>
          <label className="block mb-2 font-semibold">Completion Percentage</label>
          <div className="w-full bg-gray-700 rounded h-6 overflow-hidden">
            <div
              className="bg-purple-600 h-6 transition-all duration-500"
              style={{ width: `${completionPercent}%` }}
            />
          </div>
          <p className="text-right mt-1 text-gray-300 font-medium">{completionPercent}%</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-4">Product Overview</h2>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-6">
        <div className="flex justify-between">
          <span>Total Projects:</span>
          <span>{totalProducts}</span>
        </div>
        <div className="flex justify-between">
          <span>Completed Projects:</span>
          <span>{completedProducts}</span>
        </div>
        <div className="flex justify-between">
          <span>Active Projects:</span>
          <span>{activeProducts}</span>
        </div>
        <div className="flex justify-between">
          <span>Projects in Planning:</span>
          <span>{planningProducts}</span>
        </div>
      </div>
    </div>
  );
}