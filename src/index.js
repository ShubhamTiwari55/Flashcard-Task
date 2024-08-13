import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import axios from 'axios';

// Set the base URL globally
axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://65.0.61.24:5000';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
