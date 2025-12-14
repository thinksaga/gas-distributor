import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaYoutube, FaPaperPlane, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import Button from "./Button";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Newsletter Section */}
        <div className="footer-newsletter">
          <div className="newsletter-content">
            <h3 className="newsletter-title">Subscribe to our newsletter</h3>
            <p className="newsletter-desc">Stay updated with the latest news, gas prices, and safety tips.</p>
          </div>
          <div className="newsletter-form">
            <div className="input-group">
              <input type="email" placeholder="Enter your email address" />
              <Button variant="primary">Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="footer-main">
          {/* Brand Section */}
          <div className="footer-column brand-column">
            <div className="footer-brand">
              <div className="footer-logo-wrapper">
                <span className="logo-icon">🔥</span>
                <h3 className="footer-logo">VayuGas</h3>
              </div>
              <p className="footer-description">
                Sri Lanka's most trusted smart gas distribution platform. 
                Ensuring safe, reliable, and efficient energy delivery for every household.
              </p>
              <div className="footer-social">
                <a href="#" className="social-icon" aria-label="Facebook"><FaFacebook /></a>
                <a href="#" className="social-icon" aria-label="Instagram"><FaInstagram /></a>
                <a href="#" className="social-icon" aria-label="Twitter"><FaTwitter /></a>
                <a href="#" className="social-icon" aria-label="LinkedIn"><FaLinkedin /></a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-column">
            <h4 className="footer-heading">Company</h4>
            <ul className="footer-links">
              <li><Link to="/">About Us</Link></li>
              <li><Link to="/">Our Features</Link></li>
              <li><Link to="/career">Careers</Link></li>
              <li><Link to="/blog">News & Blog</Link></li>
              <li><Link to="/">Partners</Link></li>
            </ul>
          </div>

          {/* Support Links */}
          <div className="footer-column">
            <h4 className="footer-heading">Support</h4>
            <ul className="footer-links">
              <li><Link to="/">Help Center</Link></li>
              <li><Link to="/">FAQs</Link></li>
              <li><Link to="/">Safety Guidelines</Link></li>
              <li><Link to="/">Track Order</Link></li>
              <li><Link to="/">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-column contact-column">
            <h4 className="footer-heading">Contact Us</h4>
            <ul className="contact-list">
              <li className="contact-item">
                <FaPhone className="contact-icon" />
                <span>+94 71 234 5678</span>
              </li>
              <li className="contact-item">
                <FaEnvelope className="contact-icon" />
                <span>support@gasbygas.com</span>
              </li>
              <li className="contact-item">
                <FaMapMarkerAlt className="contact-icon" />
                <span>123, Galle Road, Colombo 03, Sri Lanka</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="copyright">
            <p>© 2025 VayuGas. All Rights Reserved.</p>
          </div>
          <div className="footer-legal">
            <Link to="/">Privacy Policy</Link>
            <Link to="/">Terms of Service</Link>
            <Link to="/">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
