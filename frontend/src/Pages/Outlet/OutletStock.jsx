import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit } from "react-icons/fa";
import { getOutletStock, updateStock } from "../../services/outletService";
import { toast } from "react-toastify";
import "./OutletStock.css";

const OutletStock = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadStock();
  }, []);

  const loadStock = async () => {
    try {
      const data = await getOutletStock();
      setProducts(data.map(stock => ({
        productID: stock.productId._id,
        productName: stock.productId.name,
        productType: stock.productId.type,
        pricePerUnit: stock.productId.price,
        image: stock.productId.image,
        availableQuantity: stock.quantity,
        stockStatus: stock.quantity < 100 ? "Low Stock" : "In Stock"
      })));
    } catch (error) {
      console.error("Failed to load stock", error);
      toast.error("Failed to load stock");
    }
  };

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    productID: "",
    productName: "",
    productType: "",
    pricePerUnit: "",
    image: "",
    availableQuantity: "",
    stockStatus: "",
  });
  const [requests, setRequests] = useState([]); // State to track stock requests

  // Define low and high stock thresholds
  const LOW_STOCK_THRESHOLD = 100;
  const HIGH_STOCK_THRESHOLD = 200;


  // Function to handle stock status based on quantity
  const handleStockStatus = (quantity) => {
    if (quantity < LOW_STOCK_THRESHOLD) {
      return "Low Stock";
    } else if (quantity > HIGH_STOCK_THRESHOLD) {
      return "In Stock";
    } else {
      return "Normal Stock";
    }
  };

  // Function to add a new product
  const handleAddProduct = () => {
    setProducts([...products, { ...newProduct, stockStatus: handleStockStatus(newProduct.availableQuantity) }]);
    setNewProduct({
      productID: "",
      productName: "",
      productType: "",
      pricePerUnit: "",
      image: "",
      availableQuantity: "",
      stockStatus: "",
    });
    setShowAddModal(false);
  };

  // Function to edit a product
  const handleEditProduct = () => {
    setProducts(
      products.map((product) =>
        product.productID === selectedProduct.productID
          ? { ...selectedProduct, stockStatus: handleStockStatus(selectedProduct.availableQuantity) }
          : product
      )
    );
    setShowEditModal(false);
  };

  // Function to handle stock request
  const handleRequestStock = (productID) => {
    const product = products.find((product) => product.productID === productID);
    if (product) {
      const requestedQuantity = prompt(
        `How many units of ${product.productName} would you like to request?`
      );
      
      if (requestedQuantity) {
        const quantity = parseInt(requestedQuantity, 10);

        // Handle invalid input (non-numeric or empty value)
        if (isNaN(quantity) || quantity <= 0) {
          alert("Please enter a valid number.");
          return;
        }

        // Check if stock is below the threshold
        if (product.availableQuantity < LOW_STOCK_THRESHOLD) {
          product.stockStatus = "Low Stock";
        }

        setRequests([
          ...requests,
          {
            productID: productID,
            productName: product.productName,
            quantityRequested: quantity,
          },
        ]);
        alert(`Requested ${quantity} units of ${product.productName}`);
      }
    }
  };

  return (
    <div className="outlet-stock-page">
      <div className="page-header">
        <h2 className="page-title">Stock Management</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="add-btn"
        >
          <FaPlus /> Add Product
        </button>
      </div>

      <div className="stock-grid">
        {products.map((product) => (
          <div key={product.productID} className="stock-card">
            <div className="stock-image-container">
              <img src={product.image} alt={product.productName} className="stock-image" />
            </div>
            <div className="stock-details">
              <h3 className="stock-name">{product.productName}</h3>
              <p className="stock-type">{product.productType}</p>
              <div className="stock-info-row">
                <span>Price:</span>
                <span>LKR {product.pricePerUnit}</span>
              </div>
              <div className="stock-info-row">
                <span>Quantity:</span>
                <span>{product.availableQuantity}</span>
              </div>
              <div className="stock-info-row">
                <span>Status:</span>
                <span className={`stock-status ${product.availableQuantity < LOW_STOCK_THRESHOLD ? 'status-low' : 'status-instock'}`}>
                  {product.stockStatus}
                </span>
              </div>
              <div className="card-actions">
                <button onClick={() => {
                  setSelectedProduct({ ...product });
                  setShowEditModal(true);
                }} className="action-btn edit-btn">
                  <FaEdit /> Edit
                </button>
                {product.availableQuantity < LOW_STOCK_THRESHOLD && (
                  <button onClick={() => handleRequestStock(product.productID)} className="action-btn request-btn">
                    <FaPlus /> Request
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="modal-title">Add New Product</h3>
            <div className="form-group">
              <input
                type="text"
                placeholder="Product ID"
                value={newProduct.productID}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, productID: e.target.value })
                }
                className="form-input"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Product Name"
                value={newProduct.productName}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, productName: e.target.value })
                }
                className="form-input"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Product Type"
                value={newProduct.productType}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, productType: e.target.value })
                }
                className="form-input"
              />
            </div>
            <div className="form-group">
              <input
                type="number"
                placeholder="Price Per Unit"
                value={newProduct.pricePerUnit}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, pricePerUnit: e.target.value })
                }
                className="form-input"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Image URL"
                value={newProduct.image}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, image: e.target.value })
                }
                className="form-input"
              />
            </div>
            <div className="form-group">
              <input
                type="number"
                placeholder="Available Quantity"
                value={newProduct.availableQuantity}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    availableQuantity: e.target.value,
                  })
                }
                className="form-input"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Stock Status"
                value={newProduct.stockStatus}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, stockStatus: e.target.value })
                }
                className="form-input"
              />
            </div>
            <div className="modal-actions">
              <button
                onClick={handleAddProduct}
                className="modal-btn save-btn"
              >
                Save
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="modal-btn cancel-btn"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {showEditModal && selectedProduct && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="modal-title">Edit Product</h3>
            <div className="form-group">
              <input
                type="text"
                value={selectedProduct.productID}
                className="form-input disabled"
                disabled
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                value={selectedProduct.productName}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    productName: e.target.value,
                  })
                }
                className="form-input"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                value={selectedProduct.productType}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    productType: e.target.value,
                  })
                }
                className="form-input"
              />
            </div>
            <div className="form-group">
              <input
                type="number"
                value={selectedProduct.pricePerUnit}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    pricePerUnit: e.target.value,
                  })
                }
                className="form-input"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                value={selectedProduct.image}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    image: e.target.value,
                  })
                }
                className="form-input"
              />
            </div>
            <div className="form-group">
              <input
                type="number"
                value={selectedProduct.availableQuantity}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    availableQuantity: e.target.value,
                  })
                }
                className="form-input"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                value={selectedProduct.stockStatus}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    stockStatus: e.target.value,
                  })
                }
                className="form-input"
              />
            </div>
            <div className="modal-actions">
              <button
                onClick={handleEditProduct}
                className="modal-btn save-btn"
              >
                Update
              </button>
              <button
                onClick={() => setShowEditModal(false)}
                className="modal-btn cancel-btn"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* List of Stock Requests */}
      <div className="stock-requests-section">
        <h3 className="section-title">Stock Requests</h3>
        <ul className="requests-list">
          {requests.map((request, index) => (
            <li key={index} className="request-item">
              Requested {request.quantityRequested} units of {request.productName}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OutletStock;
