import { useState, useEffect } from "react";
import "./Customer.css";

const CustomerOrders = () => {
  const [customers, setCustomers] = useState([
    { id: 27535, orderId: 7535, product: "2.3Kg Gas Cylinder", quantity: 100, orderDate: "1/12/22", deliveryDate: "11/12/22", status: "Pending", token: "", tokenExpiry: "" },
    { id: 57535, orderId: 7536, product: "5Kg Gas Cylinder", quantity: 250, orderDate: "15/12/22", deliveryDate: "21/12/22", status: "Approved", token: "ABC123", tokenExpiry: "2025-02-21" },
    { id: 23445, orderId: 2775, product: "12Kg Gas Cylinder", quantity: 100, orderDate: "2/12/22", deliveryDate: "5/12/22", status: "In Progress", token: "", tokenExpiry: "" },
    { id: 23323, orderId: 2275, product: "12Kg Gas Cylinder", quantity: 1, orderDate: "5/12/22", deliveryDate: "8/12/22", status: "Delivered", token: "", tokenExpiry: "" },
    { id: 23950, orderId: 2427, product: "12Kg Gas Cylinder", quantity: 1, orderDate: "22/12/22", deliveryDate: "Cancelled", status: "Cancelled", token: "", tokenExpiry: "" },
  ]);

  const [filterStatus, setFilterStatus] = useState("All");

  const generateToken = () => Math.random().toString(36).substr(2, 8).toUpperCase();

  const getExpiryDate = () => {
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 14); // 14 days from now
    return expiry.toISOString().split("T")[0]; // Format YYYY-MM-DD
  };

  const handleStatusChange = (orderId, newStatus) => {
    setCustomers(customers.map(customer =>
      customer.orderId === orderId
        ? { ...customer, status: newStatus, token: newStatus === "Approved" ? generateToken() : "", tokenExpiry: newStatus === "Approved" ? getExpiryDate() : "" }
        : customer
    ));
  };

  const handleDownloadReport = () => {
    const csvContent = [
      ["Customer ID", "Order ID", "Product", "Quantity", "Order Date", "Delivery Date", "Status", "Token", "Token Expiry"].join(","),
      ...customers.map(c => [c.id, c.orderId, c.product, c.quantity, c.orderDate, c.deliveryDate, c.status, c.token, c.tokenExpiry].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "customer_orders.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Remove expired tokens
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]; // Today's date in YYYY-MM-DD format
    setCustomers(customers.map(customer => ({
      ...customer,
      token: customer.tokenExpiry && customer.tokenExpiry < today ? "" : customer.token,
      tokenExpiry: customer.tokenExpiry && customer.tokenExpiry < today ? "" : customer.tokenExpiry,
    })));
  }, []);

  const filteredOrders = filterStatus === "All" ? customers : customers.filter(c => c.status === filterStatus);

  return (
    <div className="customer-orders-page">
      <div className="page-header">
        <h2 className="page-title">Customer Orders</h2>
        <button onClick={handleDownloadReport} className="action-btn download-btn">Download Report</button>
      </div>

      {/* Filter Dropdown */}
      <div className="filter-section">
        <label className="filter-label">Filter by Status:</label>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="filter-select">
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="In Progress">In Progress</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      <div className="orders-table-container">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Customer ID</th>
              <th>Order ID</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Order Date</th>
              <th>Delivery Date</th>
              <th>Status</th>
              <th>Token</th>
              <th>Token Expiry</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((c) => (
              <tr key={c.orderId}>
                <td>{c.id}</td>
                <td>{c.orderId}</td>
                <td>{c.product}</td>
                <td>{c.quantity}</td>
                <td>{c.orderDate}</td>
                <td>{c.deliveryDate}</td>
                <td>
                  <select
                    value={c.status}
                    onChange={(e) => handleStatusChange(c.orderId, e.target.value)}
                    className={`status-select status-${c.status.toLowerCase().replace(" ", "")}`}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
                <td>{c.token ? <span className="token-badge">{c.token}</span> : "-"}</td>
                <td className={`expiry-text ${c.tokenExpiry && c.tokenExpiry < new Date().toISOString().split("T")[0] ? "text-red-500" : ""}`}>
                  {c.tokenExpiry || "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerOrders;
