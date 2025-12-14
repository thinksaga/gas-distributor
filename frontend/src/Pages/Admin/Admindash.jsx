import React, { useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
    FaSearch, FaHome, FaBox, FaChartBar, FaStore, FaTruck,
    FaSignOutAlt
} from "react-icons/fa";
import Adminstock from "./Adminstock"; // Import Admin Stock Page
import Adminreport from "./Adminreport"; // Import Admin Report Page
import AdminOutlet from "./AdminOutlet"; // Import Admin Outlet Page
import AdminDelivery from "./AdminDelivery"; // Import Admin Delivery Page
import "./Admindash.css";

import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
} from "chart.js";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import API_BASE_URL from "../../api.js";
import { useContext } from "react";
import { authcontext } from "../../../context/authcontext.jsx";
import { useNavigate } from "react-router-dom";

ChartJS.register(BarElement, CategoryScale, LinearScale, LineElement, PointElement);

import { fetchAdminStats } from "../../services/dashboardService";

const Admindash = () => {
    const [activePage, setActivePage] = useState("dashboard");
    const [verifyToken, setVerifyToken] = useState("");
    const { logout } = useContext(authcontext);
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        totalOrders: 0,
        totalDelivered: 0,
        totalCost: 0,
        salesData: {
            labels: [],
            datasets: []
        },
        orderSummaryData: {
            labels: [],
            datasets: []
        }
    });

    useEffect(() => {
        const loadStats = async () => {
            try {
                const data = await fetchAdminStats();
                setStats(data);
            } catch (error) {
                console.error("Failed to load admin stats", error);
            }
        };
        if (activePage === "dashboard") {
            loadStats();
        }
    }, [activePage]);

    const handleVerify = () => {
        try {
            axios.get(`${API_BASE_URL}/token/${verifyToken}`)
                .then(() => {
                    toast.success('Token Verified');
                })
                .catch(() => {
                    toast.error('Token Verification Failed');
                })

        } catch (error) {
            toast.error("An error occurred. Please try another token.");
        }

    }

    const handleLogout = () => {
        logout(() => {
            window.location.href = "/";
        });
    }

    return (
        <div className="admin-dashboard">
            {/* Sidebar Navigation */}
            <aside className="admin-sidebar">
                <h2 className="sidebar-title">VayuGas</h2>
                <nav className="sidebar-nav">
                    <ul className="nav-list">
                        <li
                            className={`nav-item ${activePage === "dashboard" ? "active" : ""}`}
                            onClick={() => setActivePage("dashboard")}
                        >
                            <FaHome className="nav-icon" /><span>Home</span>
                        </li>

                        <li
                            className={`nav-item ${activePage === "stock" ? "active" : ""}`}
                            onClick={() => setActivePage("stock")}
                        >
                            <FaBox className="nav-icon" /><span>Stock</span>
                        </li>

                        <li
                            className={`nav-item ${activePage === "report" ? "active" : ""}`}
                            onClick={() => setActivePage("report")}
                        >
                            <FaChartBar className="nav-icon" /><span>Reports</span>
                        </li>

                        <li
                            className={`nav-item ${activePage === "outlet" ? "active" : ""}`}
                            onClick={() => setActivePage("outlet")}
                        >
                            <FaStore className="nav-icon" /><span>Outlet</span>
                        </li>

                        <li
                            className={`nav-item ${activePage === "deliveries" ? "active" : ""}`}
                            onClick={() => setActivePage("deliveries")}
                        >
                            <FaTruck className="nav-icon" /><span>Deliveries</span>
                        </li>
                    </ul>
                </nav>
                <div className="sidebar-footer">
                    <div className="logout-btn" onClick={handleLogout}>
                        <FaSignOutAlt className="nav-icon" /><span>Log Out</span>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="admin-main">
                <ToastContainer />
                <div className="admin-header">
                    <div className="search-bar">
                        <FaSearch className="text-gray-400" />
                        <input type="text" placeholder="Search stock, reports, customers" className="search-input" />
                    </div>
                    <div className="admin-profile"></div>
                </div>

                {/* Render pages based on active selection */}
                <div className="admin-content">
                {activePage === "dashboard" && (
                    <div className="dashboard-content">
                        <h1 className="dashboard-title">Welcome to Main Stock Dashboard</h1>
                        <p className="dashboard-subtitle">Manage stock, reports, outlets, and deliveries here.</p>

                        {/* Summary Cards */}
                        <div className="stats-grid">
                            <div className="stat-card">
                                <h3 className="stat-title">Total Orders</h3>
                                <p className="stat-value">{stats.totalOrders}</p>
                            </div>
                            <div className="stat-card">
                                <h3 className="stat-title">Total Delivered</h3>
                                <p className="stat-value">{stats.totalDelivered}</p>
                            </div>
                            <div className="stat-card">
                                <h3 className="stat-title">Cost</h3>
                                <p className="stat-value">LKR {stats.totalCost}</p>
                            </div>
                        </div>

                        {/* Charts */}
                        <div className="charts-grid">
                            <div className="chart-card">
                                <h3 className="chart-title">Sales & Purchase</h3>
                                {stats.salesData.labels.length > 0 && <Bar data={stats.salesData} />}
                            </div>
                            <div className="chart-card">
                                <h3 className="chart-title">Order Summary</h3>
                                {stats.orderSummaryData.labels.length > 0 && <Line data={stats.orderSummaryData} />}
                            </div>
                        </div>

                        {/*verify token*/}
                        <div className="verify-section">
                            <h3 className="chart-title">Verify Token (eg: x26j97)</h3>
                            <div className="verify-input-group">
                                <input type="text" placeholder="Enter Token"
                                    className="verify-input" onChange={(e) => {
                                        setVerifyToken(e.target.value)
                                    }} />
                                <button className="verify-btn"
                                    onClick={() => {}}>Verify
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {activePage === "stock" && <Adminstock />}
                {activePage === "report" && <Adminreport />}
                {activePage === "outlet" && <AdminOutlet />}
                {activePage === "deliveries" && <AdminDelivery />}
                </div>
            </main>
        </div>
    );
};

export default Admindash;
