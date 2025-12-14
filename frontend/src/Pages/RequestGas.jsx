import React, { useState, useEffect } from "react";
import Card from "../Components/Card";
import Button from "../Components/Button";
import Input from "../Components/Input";
import { FaGasPump, FaMapMarkerAlt } from "react-icons/fa";
import { fetchOutlets } from "../services/outletService";
import { requestGas } from "../services/userService";
import { toast } from "react-toastify";
import "./RequestGas.css";

const RequestGas = () => {
  const [formData, setFormData] = useState({
    gasType: "",
    quantity: 1,
    outletId: ""
  });
  const [outlets, setOutlets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingOutlets, setLoadingOutlets] = useState(true);

  useEffect(() => {
    loadOutlets();
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.gasType || !formData.outletId) {
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
      toast.success("Gas request submitted successfully! Your token: " + result.data.token.token);
      // Reset form
      setFormData({
        gasType: "",
        quantity: 1,
        outletId: ""
      });
    } catch (error) {
      console.error("Request failed", error);
      toast.error("Failed to submit request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const gasTypes = [
    { value: "LPG", label: "LPG (Liquefied Petroleum Gas) - Domestic" },
    { value: "Commercial_LPG", label: "LPG (Liquefied Petroleum Gas) - Commercial" },
    { value: "PNG", label: "PNG (Piped Natural Gas)" },
    { value: "CNG", label: "CNG (Compressed Natural Gas)" }
  ];

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
              <h3 className="section-title">Gas Details</h3>

              <div className="form-group">
                <Input
                  type="select"
                  label="Gas Type"
                  name="gasType"
                  value={formData.gasType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select gas type</option>
                  {gasTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </Input>
              </div>

              <div className="form-group">
                <Input
                  type="number"
                  label="Quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  min="1"
                  max="10"
                  required
                />
              </div>
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
                  <Input
                    type="select"
                    label="Select Outlet"
                    name="outletId"
                    value={formData.outletId}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Choose your delivery outlet</option>
                    {outlets.map(outlet => (
                      <option key={outlet._id} value={outlet._id}>
                        {outlet.name} - {outlet.city}
                      </option>
                    ))}
                  </Input>
                </div>
              )}
            </div>

            <div className="form-actions">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                disabled={loading || loadingOutlets}
              >
                {loading ? "Submitting Request..." : "Submit Gas Request"}
              </Button>
            </div>
          </form>
        </Card>

        <Card className="info-card" padding="lg">
          <h4 className="info-title">How it works:</h4>
          <ol className="info-steps">
            <li>Fill in your gas requirements and select a delivery outlet</li>
            <li>Submit your request to receive a unique token</li>
            <li>Present the token at the outlet for gas collection</li>
            <li>Track your request status in the "My Requests" section</li>
          </ol>
        </Card>
      </div>
    </div>
  );
};

export default RequestGas;