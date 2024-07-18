import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { coreTheme } from './theme/core';
import { CLIENT_ID } from './config.js';
import AuthContextProvider from './context/AuthContext.jsx';

const theme = extendTheme({
  ...coreTheme,
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={CLIENT_ID}>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </BrowserRouter>
    </ChakraProvider>
  </GoogleOAuthProvider>
);
