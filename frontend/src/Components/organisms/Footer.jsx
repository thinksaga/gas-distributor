import React from 'react';
import { Text } from '../atoms';
import './Footer.module.css';

/**
 * Footer Organism - Application footer
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand Section */}
        <div className="footer-section">
          <Text variant="h6" color="primary">VayuGas</Text>
          <Text variant="body" color="secondary">
            Revolutionizing gas distribution with modern technology
          </Text>
        </div>

        {/* Links */}
        <div className="footer-section">
          <Text variant="h6">Product</Text>
          <ul className="footer-links">
            <li><a href="/#features">Features</a></li>
            <li><a href="/#pricing">Pricing</a></li>
            <li><a href="/#faq">FAQ</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <Text variant="h6">Company</Text>
          <ul className="footer-links">
            <li><a href="/about">About</a></li>
            <li><a href="/career">Career</a></li>
            <li><a href="/blog">Blog</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <Text variant="h6">Support</Text>
          <ul className="footer-links">
            <li><a href="/support">Help Center</a></li>
            <li><a href="/">Contact Us</a></li>
            <li><a href="/">Status</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="footer-bottom">
        <Text variant="caption" color="secondary">
          &copy; {currentYear} VayuGas. All rights reserved.
        </Text>
        <div className="footer-bottom-links">
          <a href="/">Privacy Policy</a>
          <a href="/">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
