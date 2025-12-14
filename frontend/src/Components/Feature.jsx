import React, { useState } from "react";
import Card from "./atoms/Card";
import Button from "./atoms/Button";
import Badge from "./atoms/Badge";
import { FaCheckCircle, FaBell, FaShieldAlt, FaIndustry, FaMobileAlt, FaQrcode, FaMapMarkerAlt, FaClock, FaStar, FaDownload, FaPlay } from "react-icons/fa";
import "./Feature.css";

const features = [
  {
    icon: <FaCheckCircle />,
    image: "/token-based.png",
    title: "Token-Based Gas Request System",
    description:
      "Guarantees gas pickup within two weeks; reschedules automatically if unavailable, ensuring fair, transparent distribution.",
    badge: "Popular",
    color: "primary",
    benefits: ["2-week guarantee", "Auto-rescheduling", "Fair distribution", "Transparent system"]
  },
  {
    icon: <FaBell />,
    image: "/real-time.png",
    title: "Real-Time Delivery Notifications",
    description:
      "Sends SMS/email updates for token confirmation, delivery scheduling, and reminders, preventing missed pickups.",
    badge: "New",
    color: "success",
    benefits: ["SMS notifications", "Email updates", "Delivery reminders", "Real-time tracking"]
  },
  {
    icon: <FaShieldAlt />,
    image: "/request-limitation.png",
    title: "NIC/Phone/Email-Based Request Limitation",
    description:
      "Restricts multiple gas requests using unique identification, ensuring fair distribution and preventing overstocking.",
    badge: null,
    color: "warning",
    benefits: ["Unique ID verification", "Prevents overstocking", "Fair distribution", "Secure validation"]
  },
  {
    icon: <FaIndustry />,
    image: "/industry-service.png",
    title: "Separate Service for Businesses and Industries",
    description:
      "Offers tailored gas distribution for industries, validated by organizational certification, distinguishing residential and commercial needs effectively.",
    badge: null,
    color: "secondary",
    benefits: ["Business solutions", "Bulk ordering", "Industry validation", "Commercial support"]
  },
];

