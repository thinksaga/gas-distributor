import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../services/productService";
import { fetchOutlets } from "../services/outletService";
import Card from "../Components/Card";
import Button from "../Components/Button";
import Input from "../Components/Input";
import Badge from "../Components/Badge";
import { FaGasPump, FaSearch, FaFilter } from "react-icons/fa";
import "./ProductList.css";

const ProductList = () => {
  const navigate = useNavigate();
  const [selectedBranch, setSelectedBranch] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [productsData, outletsData] = await Promise.all([
          fetchProducts(),
          fetchOutlets()
        ]);
        setProducts(productsData);
        const branchNames = outletsData.map(outlet => outlet.city).filter(Boolean);
        setBranches([...new Set(branchNames)]);
      } catch (error) {
        console.error("Failed to load data", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div className="product-list-page">
      <div className="product-list-header">
        <h1 className="page-title">Gas Cylinders</h1>
        <p className="page-subtitle">Select your preferred gas cylinder and branch for delivery</p>
      </div>

      <div className="filters-section">
        <div className="search-box">
          <Input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={<FaSearch />}
          />
        </div>

        <div className="branch-selector">
          <Input
            type="select"
            label="Select Branch"
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            icon={<FaFilter />}
            required
          >
            <option value="">Choose your location</option>
            {branches.map((branch, index) => (
              <option key={index} value={branch}>{branch}</option>
            ))}
          </Input>
        </div>
      </div>

      {!selectedBranch && (
        <Card className="warning-card" padding="md">
          <p className="warning-text">⚠️ Please select a branch to continue with your purchase</p>
        </Card>
      )}

      <div className="products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Card key={product._id} className="product-card" hover padding="lg">
              <div className="product-image-container">
                <img
                  src={product.image || "/gas-cylinder-placeholder.png"}
                  alt={product.name}
                  className="product-image"
                />
                <Badge variant="primary" className="product-badge">
                  Available
                </Badge>
              </div>

              <div className="product-info">
                <h2 className="product-name">{product.name}</h2>
                <p className="product-description">{product.description || "High quality LPG gas cylinder"}</p>

                <div className="product-details">
                  <div className="product-price">
                    <span className="price-label">Price:</span>
                    <span className="price-value">₹{product.price}</span>
                  </div>
                  {product.weight && (
                    <div className="product-weight">
                      <FaGasPump className="icon" />
                      <span>{product.weight}</span>
                    </div>
                  )}
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={() => navigate(`/checkout/${product._id}`, { state: { product, selectedBranch } })}
                  disabled={!selectedBranch}
                >
                  {selectedBranch ? "Purchase Order" : "Select Branch First"}
                </Button>
              </div>
            </Card>
          ))
        ) : (
          <div className="empty-state">
            <Card padding="xl">
              <FaGasPump className="empty-icon" />
              <h3>No products found</h3>
              <p>Try adjusting your search or check back later</p>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
