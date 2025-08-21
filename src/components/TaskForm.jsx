// src/components/TaskForm.jsx (Updated Code)

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTaskContext } from "../context/TaskContext"; 
import { useNavigate } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
import { useProductContext } from "../context/ProductContext";
import { useAuth } from "../context/AuthContext";

const TaskForm = () => {
  const { addTask, open} = useTaskContext(); 
  const { products, fetchProducts } = useProductContext();
  const { user } = useAuth();
  const { handleSubmit, reset, register } = useForm();
  const navigate = useNavigate();

  const [selectedProduct, setSelectedProduct] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const availableProducts = products.filter((p) => p.status !== "Completed");
    if (availableProducts.length > 0 && !selectedProduct) {
      setSelectedProduct(availableProducts[0]._id);
    }
  }, [products, selectedProduct]);

  const goBack = () => navigate(-1);

  const onSubmit = async (data) => {
    const taskData = {
      ...data,
      product: selectedProduct,
      category: "Panding",
    };

    try {
      await addTask(taskData);
      reset();
      navigate("/dashboard");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <main
      
      className={`pt-20 px-4 sm:px-6 transition-all duration-500 min-h-screen bg-gray-900 text-white
        ${open ? 'ml-64' : 'ml-20'}`}
    >
      <div className="bg-gray-800 rounded-2xl shadow-lg w-full max-w-2xl p-6 md:p-8 border border-gray-700 mx-auto">
        <button
          onClick={goBack}
          className="text-gray-300 hover:text-white flex items-center gap-2 mb-6 transition-colors"
        >
          <IoChevronBack size={22} />
          <span className="font-medium">Back</span>
        </button>

        <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          Add New Task
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-1">
              Task Name <span className="text-red-500">*</span>
            </label>
            <input
              {...register("taskname", { required: true })}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter task name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              {...register("description", { required: true })}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter description"
              rows="4"
              required
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-1">
              Select Product <span className="text-red-500">*</span>
            </label>
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            >
              <option value="">-- Select a product --</option>
              {products
                .filter((p) => p.status !== "Completed")
                .map((product) => (
                  <option key={product._id} value={product._id}>
                    {product.name}
                  </option>
                ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-1">
                Due Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                {...register("dueDate", { required: true })}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 text-white font-semibold py-3 rounded-lg transition duration-200"
          >
            Add Task
          </button>
        </form>
      </div>
    </main>
  );
};

export default TaskForm;
