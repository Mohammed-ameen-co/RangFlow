import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProductContext } from "../context/ProductContext";
import { useTaskContext as useSidebarTaskContext } from '../context/TaskContext'; 

export default function AddProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [totalTasks, setTotalTasks] = useState("");
  const { addProduct } = useProductContext();
   const { open } = useSidebarTaskContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addProduct({
        name,
        description,
        totalTasks: parseInt(totalTasks, 10),
      });
      navigate("/dashboard");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className={`pt-20 px-4 sm:px-6 transition-all duration-500 min-h-screen bg-gray-900 text-white
          ${open ? 'ml-64' : 'ml-20'}`}>
      {/* lg:pl-72 = Sidebar space adjust */}
      {/* pt-24 = Navbar ke neeche space */}

      <div className="max-w-3xl mx-auto bg-gray-800 p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold mb-8 text-purple-400">
          ➕ Add New Product
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-gray-300 font-medium mb-2"
            >
              Product Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-gray-300 font-medium mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              rows="4"
              required
            ></textarea>
          </div>

          {/* Total Tasks */}
          <div>
            <label
              htmlFor="totalTasks"
              className="block text-gray-300 font-medium mb-2"
            >
              Total Tasks
            </label>
            <input
              type="number"
              id="totalTasks"
              value={totalTasks}
              onChange={(e) => setTotalTasks(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              min="1"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition-colors duration-300"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}
