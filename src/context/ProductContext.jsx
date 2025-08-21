// src/context/ProductContext.jsx

import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { API_URL } from '../config';
import { toast } from 'react-toastify';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const { user, token } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = useCallback(async () => {
    if (!token) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/products`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, [token, user]);

  const addProduct = async (productData) => {
    if (!token) return;
    try {
      const res = await axios.post(`${API_URL}/products`, productData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts((prevProducts) => [...prevProducts, res.data]);
      toast.success("Product added successfully!");
    } catch (error) {
      toast.error("Error adding product.");
      console.error("Error adding product:", error);
      throw error;
    }
  };

 
  const deleteProduct = async (productId) => {
    if (!token) return;
    try {
      await axios.delete(`${API_URL}/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(prevProducts => prevProducts.filter(p => p._id !== productId));
      toast.success("Product deleted successfully!");
    } catch (error) {
      toast.error("Error deleting product.");
      console.error("Error deleting product:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const value = {
    products,
    loading,
    fetchProducts,
    addProduct,
    deleteProduct, 
    setProducts,
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => useContext(ProductContext);