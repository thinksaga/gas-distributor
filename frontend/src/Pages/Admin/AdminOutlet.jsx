import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import API_BASE_URL from "../../api.js";
import Card from "../../Components/Card";
import Table from "../../Components/Table";
import Button from "../../Components/Button";
import Badge from "../../Components/Badge";
import { FaStore, FaDownload } from "react-icons/fa";
import "./Adminstock.css";

const AdminOutlet = () => {
    const navigate = useNavigate();
    const [outletsData, setOutletsData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`${API_BASE_URL}/outlet`)
            .then((response) => {
                setOutletsData(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                toast.error("Failed to load outlets");
                setLoading(false);
            });
    }, []);

    const handleStatusChange = (id, newStatus) => {
        axios.patch(`${API_BASE_URL}/outlet/${id}`, { status: newStatus })
            .then((response) => {
                toast.success(response.data.message);
                setOutletsData(outletsData.map(outlet =>
                    outlet._id === id ? { ...outlet, stock: { ...outlet.stock, status: newStatus } } : outlet
                ));
            })
            .catch((error) => {
                toast.error("An error occurred. Please try again.");
                console.log(error);
            });
    };

    const downloadCSV = () => {
        const csvContent = [
            ["Outlet ID", "Name", "Location", "Quantity", "Delivery Date", "Status"],
            ...outletsData.map(outlet => [
                outlet._id,
                outlet.name,
                outlet.location,
                outlet.stock?.quantity || 0,
                outlet.stock?.date || "N/A",
                outlet.stock?.status || "N/A"
            ])
        ]
            .map(e => e.join(","))
            .join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "Outlet_Report.csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const getStatusVariant = (status) => {
        switch (status?.toLowerCase()) {
            case "delivered": return "success";
            case "approved": return "info";
            case "in progress": return "warning";
            case "pending": return "warning";
            case "cancelled": return "error";
            default: return "default";
        }
    };

    const columns = [
        { header: "Outlet ID", accessor: "_id", render: (value) => value.substring(0, 8) + "..." },
        { header: "Name", accessor: "name" },
        { header: "Location", accessor: "location" },
        { header: "Quantity", accessor: "stock", render: (value) => value?.quantity || 0 },
        { header: "Delivery Date", accessor: "stock", render: (value) => value?.date || "N/A" },
        {
            header: "Status",
            accessor: "stock",
            render: (value) => <Badge variant={getStatusVariant(value?.status)}>{value?.status || "N/A"}</Badge>
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
            <ToastContainer />
            <div className="page-header">
                <div>
                    <h1 className="page-title">Outlet Management</h1>
                    <p className="page-subtitle">Manage all outlets and their inventory</p>
                </div>
                <div style={{ display: "flex", gap: "var(--spacing-md)" }}>
                    <Button variant="outline" onClick={() => navigate("/outlet-list")}>
                        <FaStore /> View All Outlets
                    </Button>
                    <Button variant="primary" onClick={downloadCSV}>
                        <FaDownload /> Download Report
                    </Button>
                </div>
            </div>

            <Card padding="lg">
                <Table
                    columns={columns}
                    data={outletsData}
                    emptyMessage="No outlets found"
                />
            </Card>
        </div>
    );
};

export default AdminOutlet;
