import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { RequestsProvider } from './context/RequestsContext';
import App from './App';
import './styles.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <RequestsProvider>
        <App />
      </RequestsProvider>
    </HashRouter>
  </React.StrictMode>,
);
