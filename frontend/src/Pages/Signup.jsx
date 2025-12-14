import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import API_BASE_URL from "../api.js";
import Input from "../Components/Input";
import Button from "../Components/Button";
import "./Signup.css";

const Signup = ({ togglePopup }) => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        contactNumber: "",
        password: "",
        confirmPassword: "",
        street: "",
        city: "",
        agreeToTerms: false,
    });

    const validateForm = () => {
        const newErrors = {};

        if (!formData.firstname.trim()) newErrors.firstname = "First name is required";
        if (!formData.lastname.trim()) newErrors.lastname = "Last name is required";
        if (!formData.username.trim()) newErrors.username = "Username is required";

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid";
        }

        if (!formData.contactNumber.trim()) {
            newErrors.contactNumber = "Contact number is required";
        } else if (!/^\d{10}$/.test(formData.contactNumber)) {
            newErrors.contactNumber = "Contact number must be 10 digits";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        if (!formData.street.trim()) newErrors.street = "Street address is required";
        if (!formData.city.trim()) newErrors.city = "City is required";

        if (!formData.agreeToTerms) {
            newErrors.agreeToTerms = "You must accept the terms and conditions";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
        setErrors({ ...errors, [field]: "" });
    };

    const handleSignUp = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            toast.error("Please fix the errors in the form");
            return;
        }

        setLoading(true);
        try {
            await axios.post(`${API_BASE_URL}/auth/sign-up`, {
                firstname: formData.firstname,
                lastname: formData.lastname,
                username: formData.username,
                email: formData.email,
                contactNumber: formData.contactNumber,
                password: formData.password,
                street: formData.street,
                city: formData.city,
            });
            toast.success("Account created successfully!");
            setTimeout(() => togglePopup(), 1500);
        } catch (error) {
            toast.error(error.response?.data?.message || "Signup failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signup-overlay">
            <ToastContainer />
            <div className="signup-container">
                <button
                    onClick={togglePopup}
                    className="signup-close"
                    aria-label="Close signup"
                >
                    ×
                </button>

                <div className="signup-header">
                    <h2 className="signup-title">Create Account</h2>
                    <p className="signup-subtitle">
                        Fill in the form below to create your account
                    </p>
                </div>

                <form className="signup-form" onSubmit={handleSignUp}>
                    <div className="form-row">
                        <Input
                            label="First Name"
                            type="text"
                            placeholder="Enter your first name"
                            value={formData.firstname}
                            onChange={(e) => handleInputChange("firstname", e.target.value)}
                            error={errors.firstname}
                            required
                        />
                        <Input
                            label="Last Name"
                            type="text"
                            placeholder="Enter your last name"
                            value={formData.lastname}
                            onChange={(e) => handleInputChange("lastname", e.target.value)}
                            error={errors.lastname}
                            required
                        />
                    </div>

                    <Input
                        label="Username"
                        type="text"
                        placeholder="Choose a username"
                        value={formData.username}
                        onChange={(e) => handleInputChange("username", e.target.value)}
                        error={errors.username}
                        required
                    />

                    <Input
                        label="Email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        error={errors.email}
                        required
                    />

                    <Input
                        label="Contact Number"
                        type="tel"
                        placeholder="Enter your 10-digit contact number"
                        value={formData.contactNumber}
                        onChange={(e) => handleInputChange("contactNumber", e.target.value)}
                        error={errors.contactNumber}
                        required
                    />

                    <Input
                        label="Password"
                        type={passwordVisible ? "text" : "password"}
                        placeholder="Create a password (min 6 characters)"
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        error={errors.password}
                        icon={
                            <button
                                type="button"
                                onClick={() => setPasswordVisible(!passwordVisible)}
                                className="password-toggle"
                            >
                                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        }
                        iconPosition="right"
                        required
                    />

                    <Input
                        label="Confirm Password"
                        type={confirmPasswordVisible ? "text" : "password"}
                        placeholder="Re-enter your password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                        error={errors.confirmPassword}
                        icon={
                            <button
                                type="button"
                                onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                                className="password-toggle"
                            >
                                {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        }
                        iconPosition="right"
                        required
                    />

                    <div className="address-section">
                        <h3 className="section-title">Address Information</h3>
                        <Input
                            label="Street Address"
                            type="text"
                            placeholder="Enter your street address"
                            value={formData.street}
                            onChange={(e) => handleInputChange("street", e.target.value)}
                            error={errors.street}
                            required
                        />
                        <Input
                            label="City"
                            type="text"
                            placeholder="Enter your city"
                            value={formData.city}
                            onChange={(e) => handleInputChange("city", e.target.value)}
                            error={errors.city}
                            required
                        />
                    </div>

                    <div className="terms-section">
                        <label className="terms-checkbox">
                            <input
                                type="checkbox"
                                checked={formData.agreeToTerms}
                                onChange={(e) => handleInputChange("agreeToTerms", e.target.checked)}
                            />
                            <span>
                                I accept the{" "}
                                <a href="#" className="terms-link">
                                    Terms of Use & Privacy Policy
                                </a>
                            </span>
                        </label>
                        {errors.agreeToTerms && (
                            <span className="terms-error">{errors.agreeToTerms}</span>
                        )}
                    </div>

                    <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        fullWidth
                        disabled={loading}
                    >
                        {loading ? "Creating Account..." : "Sign Up"}
                    </Button>
                </form>

                <p className="signup-footer">
                    Already have an account?{" "}
                    <a href="#" className="login-link">
                        Log in here
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Signup;