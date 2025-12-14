import React, { useState } from "react";
import Card from "../../Components/Card";
import StatCard from "../../Components/StatCard";
import Table from "../../Components/Table";
import Button from "../../Components/Button";
import Input from "../../Components/Input";
import Badge from "../../Components/Badge";
import Modal from "../../Components/Modal";
import { FaBoxes, FaExclamationTriangle, FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import "./Adminstock.css";

const Adminstock = () => {
  const [stockData, setStockData] = useState([
    { id: 1, product: "2.3Kg Gas Cylinder", quantity: 2800, restock: "2025-02-01", availability: "In Stock" },
    { id: 2, product: "5Kg Gas Cylinder", quantity: 50, restock: "2025-01-21", availability: "Out of Stock" },
    { id: 3, product: "12.5Kg Gas Cylinder", quantity: 5300, restock: "2025-01-01", availability: "In Stock" },
    { id: 4, product: "37.5Kg Gas Cylinder", quantity: 100, restock: "2024-12-01", availability: "Limited" }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingStock, setEditingStock] = useState(null);
  const [formData, setFormData] = useState({ product: "", quantity: "", restock: "", availability: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    setEditingStock(null);
    setFormData({ product: "", quantity: "", restock: "", availability: "In Stock" });
    setShowModal(true);
  };

  const handleEdit = (stock) => {
    setEditingStock(stock);
    setFormData(stock);
    setShowModal(true);
  };

  const handleSubmit = () => {
    if (editingStock) {
      setStockData(stockData.map(s => s.id === editingStock.id ? { ...formData, id: s.id } : s));
    } else {
      setStockData([...stockData, { ...formData, id: Date.now() }]);
    }
    setShowModal(false);
    setFormData({ product: "", quantity: "", restock: "", availability: "" });
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this stock item?")) {
      setStockData(stockData.filter(s => s.id !== id));
    }
  };

  const getAvailabilityVariant = (availability) => {
    switch (availability) {
      case "In Stock": return "success";
      case "Out of Stock": return "error";
      case "Limited": return "warning";
      default: return "default";
    }
  };

  const columns = [
    { header: "Product", accessor: "product" },
    { header: "Quantity", accessor: "quantity", render: (value) => `${value} units` },
    { header: "Last Restock", accessor: "restock" },
    {
      header: "Availability",
      accessor: "availability",
      render: (value) => <Badge variant={getAvailabilityVariant(value)}>{value}</Badge>
    },
    {
      header: "Actions",
      accessor: "id",
      render: (value, row) => (
        <div className="action-buttons">
          <Button variant="outline" size="sm" onClick={() => handleEdit(row)}>
            <FaEdit /> Edit
          </Button>
          <Button variant="danger" size="sm" onClick={() => handleDelete(value)}>
            <FaTrash />
          </Button>
        </div>
      )
    }
  ];

  const totalStock = stockData.reduce((sum, item) => sum + parseInt(item.quantity), 0);
  const lowStock = stockData.filter(item => item.availability === "Out of Stock" || item.availability === "Limited").length;

  return (
    <div className="adminstock-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Stock Management</h1>
          <p className="page-subtitle">Manage your inventory and stock levels</p>
        </div>
        <Button variant="primary" onClick={handleAdd}>
          <FaPlus /> Add New Stock
        </Button>
      </div>

      <div className="stats-grid">
        <StatCard
          title="Total Categories"
          value="14"
          icon={<FaBoxes />}
          color="primary"
          subtitle="Last 7 days"
        />
        <StatCard
          title="Total Products"
          value={totalStock.toLocaleString()}
          icon={<FaBoxes />}
          color="success"
          subtitle="In inventory"
        />
        <StatCard
          title="Low Stock Items"
          value={lowStock}
          icon={<FaExclamationTriangle />}
          color="warning"
          subtitle="Needs attention"
        />
      </div>

      <Card padding="lg">
        <Table
          columns={columns}
          data={stockData}
          emptyMessage="No stock items found"
        />
      </Card>

      {showModal && (
        <Modal onClose={() => setShowModal(false)} size="md">
          <div className="stock-modal">
            <h2>{editingStock ? "Edit Stock" : "Add New Stock"}</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
              <Input
                label="Product Name"
                type="text"
                name="product"
                value={formData.product}
                onChange={handleChange}
                required
              />
              <Input
                label="Quantity"
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
              />
              <Input
                label="Last Restock Date"
                type="date"
                name="restock"
                value={formData.restock}
                onChange={handleChange}
                required
              />
              <Input
                label="Availability"
                type="select"
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                required
              >
                <option value="In Stock">In Stock</option>
                <option value="Out of Stock">Out of Stock</option>
                <option value="Limited">Limited</option>
              </Input>
              <div className="modal-actions">
                <Button type="button" variant="outline" onClick={() => setShowModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary">
                  {editingStock ? "Update" : "Add"} Stock
                </Button>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Adminstock;
