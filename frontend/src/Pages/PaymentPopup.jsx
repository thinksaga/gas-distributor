import React, { useState } from "react";
import Modal from "../Components/Modal";
import Input from "../Components/Input";
import Button from "../Components/Button";
import { FaCreditCard, FaLock } from "react-icons/fa";
import "./PaymentPopup.css";

const PaymentPopup = ({ onClose, amount = 0 }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onClose(true); // Pass true to indicate successful payment
    }, 2000);
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const handleCardNumberChange = (e) => {
    setCardNumber(formatCardNumber(e.target.value));
  };

  const formatExpiry = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.slice(0, 2) + ' / ' + v.slice(2, 4);
    }
    return v;
  };

  const handleExpiryChange = (e) => {
    setExpiry(formatExpiry(e.target.value));
  };

  return (
    <Modal onClose={() => onClose(false)} size="md">
      <div className="payment-popup">
        <div className="payment-header">
          <FaCreditCard className="payment-icon" />
          <h2>Payment Details</h2>
          {amount > 0 && (
            <p className="payment-amount">Amount: ₹{amount}</p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="payment-form">
          <Input
            label="Card Number"
            type="text"
            placeholder="1234 5678 9012 3456"
            value={cardNumber}
            onChange={handleCardNumberChange}
            maxLength="19"
            required
            icon={<FaCreditCard />}
          />

          <div className="form-row">
            <Input
              label="Expiry Date"
              type="text"
              placeholder="MM / YY"
              value={expiry}
              onChange={handleExpiryChange}
              maxLength="7"
              required
            />

            <Input
              label="CVC"
              type="text"
              placeholder="123"
              value={cvc}
              onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').slice(0, 3))}
              maxLength="3"
              required
              icon={<FaLock />}
            />
          </div>

          <Input
            label="Postal Code"
            type="text"
            placeholder="110001"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
          />

          <div className="payment-actions">
            <Button
              type="button"
              variant="outline"
              onClick={() => onClose(false)}
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : "Submit Payment"}
            </Button>
          </div>

          <div className="payment-security">
            <FaLock /> Your payment information is secure and encrypted
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default PaymentPopup;
