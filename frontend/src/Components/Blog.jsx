import React from "react";
import Card from "./Card";
import Badge from "./Badge";
import Button from "./Button";
import { FaCalendar, FaUser, FaArrowRight, FaNewspaper, FaSearch } from "react-icons/fa";
import "./Blog.css";

const Blog = () => {
    const featuredPost = {
        title: "The Future of Energy: Sustainable Gas Distribution",
        excerpt: "As we move towards a greener future, VayuGas is leading the charge with sustainable practices and smart distribution networks that minimize carbon footprint while maximizing efficiency.",
        author: "CEO's Desk",
        date: "January 20, 2025",
        category: "Sustainability",
        readTime: "5 min read"
    };

    const blogPosts = [
        {
            title: "How VayuGas is Revolutionizing Gas Distribution",
            excerpt: "Discover how our innovative token-based system is making gas distribution fairer and more efficient for everyone.",
            author: "Admin Team",
            date: "January 15, 2025",
            category: "Company News",
            readTime: "3 min read"
        },
        {
            title: "Safety First: Gas Cylinder Handling Best Practices",
            excerpt: "Learn the essential safety guidelines for handling and storing LPG gas cylinders at home and in commercial settings.",
            author: "Safety Team",
            date: "January 10, 2025",
            category: "Safety Tips",
            readTime: "4 min read"
        },
        {
            title: "Understanding the Token-Based Request System",
            excerpt: "A comprehensive guide to how our token system works and how it ensures fair distribution for all customers.",
            author: "Product Team",
            date: "January 5, 2025",
            category: "Product Updates",
            readTime: "6 min read"
        },
        {
            title: "VayuGas Mobile App: Features and Benefits",
            excerpt: "Explore the features of our mobile app and how it makes ordering gas easier than ever before.",
            author: "Tech Team",
            date: "December 28, 2024",
            category: "Technology",
            readTime: "3 min read"
        },
        {
            title: "Community Impact: Supporting Local Businesses",
            excerpt: "How VayuGas is partnering with local outlets to boost the local economy and provide better service.",
            author: "Community Team",
            date: "December 20, 2024",
            category: "Community",
            readTime: "4 min read"
        },
        {
            title: "2024 Year in Review: Milestones Achieved",
            excerpt: "A look back at our major achievements and growth in the past year.",
            author: "Admin Team",
            date: "December 15, 2024",
            category: "Company News",
            readTime: "5 min read"
        }
    ];

    return (
        <div className="blog-page">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-container">
                    <div className="hero-content">
                        <div className="hero-badge">
                            <FaNewspaper className="badge-icon" />
                            <span>Latest Updates</span>
                        </div>
                        <h1 className="hero-title">
                            Insights & <span className="gradient-text">News</span>
                        </h1>
                        <p className="hero-subtitle">
                            Stay updated with the latest news, tips, and insights from the VayuGas team.
                        </p>
                    
                    <div className="blog-search">
                        <div className="search-input-wrapper">
                            <FaSearch className="search-icon" />
                            <input type="text" placeholder="Search articles..." className="search-input" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Post */}
            <section className="featured-section">
                <div className="blog-container">
                    <h2 className="section-heading">Featured Story</h2>
                    <Card className="featured-card" hover padding="none">
                        <div className="featured-content">
                            <div className="featured-image-placeholder">
                                <Badge variant="primary" className="featured-badge">Featured</Badge>
                            </div>
                            <div className="featured-text">
                                <div className="post-meta-top">
                                    <Badge variant="secondary" size="sm">{featuredPost.category}</Badge>
                                    <span className="read-time">{featuredPost.readTime}</span>
                                </div>
                                <h3 className="featured-title">{featuredPost.title}</h3>
                                <p className="featured-excerpt">{featuredPost.excerpt}</p>
                                <div className="blog-meta">
                                    <div className="blog-meta-item">
                                        <FaUser className="blog-meta-icon" />
                                        <span>{featuredPost.author}</span>
                                    </div>
                                    <div className="blog-meta-item">
                                        <FaCalendar className="blog-meta-icon" />
                                        <span>{featuredPost.date}</span>
                                    </div>
                                </div>
                                <Button variant="primary" className="read-more-btn">
                                    Read Full Story <FaArrowRight />
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
            </section>

            {/* Blog Posts Grid */}
            <section className="blog-posts-section">
                <div className="blog-container">
                    <div className="section-header-row">
                        <h2 className="section-heading">Recent Articles</h2>
                        <div className="categories-filter">
                            <button className="category-btn active">All</button>
                            <button className="category-btn">News</button>
                            <button className="category-btn">Safety</button>
                            <button className="category-btn">Tech</button>
                        </div>
                    </div>
                    
                    <div className="blog-grid">
                        {blogPosts.map((post, index) => (
                            <Card key={index} className="blog-card" hover padding="none">
                                <div className="blog-image-wrapper">
                                    <div className="blog-image-placeholder"></div>
                                    <div className="category-overlay">
                                        <Badge variant="secondary" size="sm">{post.category}</Badge>
                                    </div>
                                </div>
                                <div className="blog-content">
                                    <div className="post-date-meta">
                                        <span className="read-time">{post.readTime}</span>
                                    </div>
                                    <h3 className="blog-post-title">{post.title}</h3>
                                    <p className="blog-excerpt">{post.excerpt}</p>
                                    <div className="blog-footer">
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
                                        <button className="icon-btn">
                                            <FaArrowRight />
                                        </button>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                    
                    <div className="load-more-container">
                        <Button variant="outline">Load More Articles</Button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Blog;
