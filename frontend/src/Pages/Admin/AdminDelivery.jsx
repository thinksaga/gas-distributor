import React, { useState } from "react";
import Card from "../../Components/Card";
import Table from "../../Components/Table";
import Button from "../../Components/Button";
import Badge from "../../Components/Badge";
import Input from "../../Components/Input";
import { FaTruck, FaMapMarkerAlt, FaFilter } from "react-icons/fa";
import "./Adminstock.css";

const AdminDelivery = () => {
  const [filterStatus, setFilterStatus] = useState("all");

  const deliveries = [
    { id: "DEL001", customer: "John Doe", address: "123 Main St, Colombo", product: "12.5Kg Cylinder", status: "In Transit", eta: "2025-02-10 14:00" },
    { id: "DEL002", customer: "Jane Smith", address: "456 Park Ave, Kandy", product: "5Kg Cylinder", status: "Delivered", eta: "2025-02-09 10:30" },
    { id: "DEL003", customer: "Bob Johnson", address: "789 Lake Rd, Galle", product: "2.3Kg Cylinder", status: "Pending", eta: "2025-02-11 16:00" },
    { id: "DEL004", customer: "Alice Brown", address: "321 Hill St, Jaffna", product: "12.5Kg Cylinder", status: "In Transit", eta: "2025-02-10 11:00" },
  ];

  const filteredDeliveries = filterStatus === "all"
    ? deliveries
    : deliveries.filter(d => d.status.toLowerCase() === filterStatus.toLowerCase());

  const getStatusVariant = (status) => {
    switch (status.toLowerCase()) {
      case "delivered": return "success";
      case "in transit": return "info";
      case "pending": return "warning";
      case "cancelled": return "error";
      default: return "default";
    }
  };

  const columns = [
    { header: "Delivery ID", accessor: "id" },
    { header: "Customer", accessor: "customer" },
    { header: "Address", accessor: "address" },
    { header: "Product", accessor: "product" },
    { header: "ETA", accessor: "eta" },
    {
      header: "Status",
      accessor: "status",
      render: (value) => <Badge variant={getStatusVariant(value)}>{value}</Badge>
    },
    {
      header: "Actions",
      accessor: "id",
      render: () => (
        <Button variant="outline" size="sm">
          <FaMapMarkerAlt /> Track
        </Button>
      )
    }
  ];

  return (
    <div className="adminstock-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Delivery Tracking</h1>
          <p className="page-subtitle">Monitor all deliveries in real-time</p>
        </div>
      </div>

      <Card padding="lg">
        <div className="filter-section">
          <div className="filter-label">
            <FaFilter /> Filter by Status:
          </div>
          <div className="filter-buttons">
            <Button
              variant={filterStatus === "all" ? "primary" : "outline"}
              size="sm"
              onClick={() => setFilterStatus("all")}
            >
              All
            </Button>
            <Button
              variant={filterStatus === "pending" ? "primary" : "outline"}
              size="sm"
              onClick={() => setFilterStatus("pending")}
            >
              Pending
            </Button>
            <Button
              variant={filterStatus === "in transit" ? "primary" : "outline"}
              size="sm"
              onClick={() => setFilterStatus("in transit")}
            >
              In Transit
            </Button>
            <Button
              variant={filterStatus === "delivered" ? "primary" : "outline"}
              size="sm"
              onClick={() => setFilterStatus("delivered")}
            >
              Delivered
            </Button>
          </div>
        </div>

        <Table
          columns={columns}
          data={filteredDeliveries}
          emptyMessage="No deliveries found"
        />
      </Card>
    </div>
  );
};

export default AdminDelivery;