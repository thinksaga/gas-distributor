import React, { useState } from "react";
import Card from "./Card";
import Button from "./Button";
import Input from "./Input";
import { FaPhone, FaEnvelope, FaClock, FaMapMarkerAlt } from "react-icons/fa";
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

  const contactInfo = [
    {
      icon: <FaPhone />,
      title: "Customer Helpline",
      value: "+94 71 234 5678",
      color: "primary"
    },
    {
      icon: <FaEnvelope />,
      title: "Email Support",
      value: "support@gasbygas.com",
      color: "success"
    },
    {
      icon: <FaClock />,
      title: "Working Hours",
      value: "24/7 Support Available",
      color: "warning"
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Location",
      value: "Colombo, Sri Lanka",
      color: "info"
    }
  ];

  return (
    <div className="support-page">
      <ToastContainer />

      {/* Hero Section */}
      <section className="support-hero">
        <div className="support-container">
          <h1 className="support-title">We Are Here To Help!</h1>
          <p className="support-subtitle">
            Need assistance with gas orders, deliveries, or payments?
            VayuGas offers 24/7 support to ensure a smooth and hassle-free experience.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="contact-info-section">
        <div className="support-container">
          <div className="contact-info-grid">
            {contactInfo.map((info, index) => (
              <Card key={index} className="contact-info-card" hover padding="lg">
                <div className={`contact-icon contact-icon-${info.color}`}>
                  {info.icon}
                </div>
                <h3 className="contact-title">{info.title}</h3>
                <p className="contact-value">{info.value}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="contact-form-section">
        <div className="support-container">
          <div className="contact-form-content">
            <div className="contact-form-image">
              <img src="/Sup.png" alt="Customer Support" />
            </div>

            <Card className="contact-form-card" padding="lg">
              <h2 className="form-title">Send Us A Message</h2>
              <p className="form-subtitle">
                Whether you need help with tracking your order, scheduling a delivery,
                or understanding safety guidelines, our dedicated team is ready to assist you!
              </p>

              <form className="contact-form" onSubmit={handleSubmit}>
                <Input
                  label="Your Name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  error={errors.name}
                  required
                />

                <Input
                  label="Email Address"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  error={errors.email}
                  required
                />

                <Input
                  label="Subject"
                  type="text"
                  placeholder="What is this regarding?"
                  value={formData.subject}
                  onChange={(e) => handleInputChange("subject", e.target.value)}
                  error={errors.subject}
                  required
                />

                <div className="input-wrapper">
                  <label className="input-label">
                    Message
                    <span className="input-required">*</span>
                  </label>
                  <textarea
                    className={`input-field ${errors.message ? 'input-error' : ''}`}
                    placeholder="Tell us how we can help you..."
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    rows="5"
                    required
                  />
                  {errors.message && (
                    <span className="input-error-message">{errors.message}</span>
                  )}
                </div>

                <Button type="submit" variant="primary" size="lg" fullWidth>
                  Send Message
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Support;
