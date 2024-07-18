import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import axios from 'axios';

const backendUrl = API_BASE_URL;
axios.defaults.baseURL = backendUrl;

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const tokenData = localStorage.getItem('token');
  const [token, setToken] = useState(tokenData);

  const navigate = useNavigate();

  useEffect(() => {
    setToken(tokenData);
  }, [tokenData]);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    localStorage.removeItem('verified');

    setToken('');
    navigate('/login');
  };

  const value = { token, logout, setToken, backendUrl };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
