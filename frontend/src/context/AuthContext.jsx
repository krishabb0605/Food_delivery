import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import axios from 'axios';
import { EmailService, UserService } from '../services';
import { toast } from 'react-toastify';

const backendUrl = API_BASE_URL;
axios.defaults.baseURL = backendUrl;

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const userJsonData = localStorage.getItem('user');

  const [isFetching, setIsFetching] = useState(false);
  const [isLoginWithGoogle, setIsLoginWithGoogle] = useState(false);
  const [userData, setUserData] = useState(JSON.parse(userJsonData));

  const [token, setToken] = useState(JSON.parse(userJsonData)?.token);
  const [role, setRole] = useState(JSON.parse(userJsonData)?.role);
  const [avtar, setAvtar] = useState(JSON.parse(userJsonData)?.avtar);

  const navigate = useNavigate();

  useEffect(() => {
    if (userJsonData) {
      setUserData(JSON.parse(userJsonData));
      setToken(JSON.parse(userJsonData).token);
    }
  }, [userJsonData]);

  const handleLoginProcess = async (currRole, data) => {
    if (currRole !== 'google') {
      setIsFetching(true);
      try {
        const response = await UserService.user(currRole, data);
        if (response.data.success) {
          setToken(response.data.token);
          setRole(response.data.user.role);

          if (response.data.user.avtar) {
            handleAvtar(response.data.user.avtar);
          }

          const updatedUserData = {
            ...response.data.user,
            token: response.data.token,
          };
          setUserData(updatedUserData);

          localStorage.setItem('user', JSON.stringify(updatedUserData));
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error);
      }
      setIsFetching(false);
    } else {
      try {
        const response = await UserService.googleLogin(data);
        if (response.data.success) {
          const userData = response.data.user;
          setToken(response.data.token);
          setRole(userData.role);
          const updatedUserData = {
            ...userData,
            token: response.data.token,
          };
          localStorage.setItem('user', JSON.stringify(updatedUserData));
          navigate('/', { replace: true });
        } else {
          toast.error(response.data.message);
        }
        setIsLoginWithGoogle(false);
      } catch (error) {
        toast.error('Error while fetching data');
      }
    }
  };

  const handleSendVerificationEmail = async (userData) => {
    try {
      const response = await EmailService.sendVerificationEmail(userData);
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleAvtar = (data) => {
    setAvtar(data);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('avtar');
    setRole('user');
    setToken('');
    navigate('/');
    setAvtar(null);
    setUserData(null);
  };

  const value = {
    token,
    backendUrl,
    userData,
    role,
    setRole,
    handleLoginProcess,
    handleLogout,
    setToken,
    isFetching,
    setIsFetching,
    isLoginWithGoogle,
    setIsLoginWithGoogle,
    handleSendVerificationEmail,
    avtar,
    handleAvtar,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
