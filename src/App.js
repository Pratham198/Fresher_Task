import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './Pages/Login';
import DashboardPage from './Pages/Dashboard';
import SignupPage from './Pages/SignUp';
import HomePage from './Pages/Homepage';
import PrivateRoute from '../src/Auth/PrivateRoute'; 
import Home from '../src/Pages/Home'
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<PrivateRoute element={<DashboardPage />} />} />
        {/* <Route path="/dashboard" element={<DashboardPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;