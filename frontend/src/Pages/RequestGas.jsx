import React, { useState, useEffect } from "react";
import Card from "../Components/Card";
import Button from "../Components/Button";
import Input from "../Components/Input";
import { FaGasPump, FaMapMarkerAlt, FaInfoCircle } from "react-icons/fa";
import { fetchOutlets } from "../services/outletService";
import { fetchProducts } from "../services/productService";
import { requestGas } from "../services/userService";
import { toast } from "react-toastify";
import "./RequestGas.css";

const RequestGas = () => {
  const [formData, setFormData] = useState({
    productId: "",
    quantity: 1,
    outletId: ""
  });
  const [outlets, setOutlets] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingOutlets, setLoadingOutlets] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    loadOutlets();
    loadProducts();
  }, []);

  const loadOutlets = async () => {
    try {
      const data = await fetchOutlets();
      setOutlets(data);
    } catch (error) {
      console.error("Failed to load outlets", error);
      toast.error("Failed to load outlets");
    } finally {
      setLoadingOutlets(false);
    }
  };

  const loadProducts = async () => {
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (error) {
      console.error("Failed to load products", error);
      toast.error("Failed to load products");
    } finally {
      setLoadingProducts(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Update selected product details
    if (name === "productId") {
      const product = products.find(p => p._id === value);
      setSelectedProduct(product);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.productId || !formData.outletId) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (formData.quantity < 1 || formData.quantity > 10) {
      toast.error("Quantity must be between 1 and 10");
      return;
    }

    setLoading(true);
    try {
      const result = await requestGas(formData);
      toast.success(`Gas request submitted successfully! Your token: ${result.data.token.token}`);
      
      // Reset form
      setFormData({
        productId: "",
        quantity: 1,
        outletId: ""
      });
      setSelectedProduct(null);
    } catch (error) {
      console.error("Request failed", error);
      toast.error(error.response?.data?.message || "Failed to submit request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    if (selectedProduct && formData.quantity) {
      return selectedProduct.price * formData.quantity;
    }
    return 0;
  };

  return (
    <div className="request-gas-page">
      <div className="request-gas-header">
        <h1 className="page-title">Request Gas Cylinder</h1>
        <p className="page-subtitle">Submit a request for gas delivery to your preferred outlet</p>
      </div>

      <div className="request-form-container">
        <Card padding="xl">
          <form onSubmit={handleSubmit} className="request-form">
            <div className="form-section">
              <div className="section-icon">
                <FaGasPump />
              </div>
              <h3 className="section-title">Gas Product</h3>

              <div className="form-group">
                <label className="form-label">Select Gas Cylinder *</label>
                {loadingProducts ? (
                  <div className="loading-inline">
                    <div className="spinner-sm"></div>
                    <span>Loading products...</span>
                  </div>
                ) : (
                  <select
                    name="productId"
                    value={formData.productId}
                    onChange={handleInputChange}
                    className="form-select"
                    required
                  >
                    <option value="">Choose gas cylinder type</option>
                    {products.map(product => (
                      <option key={product._id} value={product._id}>
                        {product.name} - ₹{product.price} ({product.weight || product.type})
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {selectedProduct && (
                <div className="product-details">
                  <FaInfoCircle />
                  <div className="product-info">
                    <p><strong>{selectedProduct.name}</strong></p>
                    <p>{selectedProduct.description}</p>
                    <p className="price-info">Price: ₹{selectedProduct.price} per cylinder</p>
                  </div>
                </div>
              )}

              <div className="form-group">
                <label className="form-label">Quantity *</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  min="1"
                  max="10"
                  className="form-input"
                  required
                />
                <small className="form-hint">Maximum 10 cylinders per request</small>
              </div>

              {selectedProduct && formData.quantity > 0 && (
                <div className="total-amount">
                  <strong>Total Amount: ₹{calculateTotal()}</strong>
                </div>
              )}
            </div>

            <div className="form-section">
              <div className="section-icon">
                <FaMapMarkerAlt />
              </div>
              <h3 className="section-title">Delivery Outlet</h3>

              {loadingOutlets ? (
                <div className="loading-outlets">
                  <div className="spinner"></div>
                  <p>Loading outlets...</p>
                </div>
              ) : (
                <div className="form-group">
                  <label className="form-label">Select Outlet *</label>
                  <select
                    name="outletId"
                    value={formData.outletId}
                    onChange={handleInputChange}
                    className="form-select"
                    required
                  >
                    <option value="">Choose your delivery outlet</option>
                    {outlets.map(outlet => (
                      <option key={outlet._id} value={outlet._id}>
                        {outlet.name} - {outlet.location || outlet.city}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <div className="form-actions">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                disabled={loading || loadingOutlets || loadingProducts}
              >
                {loading ? "Submitting Request..." : "Submit Gas Request"}
              </Button>
            </div>
          </form>
        </Card>

        <Card className="info-card" padding="lg">
          <h4 className="info-title">📋 How it works:</h4>
          <ol className="info-steps">
            <li>Select your preferred gas cylinder type and quantity</li>
            <li>Choose your nearest delivery outlet</li>
            <li>Submit your request to receive a unique token</li>
            <li>Present the token at the outlet for gas collection</li>
            <li>Track your request status in the "Request Status" section</li>
          </ol>

          <div className="info-note">
            <FaInfoCircle />
            <p><strong>Note:</strong> Tokens are valid for 24 hours from the time of generation. Please collect your gas cylinder within this period.</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RequestGas;