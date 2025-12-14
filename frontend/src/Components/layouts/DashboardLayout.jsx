import React from "react";
import Sidebar from "../organisms/Sidebar";

const DashboardLayout = ({ items = [], children }) => {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar items={items} />
      <main style={{ flex: 1, padding: "var(--spacing-5)" }}>{children}</main>
    </div>
  );
};

export default DashboardLayout;
