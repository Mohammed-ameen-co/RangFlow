// src/components/Searchbar.jsx

import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { API_URL } from "../config";

export default function Searchbar() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState({ tasks: [], products: [], users: [] });
  const [showResults, setShowResults] = useState(false);

  // Debounce logic
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.length > 0) {
        try {
          const res = await axios.get(`${API_URL}/search?q=${searchQuery}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setSearchResults(res.data);
          setShowResults(true);
        } catch (error) {
          console.error("Error during search:", error);
        }
      } else {
        setSearchResults({ tasks: [], products: [], users: [] });
        setShowResults(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, token]);

  const handleResultClick = (id, type) => {
    setShowResults(false);
    setSearchQuery('');
    if (type === 'task') {
      navigate(`/tasks/${id}`);
    } else if (type === 'product') {
      navigate(`/products/${id}`);
    } else if (type === 'user') {
      // User profile page will be added
    }
  };

  return (
    <div className="flex-1 max-w-lg mx-6 relative hidden md:block">
      {token && (
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full border border-gray-700 bg-gray-800 text-white rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
      )}
      
      {showResults && (
        <div className="absolute top-12 left-0 w-full bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50">
          {searchResults.tasks.length > 0 && (
            <div className="p-2 border-b border-gray-700">
              <h4 className="text-gray-400 text-xs uppercase mb-1">Tasks</h4>
              {searchResults.tasks.map((task) => (
                <button
                  key={task._id}
                  className="w-full text-left p-2 rounded-md hover:bg-gray-700 text-white transition-colors duration-200"
                  onClick={() => handleResultClick(task._id, 'task')}
                >
                  {task.taskname}
                </button>
              ))}
            </div>
          )}
          {searchResults.products.length > 0 && (
            <div className="p-2 border-b border-gray-700">
              <h4 className="text-gray-400 text-xs uppercase mb-1">Products</h4>
              {searchResults.products.map((product) => (
                <button
                  key={product._id}
                  className="w-full text-left p-2 rounded-md hover:bg-gray-700 text-white transition-colors duration-200"
                  onClick={() => handleResultClick(product._id, 'product')}
                >
                  {product.name}
                </button>
              ))}
            </div>
          )}
          {searchResults.users.length > 0 && (
            <div className="p-2">
              <h4 className="text-gray-400 text-xs uppercase mb-1">Users</h4>
              {searchResults.users.map((user) => (
                <button
                  key={user._id}
                  className="w-full text-left p-2 rounded-md hover:bg-gray-700 text-white transition-colors duration-200"
                  onClick={() => handleResultClick(user._id, 'user')}
                >
                  {user.name}
                </button>
              ))}
            </div>
          )}
          {(searchResults.tasks.length === 0 && searchResults.products.length === 0 && searchResults.users.length === 0) && (
              <div className="p-4 text-gray-400 text-center">No results found.</div>
          )}
        </div>
      )}
    </div>
  );
}