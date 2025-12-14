import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { FaGasPump, FaShieldAlt, FaClock, FaStar } from "react-icons/fa";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();

  const stats = [
    { icon: <FaGasPump />, value: "50K+", label: "Gas Cylinders Delivered" },
    { icon: <FaShieldAlt />, value: "99.9%", label: "Safety Rating" },
    { icon: <FaClock />, value: "24/7", label: "Customer Support" },
    { icon: <FaStar />, value: "4.8/5", label: "Customer Rating" }
  ];

  return (
    <header className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-text">🚀 Trusted by 10,000+ Families</span>
          </div>

          <h1 className="hero-title animate-slideInUp">
            Revolutionizing <span className="gradient-text">Gas Distribution</span> in Sri Lanka
          </h1>

          <p className="hero-subtitle animate-slideInUp">
            Experience hassle-free gas delivery with our token-based system. Get your gas cylinder within 2 weeks with real-time tracking, secure payments, and 24/7 support.
          </p>

          <div className="hero-features animate-slideInUp">
            <div className="feature-item">
              <FaShieldAlt className="feature-icon" />
              <span>100% Secure & Transparent</span>
            </div>
            <div className="feature-item">
              <FaClock className="feature-icon" />
              <span>Guaranteed 2-Week Delivery</span>
            </div>
            <div className="feature-item">
              <FaGasPump className="feature-icon" />
              <span>Premium Quality Gas</span>
            </div>
          </div>

          <div className="hero-buttons animate-slideInUp">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate("/product-list")}
            >
              Order Gas Now
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate("/about")}
            >
              How It Works
            </Button>
          </div>

          <div className="hero-stats">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-content">
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-image animate-fadeIn">
          <div className="hero-illustration">
            <div className="floating-card card-1">
              <div className="card-icon">🏠</div>
              <div className="card-text">Home Delivery</div>
            </div>
            <div className="floating-card card-2">
              <div className="card-icon">📱</div>
              <div className="card-text">Mobile App</div>
            </div>
            <div className="floating-card card-3">
              <div className="card-icon">🔒</div>
              <div className="card-text">Secure Payment</div>
            </div>
            <div className="floating-card card-4">
              <div className="card-icon">⚡</div>
              <div className="card-text">Instant Booking</div>
            </div>

            <div className="illustration-circle"></div>
            <div className="illustration-circle-2"></div>
            <div className="illustration-circle-3"></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
