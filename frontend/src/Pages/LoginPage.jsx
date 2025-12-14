import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { authcontext } from "../../context/authcontext.jsx";
import API_BASE_URL from "../api.js";
import Input from "../Components/Input";
import Button from "../Components/Button";
import "./LoginPage.css";

const LoginPage = () => {
    const navigate = useNavigate();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const { setIsLoggedIn, setUserRole } = useContext(authcontext);

    const validateForm = () => {
        const newErrors = {};
        if (!username.trim()) {
            newErrors.username = "Username is required";
        }
        if (!password) {
            newErrors.password = "Password is required";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);
        try {
            const res = await axios.post(`${API_BASE_URL}/auth/sign-in`, { username, password });
            localStorage.setItem("user", JSON.stringify(res.data));
            localStorage.setItem("token", res.data.token);
            setIsLoggedIn(true);
            setUserRole(res.data.data.role || "user");
            toast.success("Login successful!");

            // Use window.location.href for immediate redirect
            setTimeout(() => {
                if (res.data.data.role === "superadmin") {
                    window.location.href = "/superadmin-dashboard";
                } else if (res.data.data.role === "admin") {
                    window.location.href = "/admin-dashboard";
                } else {
                    window.location.href = "/user-dashboard";
                }
            }, 1000);
        } catch (error) {
            toast.error(error.response?.data?.message || "Invalid credentials");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <ToastContainer />
            <div className="auth-container">
                <div className="auth-card">
                    <div className="auth-header">
                        <div className="auth-logo">
                            <span className="logo-text">VayuGas</span>
                        </div>
                        <h2 className="auth-title">Welcome Back</h2>
                        <p className="auth-subtitle">Sign in to your account to continue</p>
                    </div>

                    <form className="auth-form" onSubmit={handleLogin}>
                        <Input
                            label="Username"
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            error={errors.username}
                            required
                        />

                        <Input
                            label="Password"
                            type={passwordVisible ? "text" : "password"}
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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

                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            fullWidth
                            disabled={loading}
                        >
                            {loading ? "Signing In..." : "Sign In"}
                        </Button>
                    </form>

                    <p className="auth-footer">
                        Don't have an account?{" "}
                        <Link to="/signup" className="auth-link">
                            Sign up here
                        </Link>
                    </p>

                    <p className="auth-footer">
                        <Link to="/" className="auth-link">
                            ← Back to Home
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
