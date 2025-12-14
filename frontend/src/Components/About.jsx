import React from "react";
import Card from "./Card";
import Button from "./Button";
import { FaCheckCircle, FaShieldAlt, FaRocket, FaUsers, FaAward, FaClock, FaStar, FaQuoteLeft } from "react-icons/fa";
import "./About.css";

const About = () => {
    const features = [
        {
            icon: <FaRocket />,
            title: "Lightning Fast Delivery",
            description: "Get your gas cylinder delivered within 2 weeks with our token-based system. No more waiting in long queues or dealing with shortages.",
            image: "/purchas.jpg",
            color: "primary"
        },
        {
            icon: <FaShieldAlt />,
            title: "100% Secure & Transparent",
            description: "Your personal data is completely secure. We use bank-level encryption and never store sensitive payment information.",
            image: "/Private.jpg",
            color: "success"
        },
        {
            icon: <FaUsers />,
            title: "Fair Distribution System",
            description: "Our unique token system ensures fair distribution for everyone. No favoritism, just transparent and equal opportunities.",
            image: "/transaction.jpg",
            color: "secondary"
        }
    ];

    const stats = [
        { value: "50,000+", label: "Happy Customers", icon: <FaUsers /> },
        { value: "99.9%", label: "Uptime Guarantee", icon: <FaShieldAlt /> },
        { value: "24/7", label: "Customer Support", icon: <FaClock /> },
        { value: "4.8/5", label: "Customer Rating", icon: <FaStar /> }
    ];

    const steps = [
        {
            number: 1,
            title: "Create Your Account",
            description: "Sign up with your phone number or email. It's free and takes less than 2 minutes.",
            icon: <FaUsers />
        },
        {
            number: 2,
            title: "Request Gas Token",
            description: "Submit your gas request with our easy online form. Choose your preferred delivery location and time.",
            icon: <FaCheckCircle />
        },
        {
            number: 3,
            title: "Get Delivered",
            description: "Receive your gas cylinder at your doorstep within 2 weeks. Track your order in real-time.",
            icon: <FaRocket />
        }
    ];

    const testimonials = [
        {
            name: "Priya Fernando",
            location: "Colombo",
            rating: 5,
            text: "VayuGas has completely changed how I get my gas cylinders. No more standing in queues or worrying about shortages. The 2-week guarantee is amazing!",
            avatar: "👩‍💼"
        },
        {
            name: "Rajesh Kumar",
            location: "Kandy",
            rating: 5,
            text: "The transparency and security features give me peace of mind. I can track my order and know exactly when to expect delivery.",
            avatar: "👨‍💻"
        },
        {
            name: "Amara Silva",
            location: "Galle",
            rating: 5,
            text: "As a busy mother of three, this service saves me so much time and hassle. The customer support is excellent too!",
            avatar: "👩‍👧‍👦"
        }
    ];

    return (
        <div className="about-page">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-container">
                    <div className="hero-content">
                        <div className="hero-badge">
                            <FaAward className="badge-icon" />
                            <span>#1 Gas Distribution Platform in Sri Lanka</span>
                        </div>

                        <h1 className="hero-title">
                            Revolutionizing Gas Distribution with <span className="gradient-text">Technology</span>
                        </h1>

                        <p className="hero-subtitle">
                            We're not just delivering gas – we're building a transparent, fair, and efficient system that serves every Sri Lankan family with dignity and reliability.
                        </p>

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

                    <div className="hero-visual">
                        <div className="floating-elements">
                            <div className="element-1">🚚</div>
                            <div className="element-2">🏠</div>
                            <div className="element-3">⚡</div>
                            <div className="element-4">🔒</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="about-container">
                    <div className="section-header">
                        <h2 className="section-title">Why Choose VayuGas?</h2>
                        <p className="section-subtitle">
                            Experience the future of gas distribution with our innovative platform designed for modern Sri Lankan families.
                        </p>
                    </div>

                    <div className="features-grid">
                        {features.map((feature, index) => (
                            <Card key={index} className={`feature-card ${feature.color}`} hover padding="lg">
                                <div className="feature-icon-wrapper">
                                    <div className="feature-icon">{feature.icon}</div>
                                </div>
                                <div className="feature-content">
                                    <h3 className="feature-title">{feature.title}</h3>
                                    <p className="feature-description">{feature.description}</p>
                                </div>
                                <div className="feature-visual">
                                    <div className="feature-image-placeholder">
                                        {feature.image ? (
                                            <img src={feature.image} alt={feature.title} className="feature-image" />
                                        ) : (
                                            <div className="image-placeholder">{feature.icon}</div>
                                        )}
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="how-it-works-section">
                <div className="about-container">
                    <div className="section-header">
                        <h2 className="section-title">How It Works</h2>
                        <p className="section-subtitle">
                            Getting your gas cylinder has never been easier. Follow these simple steps and enjoy hassle-free delivery.
                        </p>
                    </div>

                    <div className="steps-container">
                        <div className="steps-visual">
                            <div className="steps-illustration">
                                {steps.map((step, index) => (
                                    <div key={step.number} className={`step-visual step-${step.number}`}>
                                        <div className="step-icon">{step.icon}</div>
                                        <div className="step-number">{step.number}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="steps-content">
                            {steps.map((step) => (
                                <div key={step.number} className="step-item">
                                    <div className="step-header">
                                        <div className="step-number-badge">{step.number}</div>
                                        <h3 className="step-title">{step.title}</h3>
                                    </div>
                                    <p className="step-description">{step.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="cta-section">
                        <Button variant="primary" size="lg" onClick={() => window.location.href = "/product-list"}>
                            Start Your Order Now
                        </Button>
                        <Button variant="outline" size="lg" onClick={() => window.location.href = "/signup"}>
                            Create Free Account
                        </Button>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="testimonials-section">
                <div className="about-container">
                    <div className="section-header">
                        <h2 className="section-title">What Our Customers Say</h2>
                        <p className="section-subtitle">
                            Don't just take our word for it. Here's what thousands of satisfied customers have to say about VayuGas.
                        </p>
                    </div>

                    <div className="testimonials-grid">
                        {testimonials.map((testimonial, index) => (
                            <Card key={index} className="testimonial-card" padding="lg">
                                <div className="testimonial-header">
                                    <div className="testimonial-avatar">
                                        {testimonial.avatar}
                                    </div>
                                    <div className="testimonial-meta">
                                        <div className="testimonial-name">{testimonial.name}</div>
                                        <div className="testimonial-location">{testimonial.location}</div>
                                        <div className="testimonial-rating">
                                            {[...Array(testimonial.rating)].map((_, i) => (
                                                <FaStar key={i} className="star" />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="testimonial-content">
                                    <FaQuoteLeft className="quote-icon" />
                                    <p className="testimonial-text">{testimonial.text}</p>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="mission-section">
                <div className="about-container">
                    <div className="mission-content">
                        <div className="mission-text">
                            <h2 className="mission-title">Our Mission</h2>
                            <p className="mission-description">
                                To democratize access to essential energy resources through technology, ensuring that every Sri Lankan family has reliable access to cooking gas without discrimination or inconvenience.
                            </p>
                            <div className="mission-values">
                                <div className="value-item">
                                    <FaShieldAlt className="value-icon" />
                                    <span>Transparency</span>
                                </div>
                                <div className="value-item">
                                    <FaUsers className="value-icon" />
                                    <span>Equality</span>
                                </div>
                                <div className="value-item">
                                    <FaRocket className="value-icon" />
                                    <span>Innovation</span>
                                </div>
                            </div>
                        </div>
                        <div className="mission-visual">
                            <div className="mission-illustration">
                                <div className="illustration-element">🌟</div>
                                <div className="illustration-element">🎯</div>
                                <div className="illustration-element">💡</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
