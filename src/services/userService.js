// src/services/userService.js

import axios from 'axios';
import { API_URL } from '../config';

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export const uploadProfileImage = async (file) => {
  const formData = new FormData();
  formData.append("profileImage", file);

  try {
    const res = await api.put("/auth/profile-image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    console.error('Error uploading profile image:', error);
    throw error.response?.data || error;
  }
};


export const updateUserProfile = async (userData) => {
  try {
    const response = await api.put('/auth/profile', userData);
    return response.data;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error.response?.data || error;
  }
};


export const updateUserPassword = async (passwords) => {
  try {
    const response = await api.put('/auth/password', passwords);
    return response.data;
  } catch (error) {
    console.error('Error changing password:', error);
    throw error.response?.data || error;
  }
};


export const deleteUserAccount = async (password) => {
  try {
    const response = await api.delete('/auth/me', { data: { password } }); 
    return response.data;
  } catch (error) {
    console.error('Error deleting account:', error);
    throw error.response?.data || error;
  }
};

export const deleteTeam = async (teamId) => {
  try {
    
    const response = await api.delete(`/teams/${teamId}`); 
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};


export const leaveTeam = async () => {
  try {
    
    const response = await api.post('/teams/leave-team'); 
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const createTeam = async (teamName) => {
  try {
    const response = await api.post('/teams/create', { name: teamName });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};