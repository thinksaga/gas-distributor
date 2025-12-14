import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaYoutube } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-content">
          {/* Logo and Description */}
          <div className="footer-brand">
            <h3 className="footer-logo">VayuGas</h3>
            <p className="footer-description">
              Smart gas distribution and delivery system for Sri Lanka
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-links">
            <a href="/about" className="footer-link">About</a>
            <a href="/features" className="footer-link">Features</a>
            <a href="/support" className="footer-link">Support</a>
            <a href="/career" className="footer-link">Careers</a>
            <a href="/blog" className="footer-link">Blog</a>
          </div>

          {/* Social Icons */}
          <div className="footer-social">
            <a href="#" className="social-icon" aria-label="Facebook">
              <FaFacebook />
            </a>
            <a href="#" className="social-icon" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="#" className="social-icon" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="#" className="social-icon" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
            <a href="#" className="social-icon" aria-label="YouTube">
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p className="copyright">© 2025 VayuGas. All Rights Reserved.</p>
          <div className="footer-legal">
            <a href="#" className="legal-link">Privacy Policy</a>
            <span className="divider">•</span>
            <a href="#" className="legal-link">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
