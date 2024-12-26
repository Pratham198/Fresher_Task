import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa'; 
import { FaCircleArrowLeft } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import '../../Style/Dashboard/Navbar.css';

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="navbar">
      <div className="navbar-title">Task Report</div>
      <div className="navbar-icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
        <FaBars />
      </div>
      {sidebarOpen && (
        <div className="sidebar">
          <div className="close-icon" onClick={() => setSidebarOpen(false)}>
          <FaCircleArrowLeft />
          </div>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
