import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import AuthContext from './context/AuthContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContext>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </AuthContext>
    </BrowserRouter>
  </React.StrictMode>
);

