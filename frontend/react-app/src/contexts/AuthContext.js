import React, { createContext, useEffect, useState } from 'react';
import { getProfile } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const fetchProfile = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const res = await getProfile(token);
      setUser(res.data);
    } catch (err) {
      console.error('Failed to fetch profile:', err);
      localStorage.removeItem('token');
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
