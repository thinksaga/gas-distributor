import { useState } from "react";
import "./OutletDeliveries.css";

const OutletDeliveries = () => {
  const [incomingDeliveries, setIncomingDeliveries] = useState([
    { id: 1, stockType: "12Kg Gas Cylinder", arrivalTime: "10:30 AM", status: "On the way" },
    { id: 2, stockType: "5Kg Gas Cylinder", arrivalTime: "12:15 PM", status: "Delayed" },
  ]);

  const [pickupOrders, setPickupOrders] = useState([
    { id: 101, customer: "Kasun Perera", pickupTime: "09:45 AM", status: "Pending" },
    { id: 102, customer: "Ruwan Silva", pickupTime: "11:00 AM", status: "Picked Up" },
  ]);

  const [deliveryRoutes, setDeliveryRoutes] = useState([
    { id: 201, customer: "Nimal Fernando", address: "Colombo 05", eta: "1:15 PM" },
    { id: 202, customer: "Sanduni Jayawardena", address: "Negombo", eta: "2:00 PM" },
  ]);

  return (
    <div className="outlet-deliveries-page">
      <div className="page-header">
        <h2 className="page-title">Outlet Deliveries Dashboard</h2>
      </div>
      
      {/* Incoming Deliveries Section */}
      <div className="deliveries-section">
        <h3 className="section-title">Incoming Deliveries</h3>
        <table className="deliveries-table">
          <thead>
            <tr>
              <th>Stock Type</th>
              <th>Estimated Arrival</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {incomingDeliveries.map(delivery => (
              <tr key={delivery.id}>
                <td>{delivery.stockType}</td>
                <td>{delivery.arrivalTime}</td>
                <td>
                  <span className={`status-badge ${delivery.status === "Delayed" ? "status-delayed" : "status-ontheway"}`}>
                    {delivery.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Pickup Tracking */}
      <div className="deliveries-section">
        <h3 className="section-title">Order Pickup Tracking</h3>
        <table className="deliveries-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Pickup Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {pickupOrders.map(order => (
              <tr key={order.id}>
                <td>{order.customer}</td>
                <td>{order.pickupTime}</td>
                <td>
                  <span className={`status-badge ${order.status === "Picked Up" ? "status-pickedup" : "status-pending"}`}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Delivery Route Optimization */}
      <div className="deliveries-section">
        <h3 className="section-title">Delivery Route Optimization</h3>
        <table className="deliveries-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Address</th>
              <th>Estimated Arrival</th>
            </tr>
          </thead>
          <tbody>
            {deliveryRoutes.map(route => (
              <tr key={route.id}>
                <td>{route.customer}</td>
                <td>{route.address}</td>
                <td className="eta-text">{route.eta}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OutletDeliveries;