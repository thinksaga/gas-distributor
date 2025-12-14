import React, { useState } from "react";
import Card from "../Components/Card";
import Table from "../Components/Table";
import Badge from "../Components/Badge";
import Button from "../Components/Button";
import { FaDownload, FaCalendar } from "react-icons/fa";
import "./Paystatus.css";

const Paystatus = () => {
  const samplePayments = [
    {
      paymentID: "P12345",
      productName: "Gas Cylinder - 5kg",
      amount: "₹850",
      paymentDate: "2025-02-01",
      status: "Successful",
      deliveryDate: "2025-02-05",
    },
    {
      paymentID: "P12346",
      productName: "Gas Cylinder - 10kg",
      amount: "₹1200",
      paymentDate: "2025-02-03",
      status: "Failed",
      deliveryDate: "2025-02-07",
    },
    {
      paymentID: "P12347",
      productName: "Gas Cylinder - 12kg",
      amount: "₹1500",
      paymentDate: "2025-01-28",
      status: "Successful",
      deliveryDate: "2025-02-02",
    },
    {
      paymentID: "P12348",
      productName: "Gas Cylinder - 5kg",
      amount: "₹850",
      paymentDate: "2025-01-25",
      status: "Pending",
      deliveryDate: "2025-01-30",
    },
  ];

  const calculateDateDifference = (paymentDate, deliveryDate) => {
    const payment = new Date(paymentDate);
    const delivery = new Date(deliveryDate);
    const differenceInTime = delivery - payment;
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    return differenceInDays;
  };

  const getStatusVariant = (status) => {
    switch (status.toLowerCase()) {
      case "successful": return "success";
      case "pending": return "warning";
      case "failed": return "error";
      default: return "default";
    }
  };

  const columns = [
    { header: "Payment ID", accessor: "paymentID" },
    { header: "Product", accessor: "productName" },
    { header: "Amount", accessor: "amount" },
    {
      header: "Days to Delivery",
      accessor: "paymentDate",
      render: (value, row) => (
        <span>{calculateDateDifference(value, row.deliveryDate)} days</span>
      )
    },
    { header: "Payment Date", accessor: "paymentDate" },
    {
      header: "Status",
      accessor: "status",
      render: (value) => <Badge variant={getStatusVariant(value)}>{value}</Badge>
    },
    {
      header: "Receipt",
      accessor: "paymentID",
      render: (value) => (
        <Button variant="outline" size="sm">
          <FaDownload /> Download
        </Button>
      )
    }
  ];

  const totalSpent = samplePayments
    .filter(p => p.status === "Successful")
    .reduce((sum, p) => sum + parseInt(p.amount.replace("₹", "")), 0);

  return (
    <div className="paystatus-page">
      <div className="paystatus-header">
        <div>
          <h1 className="page-title">Payment History</h1>
          <p className="page-subtitle">View all your payment transactions</p>
        </div>
      </div>

      <div className="stats-row">
        <Card padding="lg" className="stat-card">
          <div className="stat-content">
            <div className="stat-icon success">₹</div>
            <div>
              <div className="stat-label">Total Spent</div>
              <div className="stat-value">₹{totalSpent}</div>
            </div>
          </div>
        </Card>

        <Card padding="lg" className="stat-card">
          <div className="stat-content">
            <div className="stat-icon primary">
              <FaCalendar />
            </div>
            <div>
              <div className="stat-label">Total Transactions</div>
              <div className="stat-value">{samplePayments.length}</div>
            </div>
          </div>
        </Card>
      </div>

      <Card padding="lg">
        <Table
          columns={columns}
          data={samplePayments}
          emptyMessage="No payment history found"
        />
      </Card>
    </div>
  );
};

export default Paystatus;
