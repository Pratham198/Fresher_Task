import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/login');
  };

  return (
    <div className="home">
      <h1>Welcome to the Home Page</h1>
      <button onClick={handleButtonClick}>Go to Login</button>
    </div>
  );
};

export default Home;
