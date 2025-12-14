import React from "react";
import Card from "./Card";
import Button from "./Button";
import { FaCheckCircle, FaShieldAlt, FaRocket } from "react-icons/fa";
import "./About.css";

const About = () => {
    const features = [
        {
            icon: <FaRocket />,
            title: "Purchase One Touch",
            description: "Get a quick overview of all your transactions in our easy-to-use VayuGas in one touch.",
            image: "/purchas.jpg"
        },
        {
            icon: <FaCheckCircle />,
            title: "Free Transactions",
            description: "Enjoy seamless transactions without any hidden fees. Our platform makes gas ordering simple and cost-effective.",
            image: "/transaction.jpg"
        },
        {
            icon: <FaShieldAlt />,
            title: "Private and Secure",
            description: "None of your personal data is ever collected or stored in our VayuGas. Your transaction history is private.",
            image: "/Private.jpg"
        }
    ];

    const steps = [
        {
            number: 1,
            title: "Create Your Account",
            description: "Signing up for your own VayuGas account is easy and free. Just connect with your phone or Gmail instantly."
        },
        {
            number: 2,
            title: "Link Your Cards",
            description: "Link your preferred credit, debit, or prepaid cards to your VayuGas account."
        },
        {
            number: 3,
            title: "All Done",
            description: "That's all done. Now you can explore any apps or websites that are our partners and make transactions with them."
        }
    ];

    return (
        <div className="about-page">
            {/* Hero Section */}
            <section className="about-hero">
                <div className="about-container">
                    <h1 className="about-title">Why Choose Us?</h1>
                    <p className="about-subtitle">
                        When life gives you more than you can handle, let VayuGas make it easier
                        with our smart gas delivery and payment system.
                    </p>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="about-container">
                    <div className="features-grid">
                        {features.map((feature, index) => (
                            <Card key={index} className="feature-card" hover padding="lg">
                                <div className="feature-icon-wrapper">
                                    <div className="feature-icon">{feature.icon}</div>
                                </div>
                                <img src={feature.image} alt={feature.title} className="feature-image" />
                                <h3 className="feature-title">{feature.title}</h3>
                                <p className="feature-description">{feature.description}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Steps Section */}
            <section className="steps-section">
                <div className="about-container">
                    <h2 className="section-title">Start Now With 3 Steps</h2>
                    <p className="section-subtitle">
                        When life gives you more than you can handle, let VayuGas make it easier
                        with our smart gas delivery and payment system.
                    </p>

                    <div className="steps-content">
                        <div className="steps-image">
                            <img src="/Home1.png" alt="Gas Delivery" />
                        </div>

                        <div className="steps-list">
                            {steps.map((step) => (
                                <div key={step.number} className="step-item">
                                    <div className="step-number">{step.number}</div>
                                    <div className="step-content">
                                        <h3 className="step-title">Step {step.number}: {step.title}</h3>
                                        <p className="step-description">{step.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="cta-section">
                        <Button variant="primary" size="lg" onClick={() => window.location.href = "/products"}>
                            Get Started Now
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
