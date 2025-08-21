// src/pages/Products.jsx

import React from "react";
import { useProductContext } from "../context/ProductContext";
import { useTaskContext as useSidebarTaskContext } from '../context/TaskContext'; 
import { useAuth } from "../context/AuthContext"; 
import { FaTrash } from "react-icons/fa"; 

export default function Products() {
  const { products, deleteProduct } = useProductContext(); 
  const { user } = useAuth(); 
  const { open } = useSidebarTaskContext();
  
  const handleDelete = (productId, createdBy) => {
    if (user && user._id === createdBy) {
      if (window.confirm("Are you sure you want to delete this product?")) {
        deleteProduct(productId);
      }
    } else {
      console.log("You are not authorized to delete this product.");
    }
  };

  return (
    <div
      className={`pt-20 px-4 sm:px-6 transition-all duration-500 min-h-screen bg-gray-900 text-white
        ${open ? 'ml-64' : 'ml-20'}`}
    >
      {/* Title */}
      <h1 className="text-2xl sm:text-3xl font-extrabold mb-8 tracking-wide">
        Products
      </h1>

      {/* Products Grid */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="relative bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border border-transparent hover:border-indigo-500"
            >
              {user && product.createdBy === user._id && (
                <button
                  onClick={() => handleDelete(product._id, product.createdBy)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition-colors"
                  aria-label="Delete product"
                >
                  <FaTrash size={20} />
                </button>
              )}

              {/* Product Name */}
              <h2 className="text-lg sm:text-xl font-semibold mb-2 line-clamp-1">
                {product.name}
              </h2>

              {/* Description */}
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                {product.description || "No description available"}
              </p>

              {/* Footer */}
              <div className="flex justify-between items-center text-xs sm:text-sm text-gray-300">
                <span>
                  Status:{" "}
                  <span
                    className={`font-medium ${
                      product.status === "Active"
                        ? "text-green-400"
                        : "text-yellow-400"
                    }`}
                  >
                    {product.status}
                  </span>
                </span>
                <span>
                  Tasks:{" "}
                  <span className="font-medium text-indigo-400">
                    {product.tasksCount}
                  </span>
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center col-span-full">
            No products to display.
          </p>
        )}
      </div>
    </div>
  );
}