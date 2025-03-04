import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {DarkModeContextProvider} from './context/darkModeContext';
import './i18n';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <DarkModeContextProvider >
  <App />
  </DarkModeContextProvider>
  </React.StrictMode>
);

