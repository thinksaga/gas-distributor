import React, { useState, useEffect } from "react";
import Card from "../Components/Card";
import Table from "../Components/Table";
import Badge from "../Components/Badge";
import Button from "../Components/Button";
import Modal from "../Components/Modal";
import { FaEye, FaFilter, FaCopy, FaCheckCircle, FaClock, FaTimesCircle, FaTruck } from "react-icons/fa";
import { getUserRequests } from "../services/userService";
import { toast } from "react-toastify";
import "./Reqstatus.css";

const Requeststatus = () => {
  const [filter, setFilter] = useState("all");
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showModal, setShowModal] = useState(false);

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

  const viewDetails = (request) => {
    setSelectedRequest(request);
    setShowModal(true);
  };

  const filteredRequests = filter === "all"
    ? requests
    : requests.filter(request => request.status.toLowerCase() === filter.toLowerCase());

  const getStatusVariant = (status) => {
    switch (status.toLowerCase()) {
      case "approved": return "success";
      case "pending": return "warning";
      case "rejected": return "error";
      case "delivered": return "success";
      case "cancelled": return "error";
      default: return "default";
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "approved": return <FaCheckCircle />;
      case "pending": return <FaClock />;
      case "rejected": return <FaTimesCircle />;
      case "delivered": return <FaTruck />;
      case "cancelled": return <FaTimesCircle />;
      default: return null;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const columns = [
    { 
      header: "Request ID", 
      accessor: "_id", 
      render: (value) => (
        <span className="request-id-short" title={value}>
          {value.slice(-8).toUpperCase()}
        </span>
      )
    },
    { 
      header: "Product", 
      accessor: "productId",
      render: (value, row) => {
        if (value && value.name) {
          return (
            <div className="product-cell">
              <strong>{value.name}</strong>
              <small>₹{value.price} | {value.weight || value.type}</small>
            </div>
          );
        }
        return row.gasType || "N/A";
      }
    },
    { 
      header: "Qty", 
      accessor: "quantity",
      render: (value) => <span className="quantity-badge">{value}</span>
    },
    { 
      header: "Outlet", 
      accessor: "outletId",
      render: (value) => value ? `${value.name}, ${value.city}` : "N/A"
    },
    { 
      header: "Date", 
      accessor: "createdAt", 
      render: formatDate 
    },
    {
      header: "Status",
      accessor: "status",
      render: (value) => (
        <Badge variant={getStatusVariant(value)}>
          {getStatusIcon(value)} {value}
        </Badge>
      )
    },
    {
      header: "Token",
      accessor: "tokenId",
      render: (value, row) => {
        if (row.status === "approved" || row.status === "pending") {
          if (value && value.token) {
            return (
              <div className="token-display">
                <code className="token-code">{value.token}</code>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => copyToken(value.token)}
                  title="Copy token"
                >
                  <FaCopy />
                </Button>
              </div>
            );
          }
        }
        return <span className="no-token">-</span>;
      }
    },
    {
      header: "Actions",
      accessor: "_id",
      render: (value, row) => (
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => viewDetails(row)}
        >
          <FaEye /> Details
        </Button>
      )
    }
  ];

  return (
    <div className="reqstatus-page">
      <div className="reqstatus-header">
        <div>
          <h1 className="page-title">My Gas Requests</h1>
          <p className="page-subtitle">Track all your gas cylinder requests and tokens</p>
        </div>
        <Button variant="primary" onClick={loadRequests}>
          Refresh
        </Button>
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
              All ({requests.length})
            </Button>
            <Button
              variant={filter === "pending" ? "primary" : "outline"}
              size="sm"
              onClick={() => setFilter("pending")}
            >
              Pending ({requests.filter(r => r.status === "pending").length})
            </Button>
            <Button
              variant={filter === "approved" ? "primary" : "outline"}
              size="sm"
              onClick={() => setFilter("approved")}
            >
              Approved ({requests.filter(r => r.status === "approved").length})
            </Button>
            <Button
              variant={filter === "rejected" ? "primary" : "outline"}
              size="sm"
              onClick={() => setFilter("rejected")}
            >
              Rejected ({requests.filter(r => r.status === "rejected").length})
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
            emptyMessage="No requests found. Submit a gas request to get started!"
          />
        )}
      </Card>

      {/* Request Details Modal */}
      {showModal && selectedRequest && (
        <Modal 
          title="Request Details" 
          onClose={() => setShowModal(false)}
          size="lg"
        >
          <div className="request-details-modal">
            <div className="detail-section">
              <h3>Request Information</h3>
              <div className="detail-grid">
                <div className="detail-item">
                  <label>Request ID:</label>
                  <span>{selectedRequest._id}</span>
                </div>
                <div className="detail-item">
                  <label>Status:</label>
                  <Badge variant={getStatusVariant(selectedRequest.status)}>
                    {getStatusIcon(selectedRequest.status)} {selectedRequest.status}
                  </Badge>
                </div>
                <div className="detail-item">
                  <label>Request Date:</label>
                  <span>{formatDate(selectedRequest.createdAt)}</span>
                </div>
              </div>
            </div>

            {selectedRequest.productId && (
              <div className="detail-section">
                <h3>Product Details</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <label>Product:</label>
                    <span>{selectedRequest.productId.name}</span>
                  </div>
                  <div className="detail-item">
                    <label>Price:</label>
                    <span>₹{selectedRequest.productId.price}</span>
                  </div>
                  <div className="detail-item">
                    <label>Quantity:</label>
                    <span>{selectedRequest.quantity}</span>
                  </div>
                  <div className="detail-item">
                    <label>Total Amount:</label>
                    <span className="total-amount">
                      ₹{selectedRequest.productId.price * selectedRequest.quantity}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {selectedRequest.outletId && (
              <div className="detail-section">
                <h3>Outlet Information</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <label>Outlet Name:</label>
                    <span>{selectedRequest.outletId.name}</span>
                  </div>
                  <div className="detail-item">
                    <label>Location:</label>
                    <span>{selectedRequest.outletId.location || selectedRequest.outletId.city}</span>
                  </div>
                  <div className="detail-item">
                    <label>City:</label>
                    <span>{selectedRequest.outletId.city}</span>
                  </div>
                </div>
              </div>
            )}

            {selectedRequest.tokenId && (
              <div className="detail-section token-section">
                <h3>Collection Token</h3>
                <div className="token-display-large">
                  <div className="token-code-large">{selectedRequest.tokenId.token}</div>
                  <Button 
                    variant="primary" 
                    onClick={() => copyToken(selectedRequest.tokenId.token)}
                  >
                    <FaCopy /> Copy Token
                  </Button>
                </div>
                {selectedRequest.tokenId.expireDate && (
                  <p className="token-expiry">
                    <FaClock /> Expires: {formatDate(selectedRequest.tokenId.expireDate)}
                  </p>
                )}
                <p className="token-note">
                  Present this token at the outlet to collect your gas cylinder
                </p>
              </div>
            )}

            <div className="modal-actions">
              <Button variant="outline" onClick={() => setShowModal(false)}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Requeststatus;
