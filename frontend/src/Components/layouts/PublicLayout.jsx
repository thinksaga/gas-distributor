import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../Navbar";
import Footer from "../../Components/Footer";

const PublicLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default PublicLayout;
