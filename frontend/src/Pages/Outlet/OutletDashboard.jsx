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
      { label: "Ordered", data: [3000, 3200, 3100, 2900, 2800], borderColor: "orange", fill: false },
      { label: "Delivered", data: [2000, 2500, 2400, 2300, 2200], borderColor: "blue", fill: false },
    ],
  };

  const handleLogout = () => {
    logout(() => {
      window.location.href = "/";
    });
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-blue-900 text-white flex flex-col p-4 fixed h-full">
        <h2 className="text-xl font-bold mb-6">VayuGas Outlet</h2>
        <nav className="flex-1">
          <ul>
            <li 
              className={`mb-4 flex items-center space-x-2 cursor-pointer ${activePage === "dashboard" ? "font-bold" : ""}`} 
              onClick={() => setActivePage("dashboard")}
            >
              <FaHome /><span>Dashboard</span>
            </li>
            <li 
              className={`mb-4 flex items-center space-x-2 cursor-pointer ${activePage === "requests" ? "font-bold" : ""}`} 
              onClick={() => setActivePage("requests")}
            > 
              <FaBox /><span>Requests</span>
            </li>
            <li 
              className={`mb-4 flex items-center space-x-2 cursor-pointer ${activePage === "fulfillment" ? "font-bold" : ""}`} 
              onClick={() => setActivePage("fulfillment")}
            >
              <FaTruck /><span>Fulfillment</span>
            </li>
            <li 
              className={`mb-4 flex items-center space-x-2 cursor-pointer ${activePage === "stock" ? "font-bold" : ""}`} 
              onClick={() => setActivePage("stock")}
            >
              <FaChartBar /><span>Stock</span>
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
      <main className="flex-1 p-6 bg-gray-100 ml-64 overflow-y-auto">
        <div className="flex justify-between items-center bg-white p-3 rounded-md shadow-md mb-6">
          <div className="flex items-center space-x-2">
            <FaSearch />
            <input type="text" placeholder="Search stock, reports, customers" className="outline-none" />
          </div>
          <div className="w-10 h-10 rounded-full bg-gray-300"></div>
        </div>

        {/* Render Dashboard Overview */}
        {activePage === "dashboard" && (
          <>
            <h2 className="text-xl font-bold mb-4">Welcome to Outlet Dashboard</h2>
            <p>Manage stock, reports, customers, and deliveries here.</p>

            {/* Data Cards */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-white p-4 rounded-md shadow-md">
                <h3 className="text-lg font-bold">Orders</h3>
                {ordersData.map((order) => (
                  <p key={order.id}>{order.type} - {order.status}</p>
                ))}
              </div>
              <div className="bg-white p-4 rounded-md shadow-md">
                <h3 className="text-lg font-bold">Stock</h3>
                {stockData.map((stock) => (
                  <p key={stock.type} className={stock.status === "Low" ? "text-red-500" : "text-green-500"}>{stock.type} - {stock.status}</p>
                ))}
              </div>
              <div className="bg-white p-4 rounded-md shadow-md">
                <h3 className="text-lg font-bold">Upcoming Deliveries</h3>
                {deliveriesData.map((delivery) => (
                  <p key={delivery.id}>{delivery.type} - {delivery.date}</p>
                ))}
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white p-4 rounded-md shadow-md">
                <h3 className="text-lg font-bold">Order Summary</h3>
                <Line data={salesData} />
              </div>
            </div>
          </>
        )}

        {/* Render Other Pages */}
        {activePage === "requests" && (
          <div className="bg-white p-6 rounded shadow">
            <h3 className="font-semibold text-xl mb-4">Pending Requests</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b text-left">Customer</th>
                    <th className="py-2 px-4 border-b text-left">Gas Type</th>
                    <th className="py-2 px-4 border-b text-left">Quantity</th>
                    <th className="py-2 px-4 border-b text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map(request => (
                    <tr key={request._id}>
                      <td className="py-2 px-4 border-b">{request.consumerId ? `${request.consumerId.firstname} ${request.consumerId.lastname}` : 'N/A'}</td>
                      <td className="py-2 px-4 border-b">{request.gasType}</td>
                      <td className="py-2 px-4 border-b">{request.quantity}</td>
                      <td className="py-2 px-4 border-b">{request.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activePage === "fulfillment" && (
          <div className="bg-white p-6 rounded shadow">
            <h3 className="font-semibold text-xl mb-4">Fulfill Requests</h3>
            <div className="mb-4">
              <h4 className="font-semibold mb-2">Token Validation</h4>
              <input
                type="text"
                placeholder="Enter Token ID"
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value)}
                className="border p-2 rounded w-full"
              />
              <button onClick={handleValidateToken} className="mt-2 bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Validate Token</button>
              {validationResult && (
                <div className={`p-4 rounded mt-2 ${validationResult.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {validationResult.message}
                </div>
              )}
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Delivery Location"
                value={fulfillmentLocation}
                onChange={(e) => setFulfillmentLocation(e.target.value)}
                className="border p-2 rounded w-full mb-2"
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
      </main>
    </div>
  );
};

export default OutletDashboard;
