import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { TodoContextProvider } from './context';

// Import createRoot from react-dom/client
import { createRoot } from 'react-dom/client';

// Get the root element
const root = document.getElementById('root');

// Use createRoot instead of ReactDOM.createRoot
const rootInstance = createRoot(root);

// Render your app inside createRoot
rootInstance.render(
  <React.StrictMode>
    <TodoContextProvider>
      <App />
    </TodoContextProvider>
  </React.StrictMode>
);
