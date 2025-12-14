import React, { useState } from "react";
import Card from "./atoms/Card";
import Button from "./atoms/Button";
import Input from "./atoms/Input";
import { FaPhone, FaEnvelope, FaClock, FaMapMarkerAlt, FaQuestionCircle, FaComments, FaChevronDown, FaChevronUp, FaHeadset, FaPaperPlane } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "./Support.css";

const Support = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [activeFaq, setActiveFaq] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } else {
      toast.error("Please fix the errors in the form");
    }
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const contactInfo = [
    {
      icon: <FaPhone />,
      title: "Customer Helpline",
      value: "+94 71 234 5678",
      subValue: "Mon-Fri, 8am-8pm",
      color: "primary",
      action: "Call Now"
    },
    {
      icon: <FaEnvelope />,
      title: "Email Support",
      value: "support@gasbygas.com",
      subValue: "Response within 24h",
      color: "success",
      action: "Send Email"
    },
    {
      icon: <FaComments />,
      title: "Live Chat",
      value: "Chat with Agent",
      subValue: "Available 24/7",
      color: "warning",
      action: "Start Chat"
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Head Office",
      value: "Colombo, Sri Lanka",
      subValue: "Get Directions",
      color: "info",
      action: "View Map"
    }
  ];

  const faqs = [
    {
      question: "How do I request a new gas cylinder?",
      answer: "You can request a new gas cylinder by logging into your account, navigating to the 'New Request' section, and selecting your preferred cylinder size and delivery date. You'll receive a token for tracking."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept various payment methods including credit/debit cards (Visa, Mastercard), online bank transfers, and cash on delivery for verified customers."
    },
    {
      question: "How can I track my delivery?",
      answer: "Once your request is confirmed, you can track your delivery in real-time through the 'Track Order' section in your dashboard or via our mobile app."
    },
    {
      question: "Can I reschedule my delivery?",
      answer: "Yes, you can reschedule your delivery up to 24 hours before the scheduled time through your dashboard. Emergency rescheduling is available by contacting support."
    },
    {
      question: "What should I do in case of a gas leak?",
      answer: "In case of a gas leak, immediately turn off the regulator, open all windows/doors, do not switch on/off any electrical appliances, and evacuate the premises. Call our emergency hotline immediately."
    }
  ];

  return (
    <div className="support-page">
      <ToastContainer position="top-right" theme="colored" />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <FaHeadset className="badge-icon" />
              <span>24/7 Customer Support</span>
            </div>
            <h1 className="hero-title">
              How Can We <span className="gradient-text">Help You?</span>
            </h1>
            <p className="hero-subtitle">
              Experience seamless support for all your gas distribution needs. 
              Our dedicated team is here to ensure your safety and satisfaction.
            </p>
            
            <div className="search-help">
              <div className="search-box">
                <FaQuestionCircle className="search-icon" />
                <input type="text" placeholder="Search for help articles..." />
                <Button variant="primary" size="sm">Search</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="contact-info-section">
        <div className="support-container">
          <div className="contact-info-grid">
            {contactInfo.map((info, index) => (
              <Card key={index} className={`contact-info-card ${info.color}`} hover padding="lg">
                <div className="contact-icon-wrapper">
                  <div className={`contact-icon contact-icon-${info.color}`}>
                    {info.icon}
                  </div>
                </div>
                <div className="contact-details">
                  <h3 className="contact-title">{info.title}</h3>
                  <p className="contact-value">{info.value}</p>
                  <p className="contact-sub-value">{info.subValue}</p>
                  <Button variant="outline" size="sm" className="contact-action">
                    {info.action}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="support-content-section">
        <div className="support-container">
          <div className="content-grid">
            {/* Contact Form */}
            <div className="form-column">
              <Card className="contact-form-card" padding="xl">
                <div className="form-header">
                  <h2 className="form-title">Send us a Message</h2>
                  <p className="form-subtitle">Fill out the form below and we'll get back to you shortly.</p>
                </div>
                
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-row">
                    <Input
                      label="Your Name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      error={errors.name}
                      fullWidth
                    />
                    <Input
                      label="Email Address"
                      placeholder="john@example.com"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      error={errors.email}
                      fullWidth
                    />
                  </div>
                  
                  <Input
                    label="Subject"
                    placeholder="How can we help?"
                    value={formData.subject}
                    onChange={(e) => handleInputChange("subject", e.target.value)}
                    error={errors.subject}
                    fullWidth
                  />
                  
                  <div className="form-group">
                    <label className="form-label">Message</label>
                    <textarea
                      className={`form-textarea ${errors.message ? "error" : ""}`}
                      placeholder="Tell us more about your inquiry..."
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      rows="5"
                    ></textarea>
                    {errors.message && <span className="error-message">{errors.message}</span>}
                  </div>
                  
                  <Button type="submit" variant="primary" size="lg" fullWidth className="submit-btn">
                    <FaPaperPlane className="btn-icon" /> Send Message
                  </Button>
                </form>
              </Card>
            </div>

            {/* FAQ Section */}
            <div className="faq-column">
              <div className="faq-header">
                <h2 className="faq-title">Frequently Asked Questions</h2>
                <p className="faq-subtitle">Quick answers to common questions</p>
              </div>
              
              <div className="faq-list">
                {faqs.map((faq, index) => (
                  <div 
                    key={index} 
                    className={`faq-item ${activeFaq === index ? 'active' : ''}`}
                    onClick={() => toggleFaq(index)}
                  >
                    <div className="faq-question">
                      <span>{faq.question}</span>
                      {activeFaq === index ? <FaChevronUp /> : <FaChevronDown />}
                    </div>
                    <div className="faq-answer">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Card className="help-card" padding="lg">
                <div className="help-content">
                  <h3>Still need help?</h3>
                  <p>Our support team is available 24/7 to assist you with any issues.</p>
                  <Button variant="secondary" fullWidth>Visit Help Center</Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Support;
