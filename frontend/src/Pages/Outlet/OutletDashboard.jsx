import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  FaSearch,
  FaHome,
  FaBox,
  FaChartBar,
  FaUsers,
  FaTruck,
  FaSignOutAlt,
} from "react-icons/fa";
import OutletStock from "./OutletStock";
import OutletPerformance from "./OutletPerformance";
import OutletDeliveries from "./OutletDeliveries";
import Customer from "./Customer";
import "./OutletDashboard.css";
import { useContext } from "react";
import { authcontext } from "../../../context/authcontext.jsx";
import { useNavigate } from "react-router-dom";
import { getPendingRequests, validateToken, fulfillRequest } from "../../services/outletService";
import { toast } from "react-toastify";

const OutletDashboard = () => {
  const [activePage, setActivePage] = useState("dashboard");
  const { logout } = useContext(authcontext);
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [tokenInput, setTokenInput] = useState("");
  const [validationResult, setValidationResult] = useState(null);
  const [fulfillmentLocation, setFulfillmentLocation] = useState("");

  useEffect(() => {
    if (activePage === "requests") {
      loadRequests();
    }
  }, [activePage]);

  const loadRequests = async () => {
    try {
      const data = await getPendingRequests();
      setRequests(data);
    } catch (error) {
      console.error("Failed to load requests", error);
      toast.error("Failed to load requests");
    }
  };

  const handleValidateToken = async () => {
    try {
      const result = await validateToken(tokenInput);
      setValidationResult({ success: true, message: result.message });
      toast.success("Token validated successfully");
      setTokenInput("");
      loadRequests(); // Refresh requests
    } catch (error) {
      setValidationResult({ success: false, message: "Invalid token or error" });
      toast.error("Token validation failed");
    }
  };

  const handleFulfill = async (requestId) => {
    try {
      const result = await fulfillRequest(requestId, fulfillmentLocation);
      toast.success("Request fulfilled successfully");
      loadRequests(); // Refresh requests
      setFulfillmentLocation("");
    } catch (error) {
      toast.error("Fulfillment failed");
    }
  };

  // Example Data for Orders, Stock & Deliveries
  const ordersData = [
    { id: 1, type: "2.3 Kg Cylinder", status: "Pending" },
    { id: 2, type: "5 Kg Cylinder", status: "Approved" },
    { id: 3, type: "12.5 Kg Cylinder", status: "Scheduled" },
  ];

  const stockData = [
    { type: "2.3 Kg Cylinder", quantity: 10, status: "Low" },
    { type: "5 Kg Cylinder", quantity: 15, status: "Low" },
    { type: "12.5 Kg Cylinder", quantity: 20, status: "Sufficient" },
  ];

  const deliveriesData = [
    { id: 1, type: "2.3 Kg Cylinder", date: "2025-02-10" },
    { id: 2, type: "5 Kg Cylinder", date: "2025-02-12" },
  ];

  // Sales & Orders Summary Chart Data
  const salesData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      { label: "Ordered", data: [3000, 3200, 3100, 2900, 2800], borderColor: "#ff8c00", fill: false },
      { label: "Delivered", data: [2000, 2500, 2400, 2300, 2200], borderColor: "#0ea5e9", fill: false },
    ],
  };

  const handleLogout = () => {
    logout(() => {
      window.location.href = "/";
    });
  };

  return (
    <div className="outlet-dashboard">
      {/* Sidebar Navigation */}
      <aside className="outlet-sidebar">
        <h2 className="sidebar-title">VayuGas Outlet</h2>
        <nav className="sidebar-nav">
          <ul className="nav-list">
            <li 
              className={`nav-item ${activePage === "dashboard" ? "active" : ""}`} 
              onClick={() => setActivePage("dashboard")}
            >
              <FaHome className="nav-icon" /><span>Dashboard</span>
            </li>
            <li 
              className={`nav-item ${activePage === "requests" ? "active" : ""}`} 
              onClick={() => setActivePage("requests")}
            > 
              <FaBox className="nav-icon" /><span>Requests</span>
            </li>
            <li 
              className={`nav-item ${activePage === "fulfillment" ? "active" : ""}`} 
              onClick={() => setActivePage("fulfillment")}
            >
              <FaTruck className="nav-icon" /><span>Fulfillment</span>
            </li>
            <li 
              className={`nav-item ${activePage === "stock" ? "active" : ""}`} 
              onClick={() => setActivePage("stock")}
            >
              <FaChartBar className="nav-icon" /><span>Stock</span>
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
      <main className="outlet-main">
        <div className="outlet-header">
          <div className="search-bar">
            <FaSearch className="text-gray-400" />
            <input type="text" placeholder="Search requests, stock..." className="search-input" />
          </div>
          <div className="outlet-profile"></div>
        </div>

        <div className="outlet-content">

        {/* Render Dashboard Overview */}
        {activePage === "dashboard" && (
          <div className="dashboard-content">
            <h1 className="dashboard-title">Welcome to Outlet Dashboard</h1>
            <p className="dashboard-subtitle">Manage stock, reports, customers, and deliveries here.</p>

            {/* Data Cards */}
            <div className="stats-grid">
              <div className="stat-card">
                <h3 className="stat-title">Orders</h3>
                {ordersData.map((order) => (
                  <p key={order.id} className="stat-value-sm">{order.type} - {order.status}</p>
                ))}
              </div>
              <div className="stat-card">
                <h3 className="stat-title">Stock</h3>
                {stockData.map((stock) => (
                  <p key={stock.type} className={`stat-value-sm ${stock.status === "Low" ? "text-error" : "text-success"}`}>{stock.type} - {stock.status}</p>
                ))}
              </div>
              <div className="stat-card">
                <h3 className="stat-title">Upcoming Deliveries</h3>
                {deliveriesData.map((delivery) => (
                  <p key={delivery.id} className="stat-value-sm">{delivery.type} - {delivery.date}</p>
                ))}
              </div>
            </div>

            {/* Charts */}
            <div className="charts-grid">
              <div className="chart-card">
                <h3 className="chart-title">Order Summary</h3>
                <Line data={salesData} />
              </div>
            </div>
          </div>
        )}

        {/* Render Other Pages */}
        {activePage === "requests" && (
          <div className="content-card">
            <h3 className="section-title">Pending Requests</h3>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Gas Type</th>
                    <th>Quantity</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map(request => (
                    <tr key={request._id}>
                      <td>{request.consumerId ? `${request.consumerId.firstname} ${request.consumerId.lastname}` : 'N/A'}</td>
                      <td>{request.gasType}</td>
                      <td>{request.quantity}</td>
                      <td>{request.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activePage === "fulfillment" && (
          <div className="content-card">
            <h3 className="section-title">Fulfill Requests</h3>
            <div className="form-group">
              <h4 className="form-label">Token Validation</h4>
              <input
                type="text"
                placeholder="Enter Token ID"
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value)}
                className="form-input"
              />
              <button onClick={handleValidateToken} className="btn-primary mt-2">Validate Token</button>
              {validationResult && (
                <div className={`alert-box ${validationResult.success ? 'alert-success' : 'alert-error'}`}>
                  {validationResult.message}
                </div>
              )}
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Delivery Location"
                value={fulfillmentLocation}
                onChange={(e) => setFulfillmentLocation(e.target.value)}
                className="form-input mb-2"
              />
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b text-left">Customer</th>
                    <th className="py-2 px-4 border-b text-left">Gas Type</th>
                    <th className="py-2 px-4 border-b text-left">Quantity</th>
                    <th className="py-2 px-4 border-b text-left">Status</th>
                    <th className="py-2 px-4 border-b text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.filter(req => req.status === 'pending').map(request => (
                    <tr key={request._id}>
                      <td className="py-2 px-4 border-b">{request.consumerId ? `${request.consumerId.firstname} ${request.consumerId.lastname}` : 'N/A'}</td>
                      <td className="py-2 px-4 border-b">{request.gasType}</td>
                      <td className="py-2 px-4 border-b">{request.quantity}</td>
                      <td className="py-2 px-4 border-b">{request.status}</td>
                      <td className="py-2 px-4 border-b">
                        <button onClick={() => handleFulfill(request._id)} className="bg-green-600 text-white p-1 rounded hover:bg-green-700">Fulfill</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activePage === "stock" && <OutletStock />}
        {activePage === "report" && <OutletPerformance />}
        {activePage === "customers" && <Customer />}
        {activePage === "delivery" && <OutletDeliveries />}
        </div>
      </main>
    </div>
  );
};

export default OutletDashboard;
