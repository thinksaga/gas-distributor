import React, { useState, useEffect } from "react";
import Card from "../Components/Card";
import Table from "../Components/Table";
import Badge from "../Components/Badge";
import Button from "../Components/Button";
import { FaEye, FaFilter, FaCopy } from "react-icons/fa";
import { getUserRequests } from "../services/userService";
import { toast } from "react-toastify";
import "./Reqstatus.css";

const Requeststatus = () => {
  const [filter, setFilter] = useState("all");
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      const data = await getUserRequests();
      setRequests(data);
    } catch (error) {
      console.error("Failed to load requests", error);
      toast.error("Failed to load requests");
    } finally {
      setLoading(false);
    }
  };

  const copyToken = (token) => {
    navigator.clipboard.writeText(token);
    toast.success("Token copied to clipboard!");
  };

  const filteredRequests = filter === "all"
    ? requests
    : requests.filter(request => request.status.toLowerCase() === filter.toLowerCase());

  const getStatusVariant = (status) => {
    switch (status.toLowerCase()) {
      case "approved": return "success";
      case "pending": return "warning";
      case "rejected": return "error";
      default: return "default";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const columns = [
    { header: "Request ID", accessor: "_id", render: (value) => value.slice(-6) },
    { header: "Gas Type", accessor: "gasType" },
    { header: "Quantity", accessor: "quantity" },
    { header: "Request Date", accessor: "requestDate", render: formatDate },
    {
      header: "Status",
      accessor: "status",
      render: (value) => <Badge variant={getStatusVariant(value)}>{value}</Badge>
    },
    {
      header: "Token",
      accessor: "tokenId",
      render: (value, row) => {
        if (row.status === "approved" && value) {
          return (
            <div className="token-display">
              <span className="token-code">{value.token}</span>
              <Button variant="outline" size="sm" onClick={() => copyToken(value.token)}>
                <FaCopy /> Copy
              </Button>
            </div>
          );
        }
        return <span className="no-token">Not available</span>;
      }
    }
  ];

  return (
    <div className="reqstatus-page">
      <div className="reqstatus-header">
        <div>
          <h1 className="page-title">My Requests</h1>
          <p className="page-subtitle">Track all your gas cylinder requests</p>
        </div>
      </div>

      <Card padding="lg">
        <div className="filter-section">
          <div className="filter-label">
            <FaFilter /> Filter by Status:
          </div>
          <div className="filter-buttons">
            <Button
              variant={filter === "all" ? "primary" : "outline"}
              size="sm"
              onClick={() => setFilter("all")}
            >
              All
            </Button>
            <Button
              variant={filter === "pending" ? "primary" : "outline"}
              size="sm"
              onClick={() => setFilter("pending")}
            >
              Pending
            </Button>
            <Button
              variant={filter === "approved" ? "primary" : "outline"}
              size="sm"
              onClick={() => setFilter("approved")}
            >
              Approved
            </Button>
            <Button
              variant={filter === "rejected" ? "primary" : "outline"}
              size="sm"
              onClick={() => setFilter("rejected")}
            >
              Rejected
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading requests...</p>
          </div>
        ) : (
          <Table
            columns={columns}
            data={filteredRequests}
            emptyMessage="No requests found"
          />
        )}
      </Card>
    </div>
  );
};

export default Requeststatus;
