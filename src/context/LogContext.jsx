import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import { API_URL } from '../config';

const LogContext = createContext();

export const LogProvider = ({ children }) => {
  const { user } = useContext(AuthContext); 
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchLogs = useCallback( async () => {
    if (!user || !user.team) {
      setLogs([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/logs`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLogs(response.data);
    } catch (error) {
      console.error('Error fetching logs:', error);
      setLogs([]);
    } finally {
      setLoading(false);
    }
 },[user]);

  useEffect(() => {
    if (user) {
      fetchLogs();
    }
  }, [user,fetchLogs]);

  return (
    <LogContext.Provider value={{ logs, fetchLogs, loading }}>
      {children}
    </LogContext.Provider>
  );
};

export const useLogContext = () => useContext(LogContext);