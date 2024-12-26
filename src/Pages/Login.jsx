
import React, { useState } from 'react';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import loader from '../images/Loaders.gif';
import '../Style/Pages/Login.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
  
    if (!validateEmail(email)) {
      toast.error('Please enter a valid email address');
      return;
    }
  
    setLoading(true);
    document.body.style.overflow = 'hidden';
  
    try {
      const response = await axios.post('http://localhost:5000/api/login', { email, password });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token); // Store the token
        toast.success(`Login successful! Welcome back.`);
        navigate('/dashboard'); // Redirect to the dashboard after successful login
      } else {
        toast.error('Login failed, no token received');
      }
    } catch (error) {
      console.error('Login failed', error);
      toast.error('Invalid email or password');
    } finally {
      setLoading(false);
      document.body.style.overflow = 'auto';
    }
  };
  

  return (
    <div className="login-container">
      <form className="login-form animated" onSubmit={handleLogin}>
        <div className="form-header">
          <h2>Welcome Back</h2>
          <p>Login to your account</p>
        </div>

        <div className="form-group">
          <div className="input-wrapper">
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <div className="password-input">
            <input
              type={passwordVisible ? 'text' : 'password'}
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span onClick={togglePasswordVisibility} className="password-toggle-icon">
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        <button type="submit" className="login-button">
          Login
          <span className="button-highlight"></span>
        </button>

        <div className="signup-link animated-delay">
          <p>Don't have an account? <Link to="/signup">Sign Up now</Link></p>
        </div>
      </form>

      {loading && (
        <div className="loader-overlay">
          <div className="loader">
            <img src={loader} alt="Loading..." />
          </div>
        </div>
      )}

      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default LoginPage;
