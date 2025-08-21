// src/components/TaskEditForm.jsx
import React, { useState, useEffect } from 'react';
import { useProductContext } from '../context/ProductContext';
import { toast } from 'react-toastify';

export default function TaskEditForm({ task, onUpdate, onClose }) {
  const [formData, setFormData] = useState({
    _id: '',
    taskname: '',
    description: '',
    dueDate: '',
    category: '',
  });
  const { products } = useProductContext();

  useEffect(() => {
    if (task) {
      setFormData({
        _id: task._id,
        taskname: task.taskname || '',
        description: task.description || '',
        dueDate: task.dueDate ? task.dueDate.split('T')[0] : '', 
        category: task.category || '',
      });
    }
  }, [task]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.taskname || !formData.description || !formData.category || !formData.dueDate) {
      toast.error("All fields are required.");
      return;
    }
    onUpdate(formData);
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-white">Edit Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-400">Task Name</label>
            <input
              type="text"
              name="taskname"
              value={formData.taskname}
              onChange={handleChange}
              className="w-full mt-1 p-2 rounded bg-gray-700 text-white border border-gray-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full mt-1 p-2 rounded bg-gray-700 text-white border border-gray-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full mt-1 p-2 rounded bg-gray-700 text-white border border-gray-600"
            >
              <option value="">Select Category</option>
              <option value="Todo">Todo</option>
              <option value="InProgress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>
          <div className="mb-6">
            <label className="block text-gray-400">Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="w-full mt-1 p-2 rounded bg-gray-700 text-white border border-gray-600"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-600 text-white hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700"
            >
              Update Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}