const Feature = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const mobileFeatures = [
    {
      icon: <FaQrcode />,
      title: "QR Code Scanning",
      description: "Scan gas cylinders for instant verification and tracking"
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Location Tracking",
      description: "Find nearby gas outlets and track delivery in real-time"
    },
    {
      icon: <FaClock />,
      title: "Smart Scheduling",
      description: "Schedule deliveries at your preferred time slots"
    },
    {
      icon: <FaBell />,
      title: "Push Notifications",
      description: "Get instant updates on your gas requests and deliveries"
    }
  ];

  return (
    <div className="feature-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <FaStar className="badge-icon" />
              <span>Advanced Technology Platform</span>
            </div>

            <h1 className="hero-title">
              Innovative Features for <span className="gradient-text">Modern Gas Distribution</span>
            </h1>

            <p className="hero-subtitle">
              Experience the future of gas distribution with our cutting-edge platform designed to serve Sri Lankan families with efficiency, transparency, and convenience.
            </p>

            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-icon">🚀</div>
                <div className="stat-content">
                  <div className="stat-value">99.9%</div>
                  <div className="stat-label">System Uptime</div>
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-icon">⚡</div>
                <div className="stat-content">
                  <div className="stat-value">&lt;2min</div>
                  <div className="stat-label">Response Time</div>
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-icon">🔒</div>
                <div className="stat-content">
                  <div className="stat-value">256-bit</div>
                  <div className="stat-label">SSL Encryption</div>
                </div>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="feature-showcase">
              <div className="showcase-device">
                <div className="device-screen">
                  <div className="screen-content">
                    <div className="app-header">
                      <div className="app-logo">🚚</div>
                      <div className="app-title">VayuGas</div>
                    </div>
                    <div className="app-dashboard">
                      <div className="dashboard-card active">
                        <div className="card-icon">🏠</div>
                        <div className="card-text">Home Delivery</div>
                      </div>
                      <div className="dashboard-card">
                        <div className="card-icon">📱</div>
                        <div className="card-text">Track Order</div>
                      </div>
                      <div className="dashboard-card">
                        <div className="card-icon">🛒</div>
                        <div className="card-text">New Request</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="features-section">
        <div className="feature-container">
          <div className="section-header">
            <h2 className="section-title">Powerful Features for Everyone</h2>
            <p className="section-subtitle">
              Our platform combines cutting-edge technology with user-friendly design to deliver an exceptional gas distribution experience.
            </p>
          </div>

          <div className="features-showcase">
            <div className="features-nav">
              {features.map((feature, index) => (
                <button
                  key={index}
                  className={`feature-nav-item ${activeFeature === index ? 'active' : ''}`}
                  onClick={() => setActiveFeature(index)}
                >
                  <div className="nav-icon">{feature.icon}</div>
                  <div className="nav-content">
                    <div className="nav-title">{feature.title.split(' ').slice(0, 2).join(' ')}</div>
                    {feature.badge && (
                      <Badge variant={feature.badge === "New" ? "success" : "primary"} size="xs">
                        {feature.badge}
                      </Badge>
                    )}
                  </div>
                </button>
              ))}
            </div>

            <div className="feature-detail">
              <Card className={`feature-card ${features[activeFeature].color}`} padding="xl">
                <div className="feature-header">
                  <div className="feature-icon-large">
                    {features[activeFeature].icon}
                  </div>
                  <div className="feature-meta">
                    <h3 className="feature-card-title">{features[activeFeature].title}</h3>
                    {features[activeFeature].badge && (
                      <Badge variant={features[activeFeature].badge === "New" ? "success" : "primary"} size="sm">
                        {features[activeFeature].badge}
                      </Badge>
                    )}
                  </div>
                </div>

                <p className="feature-card-description">{features[activeFeature].description}</p>

                <div className="feature-benefits">
                  <h4 className="benefits-title">Key Benefits:</h4>
                  <ul className="benefits-list">
                    {features[activeFeature].benefits.map((benefit, index) => (
                      <li key={index} className="benefit-item">
                        <FaCheckCircle className="benefit-icon" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="feature-visual">
                  <div className="feature-image-wrapper">
                    <img
                      src={features[activeFeature].image}
                      alt={features[activeFeature].title}
                      className="feature-img"
                    />
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile App Section */}
      <section className="mobile-app-section">
        <div className="feature-container">
          <div className="mobile-app-content">
            <div className="mobile-app-text">
              <div className="section-badge">
                <FaMobileAlt />
                <span>Mobile Experience</span>
              </div>

              <h2 className="mobile-app-title">
                Powerful Mobile App for <span className="gradient-text">On-the-Go</span> Management
              </h2>

              <p className="mobile-app-description">
                Take control of your gas distribution needs with our feature-rich mobile application.
                Available for both iOS and Android devices with seamless synchronization across all platforms.
              </p>

              <div className="mobile-features">
                {mobileFeatures.map((feature, index) => (
                  <div key={index} className="mobile-feature-item">
                    <div className="mobile-feature-icon">{feature.icon}</div>
                    <div className="mobile-feature-content">
                      <h4 className="mobile-feature-title">{feature.title}</h4>
                      <p className="mobile-feature-description">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="app-store-buttons">
                <Button
                  variant="outline"
                  size="lg"
                  className="app-store-button"
                  onClick={() => window.open("#", "_blank")}
                >
                  <FaDownload className="store-icon" />
                  <div className="store-content">
                    <span className="store-label">Download on the</span>
                    <span className="store-name">App Store</span>
                  </div>
                </Button>
                <Button
                  variant="primary"
                  size="lg"
                  className="app-store-button"
                  onClick={() => window.open("#", "_blank")}
                >
                  <FaDownload className="store-icon" />
                  <div className="store-content">
                    <span className="store-label">Get it on</span>
                    <span className="store-name">Google Play</span>
                  </div>
                </Button>
              </div>
            </div>

            <div className="mobile-app-visual">
              <div className="phone-mockup">
                <div className="phone-screen">
                  <div className="app-screenshot">
                    <div className="screenshot-header">
                      <div className="app-status-bar">9:41</div>
                      <div className="app-nav">
                        <div className="nav-dot active"></div>
                        <div className="nav-dot"></div>
                        <div className="nav-dot"></div>
                      </div>
                    </div>
                    <div className="app-content">
                      <div className="welcome-screen">
                        <div className="welcome-icon">🚚</div>
                        <h3>Welcome to VayuGas</h3>
                        <p>Your gas delivery partner</p>
                        <div className="welcome-progress">
                          <div className="progress-bar">
                            <div className="progress-fill"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="floating-elements">
                <div className="floating-notification">
                  <div className="notification-icon">🔔</div>
                  <div className="notification-content">
                    <div className="notification-title">Order Confirmed!</div>
                    <div className="notification-text">Your gas will be delivered within 2 weeks</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="feature-cta-section">
        <div className="feature-container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Experience the Future of Gas Distribution?</h2>
            <p className="cta-description">
              Join thousands of satisfied customers who have already switched to our modern, efficient platform.
            </p>
            <div className="cta-buttons">
              <Button variant="primary" size="lg" onClick={() => window.location.href = "/signup"}>
                Get Started Free
              </Button>
              <Button variant="outline" size="lg" onClick={() => window.location.href = "/about"}>
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Feature;
