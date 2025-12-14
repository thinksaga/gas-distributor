import React, { useState } from "react";
import Card from "../../Components/Card";
import Button from "../../Components/Button";
import Input from "../../Components/Input";
import { FaFileDownload, FaChartBar } from "react-icons/fa";
import "./Adminstock.css";

const Adminreport = () => {
  const [reportType, setReportType] = useState("sales");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleGenerateReport = () => {
    alert(`Generating ${reportType} report from ${startDate} to ${endDate}`);
  };

  return (
    <div className="adminstock-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Reports & Analytics</h1>
          <p className="page-subtitle">Generate comprehensive business reports</p>
        </div>
      </div>

      <div className="stats-grid">
        <Card padding="lg">
          <h3 style={{ fontSize: "var(--font-size-lg)", marginBottom: "var(--spacing-lg)" }}>
            <FaChartBar /> Generate Report
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-lg)" }}>
            <Input
              label="Report Type"
              type="select"
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
            >
              <option value="sales">Sales Report</option>
              <option value="inventory">Inventory Report</option>
              <option value="delivery">Delivery Report</option>
              <option value="customer">Customer Report</option>
              <option value="financial">Financial Report</option>
            </Input>

            <Input
              label="Start Date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />

            <Input
              label="End Date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />

            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={handleGenerateReport}
              disabled={!startDate || !endDate}
            >
              <FaFileDownload /> Generate Report
            </Button>
          </div>
        </Card>

        <Card padding="lg">
          <h3 style={{ fontSize: "var(--font-size-lg)", marginBottom: "var(--spacing-lg)" }}>
            Quick Stats
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-md)" }}>
            <div style={{ padding: "var(--spacing-md)", background: "var(--bg-secondary)", borderRadius: "var(--radius-md)" }}>
              <div style={{ fontSize: "var(--font-size-sm)", color: "var(--text-secondary)" }}>Total Sales (This Month)</div>
              <div style={{ fontSize: "var(--font-size-2xl)", fontWeight: "var(--font-weight-bold)", color: "var(--color-primary)" }}>₹2,579,000</div>
            </div>
            <div style={{ padding: "var(--spacing-md)", background: "var(--bg-secondary)", borderRadius: "var(--radius-md)" }}>
              <div style={{ fontSize: "var(--font-size-sm)", color: "var(--text-secondary)" }}>Total Orders</div>
              <div style={{ fontSize: "var(--font-size-2xl)", fontWeight: "var(--font-weight-bold)", color: "var(--color-success)" }}>1,247</div>
            </div>
            <div style={{ padding: "var(--spacing-md)", background: "var(--bg-secondary)", borderRadius: "var(--radius-md)" }}>
              <div style={{ fontSize: "var(--font-size-sm)", color: "var(--text-secondary)" }}>Active Outlets</div>
              <div style={{ fontSize: "var(--font-size-2xl)", fontWeight: "var(--font-weight-bold)", color: "var(--color-info)" }}>42</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Adminreport;
