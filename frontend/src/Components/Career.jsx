import React from "react";
import Card from "./Card";
import { FaBriefcase, FaUsers, FaRocket, FaHeart } from "react-icons/fa";
import "./Career.css";

const Career = () => {
    const openings = [
        {
            title: "Senior Gas Distribution Manager",
            department: "Operations",
            location: "Colombo, Sri Lanka",
            type: "Full-time"
        },
        {
            title: "Customer Support Specialist",
            department: "Customer Service",
            location: "Remote",
            type: "Full-time"
        },
        {
            title: "Software Engineer",
            department: "Technology",
            location: "Colombo, Sri Lanka",
            type: "Full-time"
        },
        {
            title: "Marketing Manager",
            department: "Marketing",
            location: "Colombo, Sri Lanka",
            type: "Full-time"
        }
    ];

    const benefits = [
        {
            icon: <FaBriefcase />,
            title: "Competitive Salary",
            description: "Industry-leading compensation packages"
        },
        {
            icon: <FaUsers />,
            title: "Great Team",
            description: "Work with talented and passionate people"
        },
        {
            icon: <FaRocket />,
            title: "Career Growth",
            description: "Opportunities for professional development"
        },
        {
            icon: <FaHeart />,
            title: "Work-Life Balance",
            description: "Flexible working hours and remote options"
        }
    ];

    return (
        <div className="career-page">
            {/* Hero Section */}
            <section className="career-hero">
                <div className="career-container">
                    <h1 className="career-title">Join Our Team</h1>
                    <p className="career-subtitle">
                        Build your career with VayuGas and help us revolutionize gas distribution in Sri Lanka
                    </p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="benefits-section">
                <div className="career-container">
                    <h2 className="section-title">Why Work With Us?</h2>
                    <div className="benefits-grid">
                        {benefits.map((benefit, index) => (
                            <Card key={index} className="benefit-card" hover padding="lg">
                                <div className="benefit-icon">{benefit.icon}</div>
                                <h3 className="benefit-title">{benefit.title}</h3>
                                <p className="benefit-description">{benefit.description}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Job Openings Section */}
            <section className="openings-section">
                <div className="career-container">
                    <h2 className="section-title">Current Openings</h2>
                    <div className="openings-list">
                        {openings.map((job, index) => (
                            <Card key={index} className="job-card" hover padding="lg">
                                <div className="job-header">
                                    <h3 className="job-title">{job.title}</h3>
                                    <span className="job-type">{job.type}</span>
                                </div>
                                <div className="job-details">
                                    <span className="job-department">{job.department}</span>
                                    <span className="job-divider">•</span>
                                    <span className="job-location">{job.location}</span>
                                </div>
                                <button className="apply-button">Apply Now</button>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Career;
