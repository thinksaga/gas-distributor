import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Text } from '../atoms';
import './Header.module.css';

/**
 * Header Organism - Main navigation header
 */
const Header = ({ isLoggedIn = false, onLogout }) => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigationLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Features', path: '/features' },
    { label: 'Support', path: '/support' },
  ];

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <Link to="/" className="header-logo">
          <Text variant="h5" color="primary">VayuGas</Text>
        </Link>

        {/* Navigation */}
        <nav className={`header-nav ${mobileMenuOpen ? 'open' : ''}`}>
          {navigationLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="header-nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Auth Buttons */}
        <div className="header-actions">
          {!isLoggedIn ? (
            <>
              <Button variant="outline" size="sm" onClick={() => navigate('/login')}>
                Sign In
              </Button>
              <Button variant="primary" size="sm" onClick={() => navigate('/signup')}>
                Sign Up
              </Button>
            </>
          ) : (
            <Button variant="outline" size="sm" onClick={onLogout}>
              Logout
            </Button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className={`header-mobile-toggle ${mobileMenuOpen ? 'open' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
