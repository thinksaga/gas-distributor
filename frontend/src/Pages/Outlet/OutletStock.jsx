import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit } from "react-icons/fa";
import { getOutletStock, updateStock } from "../../services/outletService";
import { toast } from "react-toastify";

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
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Stock Management</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center"
        >
          <FaPlus className="mr-2" /> Add Product
        </button>
      </div>

      <table className="w-full border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">Product ID</th>
            <th className="p-2 border">Product Name</th>
            <th className="p-2 border">Product Type</th>
            <th className="p-2 border">Price Per Unit (LKR)</th>
            <th className="p-2 border">Image</th>
            <th className="p-2 border">Available Quantity</th>
            <th className="p-2 border">Stock Status</th>
            <th className="p-2 border">Actions</th>
            <th className="p-2 border">Request Stock</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.productID} className="text-center">
              <td className="p-2 border">{product.productID}</td>
              <td className="p-2 border">{product.productName}</td>
              <td className="p-2 border">{product.productType}</td>
              <td className="p-2 border">{product.pricePerUnit}</td>
              <td className="p-2 border">
                <img
                  src={product.image}
                  alt={product.productName}
                  className="w-16 h-16 mx-auto"
                />
              </td>
              <td className="p-2 border">{product.availableQuantity}</td>
              <td className="p-2 border">{product.stockStatus}</td>
              <td className="p-2 border">
                <button
                  onClick={() => {
                    setSelectedProduct({ ...product });
                    setShowEditModal(true);
                  }}
                  className="bg-yellow-500 text-white px-3 py-1 rounded flex items-center mx-auto"
                >
                  <FaEdit className="mr-1" /> Edit
                </button>
              </td>
              <td className="p-2 border">
                {/* Show request button if the product is low stock */}
                {product.availableQuantity < LOW_STOCK_THRESHOLD && (
                  <button
                    onClick={() => handleRequestStock(product.productID)}
                    className="bg-red-500 text-white px-4 py-1 rounded"
                  >
                    Request Stock
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-lg font-bold mb-4">Add New Product</h3>
            <input
              type="text"
              placeholder="Product ID"
              value={newProduct.productID}
              onChange={(e) =>
                setNewProduct({ ...newProduct, productID: e.target.value })
              }
              className="border p-2 w-full mb-2"
            />
            <input
              type="text"
              placeholder="Product Name"
              value={newProduct.productName}
              onChange={(e) =>
                setNewProduct({ ...newProduct, productName: e.target.value })
              }
              className="border p-2 w-full mb-2"
            />
            <input
              type="text"
              placeholder="Product Type"
              value={newProduct.productType}
              onChange={(e) =>
                setNewProduct({ ...newProduct, productType: e.target.value })
              }
              className="border p-2 w-full mb-2"
            />
            <input
              type="number"
              placeholder="Price Per Unit"
              value={newProduct.pricePerUnit}
              onChange={(e) =>
                setNewProduct({ ...newProduct, pricePerUnit: e.target.value })
              }
              className="border p-2 w-full mb-2"
            />
            <input
              type="text"
              placeholder="Image URL"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
              className="border p-2 w-full mb-2"
            />
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
              className="border p-2 w-full mb-2"
            />
            <input
              type="text"
              placeholder="Stock Status"
              value={newProduct.stockStatus}
              onChange={(e) =>
                setNewProduct({ ...newProduct, stockStatus: e.target.value })
              }
              className="border p-2 w-full mb-2"
            />
            <button
              onClick={handleAddProduct}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Save
            </button>
            <button
              onClick={() => setShowAddModal(false)}
              className="ml-2 px-4 py-2 bg-red-500 text-white rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {showEditModal && selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-lg font-bold mb-4">Edit Product</h3>
            <input
              type="text"
              value={selectedProduct.productID}
              className="border p-2 w-full mb-2 bg-gray-200" // Make ID non-editable
              disabled
            />
            <input
              type="text"
              value={selectedProduct.productName}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  productName: e.target.value,
                })
              }
              className="border p-2 w-full mb-2"
            />
            <input
              type="text"
              value={selectedProduct.productType}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  productType: e.target.value,
                })
              }
              className="border p-2 w-full mb-2"
            />
            <input
              type="number"
              value={selectedProduct.pricePerUnit}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  pricePerUnit: e.target.value,
                })
              }
              className="border p-2 w-full mb-2"
            />
            <input
              type="text"
              value={selectedProduct.image}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  image: e.target.value,
                })
              }
              className="border p-2 w-full mb-2"
            />
            <input
              type="number"
              value={selectedProduct.availableQuantity}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  availableQuantity: e.target.value,
                })
              }
              className="border p-2 w-full mb-2"
            />
            <input
              type="text"
              value={selectedProduct.stockStatus}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  stockStatus: e.target.value,
                })
              }
              className="border p-2 w-full mb-2"
            />
            <button
              onClick={handleEditProduct}
              className="px-4 py-2 bg-yellow-500 text-white rounded"
            >
              Update
            </button>
            <button
              onClick={() => setShowEditModal(false)}
              className="ml-2 px-4 py-2 bg-red-500 text-white rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* List of Stock Requests */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold">Stock Requests</h3>
        <ul className="mt-2">
          {requests.map((request, index) => (
            <li key={index} className="p-2 border mb-2">
              Requested {request.quantityRequested} units of {request.productName}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OutletStock;
