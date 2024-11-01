import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import reportWebVitals from './reportWebVitals';
import { ChakraProvider,extendTheme } from '@chakra-ui/react'
import { Provider } from 'react-redux';


import { store } from './redux/store';
import { AuthContext, authContext } from './contexts/AuthContext';

const theme=extendTheme()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <ChakraProvider theme={theme}>
    <Provider store={store}>
      <AuthContext>
      <App />
      </AuthContext>
    </Provider>
      // </ChakraProvider>

);

reportWebVitals();
