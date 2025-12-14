import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "./Components/Button";
import "./Navbar.css";

const Navbar = ({ homebtn, abtBtn, febtn, supbtn }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={homebtn}>
          <span className="logo-text">VayuGas</span>
        </Link>

        <button
          className="navbar-toggle"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}></span>
        </button>

        <ul className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <li className="navbar-item">
            <button onClick={() => { homebtn(); setIsMenuOpen(false); }} className="navbar-link">
              Home
            </button>
          </li>
          <li className="navbar-item">
            <button onClick={() => { abtBtn(); setIsMenuOpen(false); }} className="navbar-link">
              About
            </button>
          </li>
          <li className="navbar-item">
            <button onClick={() => { febtn(); setIsMenuOpen(false); }} className="navbar-link">
              Features
            </button>
          </li>
          <li className="navbar-item">
            <button onClick={() => { supbtn(); setIsMenuOpen(false); }} className="navbar-link">
              Support
            </button>
          </li>
        </ul>

        <div className="navbar-auth-buttons">
          <Link to="/login">
            <Button variant="outline" size="sm">
              Sign In
            </Button>
          </Link>
          <Link to="/signup">
            <Button variant="primary" size="sm">
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
