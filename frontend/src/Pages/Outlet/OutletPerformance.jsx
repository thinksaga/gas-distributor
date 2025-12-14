import React from "react";
import { Line } from "react-chartjs-2";
import { FaSearch } from "react-icons/fa";
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale } from "chart.js";
import "./OutletPerformance.css";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale);

const OutletPerformance = () => {
  const profitData = {
    labels: ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
    datasets: [
      {
        label: "Revenue",
        data: [20000, 35000, 55000, 70000, 65000, 60000, 75000],
        borderColor: "#0ea5e9",
        fill: false,
      },
      {
        label: "Profit",
        data: [18000, 30000, 50000, 60000, 55000, 50000, 67000],
        borderColor: "#ff8c00",
        fill: false,
      },
    ],
  };

  return (
    <main className="outlet-performance-page">
      {/* Search Bar */}
      <div className="search-bar-container">
        <div className="search-input-wrapper">
          <FaSearch />
          <input type="text" placeholder="Search stock, reports, customers" className="search-input" />
        </div>
        <div className="user-avatar"></div>
      </div>

      {/* Overview Section */}
      <div className="performance-grid">
        <div className="performance-card">
          <h3 className="card-title">Overview</h3>
          <div className="stats-row">
            <div className="stat-item">
              <p className="stat-label">Total Profit</p>
              <p className="stat-value">LKR 21,190</p>
            </div>
            <div className="stat-item">
              <p className="stat-label">Revenue</p>
              <p className="stat-value revenue">LKR 18,300</p>
            </div>
            <div className="stat-item">
              <p className="stat-label">Sales</p>
              <p className="stat-value sales">LKR 17,432</p>
            </div>
          </div>
        </div>

        <div className="performance-card">
          <h3 className="card-title">Best Selling Category</h3>
          <table className="performance-table">
            <thead>
              <tr>
                <th>Category</th>
                <th className="text-right">Turn Over</th>
                <th className="text-right">Increase By</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2.3Kg Cylinder</td>
                <td className="text-right">LKR 26,000</td>
                <td className="text-right text-green">3.2%</td>
              </tr>
              <tr>
                <td>05Kg Cylinder</td>
                <td className="text-right">LKR 22,000</td>
                <td className="text-right text-green">2%</td>
              </tr>
              <tr>
                <td>12Kg Cylinder</td>
                <td className="text-right">LKR 22,000</td>
                <td className="text-right text-green">1.5%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Profit & Revenue Chart */}
      <div className="chart-container">
        <h3 className="card-title">Profit & Revenue</h3>
        <Line data={profitData} />
      </div>

      {/* Best Selling Products */}
      <div className="performance-card">
        <h3 className="card-title">Best Selling Product</h3>
        <table className="performance-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Product ID</th>
              <th>Category</th>
              <th className="text-right">Remaining Qty</th>
              <th className="text-right">Turn Over</th>
              <th className="text-right">Increase By</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2.3Kg</td>
              <td>23567</td>
              <td>Small</td>
              <td className="text-right">200</td>
              <td className="text-right">LKR 17,000</td>
              <td className="text-right text-green">2.3%</td>
            </tr>
            <tr>
              <td>05Kg</td>
              <td>25831</td>
              <td>Medium</td>
              <td className="text-right">150</td>
              <td className="text-right">LKR 12,000</td>
              <td className="text-right text-green">1.3%</td>
            </tr>
            <tr>
              <td>12Kg</td>
              <td>56841</td>
              <td>Large</td>
              <td className="text-right">100</td>
              <td className="text-right">LKR 10,000</td>
              <td className="text-right text-green">1.3%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default OutletPerformance;
