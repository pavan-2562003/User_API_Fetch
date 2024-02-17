import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import UserListPage from './UserListPage';
import reportWebVitals from './reportWebVitals';
import "./UserListPage.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
 <UserListPage />
  </React.StrictMode>
);

reportWebVitals();
