import { useContext, useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle, FaGithub, FaFacebook } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { authcontext } from "../../context/authcontext.jsx";
import API_BASE_URL from "../api.js";
import Input from "../Components/Input";
import Button from "../Components/Button";
import "./Login.css";

const Login = ({ togglePopup }) => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const { setIsLoggedIn, setUserRole, setShowLogin } = useContext(authcontext);

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
            localStorage.setItem("token", res.data.data.token);
            setIsLoggedIn(true);
            setUserRole(res.data.data.role || "user");
            if (setShowLogin) setShowLogin(false);
            toast.success("Login successful!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Invalid credentials");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-overlay">
            <ToastContainer />
            <div className="login-container">
                <button
                    onClick={togglePopup}
                    className="login-close"
                    aria-label="Close login"
                >
                    ×
                </button>

                <div className="login-header">
                    <div className="login-logo">
                        <span className="logo-text">VayuGas</span>
                    </div>
                    <h2 className="login-title">Welcome Back</h2>
                    <p className="login-subtitle">Sign in to your account to continue</p>
                </div>

                <form className="login-form" onSubmit={handleLogin}>
                    <Input
                        label="Username"
                        type="text"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                            setErrors({ ...errors, username: "" });
                        }}
                        error={errors.username}
                        required
                    />

                    <Input
                        label="Password"
                        type={passwordVisible ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setErrors({ ...errors, password: "" });
                        }}
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

                    <div className="login-options">
                        <label className="remember-me">
                            <input type="checkbox" />
                            <span>Remember me</span>
                        </label>
                        <a href="#" className="forgot-password">
                            Forgot password?
                        </a>
                    </div>

                    <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        fullWidth
                        disabled={loading}
                    >
                        {loading ? "Signing in..." : "Sign In"}
                    </Button>
                </form>

                <div className="login-divider">
                    <span>Or continue with</span>
                </div>

                <div className="social-login">
                    <button className="social-button">
                        <FaGoogle />
                    </button>
                    <button className="social-button">
                        <FaGithub />
                    </button>
                    <button className="social-button">
                        <FaFacebook />
                    </button>
                </div>

                <p className="login-footer">
                    Don't have an account?{" "}
                    <a href="#" className="signup-link">
                        Sign up for free
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;
