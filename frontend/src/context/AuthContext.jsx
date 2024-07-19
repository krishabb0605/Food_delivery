import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import axios from 'axios';

const backendUrl = API_BASE_URL;
axios.defaults.baseURL = backendUrl;

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const userJsonData = localStorage.getItem('user');

  const [token, setToken] = useState(JSON.parse(userJsonData)?.token);
  const [userData, setUserData] = useState(JSON.parse(userJsonData));
  const [role, setRole] = useState(JSON.parse(userJsonData)?.role);
  const navigate = useNavigate();

  useEffect(() => {
    if (userJsonData) {
      setUserData(JSON.parse(userJsonData));
      setToken(JSON.parse(userJsonData).token);
    }
  }, [userJsonData]);

  const logout = () => {
    localStorage.removeItem('user');

    setToken('');
    navigate('/login');
  };

  const value = {
    token,
    backendUrl,
    userData,
    role,
    setRole,
    logout,
    setToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
