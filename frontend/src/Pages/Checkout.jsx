import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "../Components/Card";
import Button from "../Components/Button";
import Input from "../Components/Input";
import Modal from "../Components/Modal";
import { FaCheckCircle, FaShoppingCart } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "./Checkout.css";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;
  const selectedBranch = location.state?.selectedBranch;

  const [quantity, setQuantity] = useState(1);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!product) {
    return (
      <div className="checkout-error">
        <Card padding="xl">
          <h2>Product not found!</h2>
          <p>Please go back and select a product</p>
          <Button variant="primary" onClick={() => navigate("/product-list")}>
            Back to Products
          </Button>
        </Card>
      </div>
    );
  }

  const totalPrice = product.price * quantity;

  const handlePlaceOrder = async () => {
    if (!deliveryAddress || !contactNumber) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsProcessing(true);

    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccessModal(true);
      toast.success("Order placed successfully!");
    }, 2000);
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    navigate("/user-dashboard");
  };

  return (
    <div className="checkout-page">
      <ToastContainer />

      <div className="checkout-container">
        <h1 className="checkout-title">Checkout</h1>

        <div className="checkout-grid">
          {/* Order Summary */}
          <div className="order-summary-section">
            <Card padding="lg">
              <h2 className="section-title">Order Summary</h2>

              <div className="product-summary">
                <img
                  src={product.image || "/gas-cylinder-placeholder.png"}
                  alt={product.name}
                  className="summary-image"
                />
                <div className="summary-details">
                  <h3 className="summary-product-name">{product.name}</h3>
                  <p className="summary-price">₹{product.price} per unit</p>
                  {selectedBranch && (
                    <p className="summary-branch">Branch: {selectedBranch}</p>
                  )}
                </div>
              </div>

              <div className="quantity-selector">
                <label className="quantity-label">Quantity:</label>
                <div className="quantity-controls">
                  <button
                    className="qty-btn"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </button>
                  <span className="qty-value">{quantity}</span>
                  <button
                    className="qty-btn"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="price-breakdown">
                <div className="price-row">
                  <span>Subtotal:</span>
                  <span>₹{totalPrice}</span>
                </div>
                <div className="price-row">
                  <span>Delivery Fee:</span>
                  <span>₹50</span>
                </div>
                <div className="price-row total-row">
                  <span>Total:</span>
                  <span>₹{totalPrice + 50}</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Delivery & Payment */}
          <div className="delivery-payment-section">
            <Card padding="lg" className="delivery-card">
              <h2 className="section-title">Delivery Information</h2>

              <Input
                label="Delivery Address"
                type="textarea"
                placeholder="Enter your complete delivery address"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                required
                rows={3}
              />

              <Input
                label="Contact Number"
                type="tel"
                placeholder="Enter your contact number"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                required
              />
            </Card>

            <Card padding="lg" className="payment-card">
              <h2 className="section-title">Payment Method</h2>

              <div className="payment-options">
                <label className="payment-option">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span>Cash on Delivery</span>
                </label>

                <label className="payment-option">
                  <input
                    type="radio"
                    name="payment"
                    value="online"
                    checked={paymentMethod === "online"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span>Online Payment</span>
                </label>
              </div>
            </Card>

            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={handlePlaceOrder}
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : `Place Order - ₹${totalPrice + 50}`}
            </Button>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <Modal onClose={handleModalClose} size="md">
          <div className="success-modal-content">
            <FaCheckCircle className="success-icon" />
            <h2>Order Placed Successfully!</h2>
            <p>Your order has been confirmed and will be delivered soon.</p>
            <p className="order-number">Order #: {Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
            <Button variant="primary" onClick={handleModalClose}>
              Go to Dashboard
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Checkout;
