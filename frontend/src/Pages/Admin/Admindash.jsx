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
        <div className="flex h-screen">
            {/* Sidebar Navigation */}
            <aside className="w-64 bg-blue-900 text-white flex flex-col p-4">
                <h2 className="text-xl font-bold mb-6">VayuGas</h2>
                <nav className="flex-1">
                    <ul>
                        <li
                            className={`mb-4 flex items-center space-x-2 cursor-pointer ${activePage === "dashboard" ? "font-bold" : ""}`}
                            onClick={() => setActivePage("dashboard")}
                        >
                            <FaHome /><span>Home</span>
                        </li>

                        <li
                            className={`mb-4 flex items-center space-x-2 cursor-pointer ${activePage === "stock" ? "font-bold" : ""}`}
                            onClick={() => setActivePage("stock")}
                        >
                            <FaBox /><span>Stock</span>
                        </li>

                        <li
                            className={`mb-4 flex items-center space-x-2 cursor-pointer ${activePage === "report" ? "font-bold" : ""}`}
                            onClick={() => setActivePage("report")}
                        >
                            <FaChartBar /><span>Reports</span>
                        </li>

                        <li
                            className={`mb-4 flex items-center space-x-2 cursor-pointer ${activePage === "outlet" ? "font-bold" : ""}`}
                            onClick={() => setActivePage("outlet")}
                        >
                            <FaStore /><span>Outlet</span>
                        </li>

                        <li
                            className={`mb-4 flex items-center space-x-2 cursor-pointer ${activePage === "deliveries" ? "font-bold" : ""}`}
                            onClick={() => setActivePage("deliveries")}
                        >
                            <FaTruck /><span>Deliveries</span>
                        </li>
                    </ul>
                </nav>
                <div className="mt-auto">
                    <ul>
                        <li className="mb-4 flex items-center space-x-2 text-red-500 cursor-pointer" onClick={handleLogout}>
                            <FaSignOutAlt /><span>Log Out</span>
                        </li>
                    </ul>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 bg-gray-100">
                <ToastContainer />
                <div className="flex justify-between items-center bg-white p-3 rounded-md shadow-md mb-6">
                    <div className="flex items-center space-x-2">
                        <FaSearch />
                        <input type="text" placeholder="Search stock, reports, customers" className="outline-none" />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                </div>

                {/* Render pages based on active selection */}
                {activePage === "dashboard" && (
                    <>
                        <h2 className="text-xl font-bold">Welcome to Main Stock Dashboard</h2>
                        <p>Manage stock, reports, outlets, and deliveries here.</p>

                        {/* Summary Cards */}
                        <div className="grid grid-cols-3 gap-4 mb-6">
                            <div className="bg-white p-4 rounded-md shadow-md">
                                <h3 className="text-lg font-bold">Total Orders</h3>
                                <p className="text-2xl">{stats.totalOrders}</p>
                            </div>
                            <div className="bg-white p-4 rounded-md shadow-md">
                                <h3 className="text-lg font-bold">Total Delivered</h3>
                                <p className="text-2xl">{stats.totalDelivered}</p>
                            </div>
                            <div className="bg-white p-4 rounded-md shadow-md">
                                <h3 className="text-lg font-bold">Cost</h3>
                                <p className="text-2xl">LKR {stats.totalCost}</p>
                            </div>
                        </div>

                        {/* Charts */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="bg-white p-4 rounded-md shadow-md">
                                <h3 className="text-lg font-bold">Sales & Purchase</h3>
                                {stats.salesData.labels.length > 0 && <Bar data={stats.salesData} />}
                            </div>
                            <div className="bg-white p-4 rounded-md shadow-md">
                                <h3 className="text-lg font-bold">Order Summary</h3>
                                {stats.orderSummaryData.labels.length > 0 && <Line data={stats.orderSummaryData} />}
                            </div>
                        </div>

                        {/*verify token*/}
                        <div className="grid gap-4 mb-6">
                            <div className="bg-white p-4 rounded-md shadow-md">
                                <h3 className="text-lg font-bold">Verify Token (eg: x26j97)</h3>
                                <input type="text" placeholder="Enter Token"
                                    className="outline-none px-5 py-2 border-2 mx-10" onChange={(e) => {
                                        setVerifyToken(e.target.value)
                                    }} />
                                <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
                                    onClick={handleVerify}>Verify
                                </button>
                            </div>
                        </div>
                    </>
                )}

                {activePage === "stock" && <Adminstock />}
                {activePage === "report" && <Adminreport />}
                {activePage === "outlet" && <AdminOutlet />}
                {activePage === "deliveries" && <AdminDelivery />}
            </main>
        </div>
    );
};

export default Admindash;
