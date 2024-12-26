import React from "react";
import "../Style/Pages/Home.css";
import { useNavigate } from 'react-router-dom';
import logo from "../images/logo.png"; 
import additionalImage from "../images/image1.svg"; 
import mobileImage1 from "../images/mobile1.svg"; 
import mobileImage2 from "../images/mobile2.svg";
import mobileImage3 from "../images/mobile3.svg";
import mobileImage4 from "../images/mobile4.svg";

const HomePage = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/login');
  };
  return (
    <div className="homepage">
      <div className="content">
        <div className="header">
          <img src={logo} alt="Logo" className="logo" />
          <div className="header-info">
            <p className="tag">Task Management</p>
            <span className="freebie">Easy to Report</span>
          </div>
        </div>
        <img src={additionalImage} alt="Additional" className="additional-image" />
        <h1 className="title">
          Task Management <br /> Appication
        </h1>
        <button className="hbtn" onClick={handleButtonClick}>Let's Go!</button>
      </div>
      <div className="mobile-images">
        <img src={mobileImage1} alt="Mobile 1" />
        <img src={mobileImage2} alt="Mobile 2" />
        <img src={mobileImage3} alt="Mobile 3" />
        <img src={mobileImage4} alt="Mobile 4" />
      </div>
    </div>
  );
};

export default HomePage;
