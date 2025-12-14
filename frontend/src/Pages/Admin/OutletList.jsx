import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../../api.js";
import Card from "../../Components/Card";
import Table from "../../Components/Table";
import Button from "../../Components/Button";
import Badge from "../../Components/Badge";
import { FaStore, FaPlus } from "react-icons/fa";
import "./Adminstock.css";

const OutletList = () => {
  const navigate = useNavigate();
  const [outlets, setOutlets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/outlet`)
      .then((response) => {
        setOutlets(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const columns = [
    { header: "Outlet ID", accessor: "_id", render: (value) => value.substring(0, 8) + "..." },
    { header: "Name", accessor: "name" },
    { header: "Location", accessor: "location" },
    { header: "City", accessor: "city" },
    {
      header: "Stock",
      accessor: "stock",
      render: (value) => value?.quantity ? `${value.quantity} units` : "0 units"
    },
    {
      header: "Status",
      accessor: "stock",
      render: (value) => {
        const status = value?.status || "Active";
        const variant = status === "Active" ? "success" : "warning";
        return <Badge variant={variant}>{status}</Badge>;
      }
    },
    {
      header: "Actions",
      accessor: "_id",
      render: () => (
        <Button variant="outline" size="sm">
          View Details
        </Button>
      )
    }
  ];

  if (loading) {
    return (
      <div className="adminstock-page">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading outlets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="adminstock-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">All Outlets</h1>
          <p className="page-subtitle">Complete list of distribution outlets</p>
        </div>
        <Button variant="primary" onClick={() => navigate("/admin-outlet")}>
          <FaStore /> Manage Outlets
        </Button>
      </div>

      <Card padding="lg">
        <Table
          columns={columns}
          data={outlets}
          emptyMessage="No outlets found"
        />
      </Card>
    </div>
  );
};

export default OutletList;
