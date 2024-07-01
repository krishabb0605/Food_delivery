import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import StoreContextProvider from './context/StoreContext.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { coreTheme } from './theme/core';

const theme = extendTheme({
  ...coreTheme,
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId='591270015150-lpmd9kesbjttdvhrt8ahtah9c90qed84.apps.googleusercontent.com'>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <StoreContextProvider>
          <App />
        </StoreContextProvider>
      </BrowserRouter>
    </ChakraProvider>
  </GoogleOAuthProvider>
);
