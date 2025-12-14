import React from "react";
import Card from "./Card";
import { FaCalendar, FaUser, FaArrowRight } from "react-icons/fa";
import "./Blog.css";

const Blog = () => {
    const blogPosts = [
        {
            title: "How VayuGas is Revolutionizing Gas Distribution in Sri Lanka",
            excerpt: "Discover how our innovative token-based system is making gas distribution fairer and more efficient for everyone.",
            author: "Admin Team",
            date: "January 15, 2025",
            image: "/blog1.jpg",
            category: "Company News"
        },
        {
            title: "Safety First: Gas Cylinder Handling Best Practices",
            excerpt: "Learn the essential safety guidelines for handling and storing LPG gas cylinders at home and in commercial settings.",
            author: "Safety Team",
            date: "January 10, 2025",
            image: "/blog2.jpg",
            category: "Safety Tips"
        },
        {
            title: "Understanding the Token-Based Request System",
            excerpt: "A comprehensive guide to how our token system works and how it ensures fair distribution for all customers.",
            author: "Product Team",
            date: "January 5, 2025",
            image: "/blog3.jpg",
            category: "Product Updates"
        },
        {
            title: "VayuGas Mobile App: Features and Benefits",
            excerpt: "Explore the features of our mobile app and how it makes ordering gas easier than ever before.",
            author: "Tech Team",
            date: "December 28, 2024",
            image: "/blog4.jpg",
            category: "Technology"
        }
    ];

    return (
        <div className="blog-page">
            {/* Hero Section */}
            <section className="blog-hero">
                <div className="blog-container">
                    <h1 className="blog-title">VayuGas Blog</h1>
                    <p className="blog-subtitle">
                        Stay updated with the latest news, tips, and insights from VayuGas
                    </p>
                </div>
            </section>

            {/* Blog Posts Section */}
            <section className="blog-posts-section">
                <div className="blog-container">
                    <div className="blog-grid">
                        {blogPosts.map((post, index) => (
                            <Card key={index} className="blog-card" hover padding="none">
                                <div className="blog-image-wrapper">
                                    <div className="blog-image-placeholder">
                                        <span className="blog-category-badge">{post.category}</span>
                                    </div>
                                </div>
                                <div className="blog-content">
                                    <h3 className="blog-post-title">{post.title}</h3>
                                    <p className="blog-excerpt">{post.excerpt}</p>
                                    <div className="blog-meta">
                                        <div className="blog-meta-item">
                                            <FaUser className="blog-meta-icon" />
                                            <span>{post.author}</span>
                                        </div>
                                        <div className="blog-meta-item">
                                            <FaCalendar className="blog-meta-icon" />
                                            <span>{post.date}</span>
                                        </div>
                                    </div>
                                    <button className="read-more-button">
                                        Read More <FaArrowRight />
                                    </button>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Blog;
