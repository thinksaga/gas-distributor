import React from "react";
import Card from "./Card";
import Button from "./Button";
import Badge from "./Badge";
import { FaCheckCircle, FaBell, FaShieldAlt, FaIndustry } from "react-icons/fa";
import "./Feature.css";

const features = [
  {
    icon: <FaCheckCircle />,
    image: "/token-based.png",
    title: "Token-Based Gas Request System",
    description:
      "Guarantees gas pickup within two weeks; reschedules automatically if unavailable, ensuring fair, transparent distribution.",
    badge: "Popular"
  },
  {
    icon: <FaBell />,
    image: "/real-time.png",
    title: "Real-Time Delivery Notifications",
    description:
      "Sends SMS/email updates for token confirmation, delivery scheduling, and reminders, preventing missed pickups.",
    badge: "New"
  },
  {
    icon: <FaShieldAlt />,
    image: "/request-limitation.png",
    title: "NIC/Phone/Email-Based Request Limitation",
    description:
      "Restricts multiple gas requests using unique identification, ensuring fair distribution and preventing overstocking.",
    badge: null
  },
  {
    icon: <FaIndustry />,
    image: "/industry-service.png",
    title: "Separate Service for Businesses and Industries",
    description:
      "Offers tailored gas distribution for industries, validated by organizational certification, distinguishing residential and commercial needs effectively.",
    badge: null
  },
];

const Feature = () => {
  return (
    <div className="feature-page">
      {/* Hero Section */}
      <section className="feature-hero">
        <div className="feature-container">
          <h1 className="feature-title">Features Just VayuGas Has</h1>
          <p className="feature-subtitle">
            When life gets overwhelming, VayuGas simplifies your needs with a smart,
            efficient gas distribution and delivery system.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="features-section">
        <div className="feature-container">
          <div className="features-grid">
            {features.map((feature, index) => (
              <Card key={index} className="feature-card" hover padding="lg">
                {feature.badge && (
                  <div className="feature-badge-wrapper">
                    <Badge variant={feature.badge === "New" ? "success" : "primary"} size="sm">
                      {feature.badge}
                    </Badge>
                  </div>
                )}
                <div className="feature-icon-circle">
                  <div className="feature-icon">{feature.icon}</div>
                </div>
                <div className="feature-image-wrapper">
                  <img src={feature.image} alt={feature.title} className="feature-img" />
                </div>
                <h3 className="feature-card-title">{feature.title}</h3>
                <p className="feature-card-description">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile App Section */}
      <section className="mobile-app-section">
        <div className="feature-container">
          <div className="mobile-app-content">
            <div className="mobile-app-image">
              <img src="/mobile_app.png" alt="VayuGas Mobile App" />
            </div>

            <div className="mobile-app-text">
              <h2 className="mobile-app-title">Use VayuGas On Mobile</h2>
              <p className="mobile-app-description">
                We support multiple platforms to provide the best experience,
                allowing you to manage gas requests effortlessly.
                VayuGas makes life easier!
              </p>

              <div className="app-store-buttons">
                <Button
                  variant="outline"
                  size="lg"
                  className="app-store-button"
                  onClick={() => window.open("#", "_blank")}
                >
                  <img src="/Apple.png" alt="Apple Store" className="store-icon" />
                  <span>Apple Store</span>
                </Button>
                <Button
                  variant="primary"
                  size="lg"
                  className="app-store-button"
                  onClick={() => window.open("#", "_blank")}
                >
                  <img src="/google-play.png" alt="Google Play" className="store-icon" />
                  <span>Google Play</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Feature;
