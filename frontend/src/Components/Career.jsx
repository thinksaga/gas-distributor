import React from "react";
import Card from "./atoms/Card";
import Button from "./atoms/Button";
import Badge from "./atoms/Badge";
import { FaBriefcase, FaUsers, FaRocket, FaHeart, FaGlobe, FaLaptopCode, FaArrowRight, FaHandshake } from "react-icons/fa";
import "./Career.css";

const Career = () => {
    const openings = [
        {
            title: "Senior Gas Distribution Manager",
            department: "Operations",
            location: "Colombo, Sri Lanka",
            type: "Full-time",
            tags: ["Management", "Logistics", "On-site"]
        },
        {
            title: "Customer Support Specialist",
            department: "Customer Service",
            location: "Remote",
            type: "Full-time",
            tags: ["Support", "Communication", "Remote"]
        },
        {
            title: "Software Engineer",
            department: "Technology",
            location: "Colombo, Sri Lanka",
            type: "Full-time",
            tags: ["React", "Node.js", "Hybrid"]
        },
        {
            title: "Marketing Manager",
            department: "Marketing",
            location: "Colombo, Sri Lanka",
            type: "Full-time",
            tags: ["Digital Marketing", "Strategy", "Hybrid"]
        }
    ];

    const benefits = [
        {
            icon: <FaBriefcase />,
            title: "Competitive Salary",
            description: "We offer industry-leading compensation packages with performance bonuses."
        },
        {
            icon: <FaUsers />,
            title: "Great Team Culture",
            description: "Work with a diverse group of talented and passionate individuals."
        },
        {
            icon: <FaRocket />,
            title: "Career Growth",
            description: "Continuous learning opportunities and clear career progression paths."
        },
        {
            icon: <FaHeart />,
            title: "Health & Wellness",
            description: "Comprehensive health insurance and wellness programs for you and your family."
        },
        {
            icon: <FaGlobe />,
            title: "Remote Options",
            description: "Flexible working hours and remote work options for better work-life balance."
        },
        {
            icon: <FaLaptopCode />,
            title: "Latest Tech",
            description: "We provide top-tier equipment and tools to help you do your best work."
        }
    ];

    const values = [
        {
            icon: <FaHandshake />,
            title: "Trust & Integrity",
            text: "We build trust through transparency and honest actions."
        },
        {
            icon: <FaUsers />,
            title: "Customer First",
            text: "Our customers are at the heart of every decision we make."
        },
        {
            icon: <FaRocket />,
            title: "Innovation",
            text: "We constantly push boundaries to improve our services."
        }
    ];

    return (
        <div className="career-page">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-container">
                    <div className="hero-content">
                        <div className="hero-badge">
                            <FaRocket className="badge-icon" />
                            <span>We are hiring!</span>
                        </div>
                        <h1 className="hero-title">
                            Build the Future of <span className="gradient-text">Energy Distribution</span>
                        </h1>
                        <p className="hero-subtitle">
                            Join VayuGas and be part of a mission to revolutionize how energy is delivered to millions of households in Sri Lanka.
                        </p>
                        <div className="hero-cta">
                            <Button variant="primary" size="lg" onClick={() => document.getElementById('openings').scrollIntoView({ behavior: 'smooth' })}>
                                View Open Positions
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="values-section">
                <div className="career-container">
                    <div className="section-header">
                        <h2 className="section-title">Our Core Values</h2>
                        <p className="section-subtitle">The principles that guide everything we do</p>
                    </div>
                    <div className="values-grid">
                        {values.map((value, index) => (
                            <div key={index} className="value-item">
                                <div className="value-icon">{value.icon}</div>
                                <h3 className="value-title">{value.title}</h3>
                                <p className="value-text">{value.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="benefits-section">
                <div className="career-container">
                    <div className="section-header">
                        <h2 className="section-title">Perks & Benefits</h2>
                        <p className="section-subtitle">We take care of our team so they can take care of our customers</p>
                    </div>
                    <div className="benefits-grid">
                        {benefits.map((benefit, index) => (
                            <Card key={index} className="benefit-card" hover padding="lg">
                                <div className="benefit-icon-wrapper">
                                    {benefit.icon}
                                </div>
                                <h3 className="benefit-title">{benefit.title}</h3>
                                <p className="benefit-description">{benefit.description}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Job Openings Section */}
            <section id="openings" className="openings-section">
                <div className="career-container">
                    <div className="section-header">
                        <h2 className="section-title">Current Openings</h2>
                        <p className="section-subtitle">Find the role that fits your skills and passion</p>
                    </div>
                    <div className="openings-list">
                        {openings.map((job, index) => (
                            <Card key={index} className="job-card" hover padding="lg">
                                <div className="job-content">
                                    <div className="job-header">
                                        <div className="job-info">
                                            <h3 className="job-title">{job.title}</h3>
                                            <div className="job-meta">
                                                <span className="job-department">{job.department}</span>
                                                <span className="meta-divider">•</span>
                                                <span className="job-location">{job.location}</span>
                                                <span className="meta-divider">•</span>
                                                <span className="job-type">{job.type}</span>
                                            </div>
                                        </div>
                                        <Button variant="outline" className="apply-btn">
                                            Apply Now <FaArrowRight className="btn-icon" />
                                        </Button>
                                    </div>
                                    <div className="job-tags">
                                        {job.tags.map((tag, i) => (
                                            <Badge key={i} variant="secondary" size="sm">{tag}</Badge>
                                        ))}
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Career;
