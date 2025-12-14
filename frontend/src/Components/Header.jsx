import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title animate-slideInUp">
            Welcome to <span className="gradient-text">VayuGas</span>
          </h1>
          <p className="hero-subtitle animate-slideInUp">
            Your trusted partner for seamless gas distribution and management
          </p>
          <div className="hero-buttons animate-slideInUp">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate("/products")}
            >
              Order Now
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate("/about")}
            >
              Learn More
            </Button>
          </div>
        </div>
        <div className="hero-image animate-fadeIn">
          <div className="hero-illustration">
            <div className="illustration-circle"></div>
            <div className="illustration-circle-2"></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
