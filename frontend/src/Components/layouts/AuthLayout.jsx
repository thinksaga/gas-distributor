import React from "react";
import PublicLayout from "./PublicLayout";

const AuthLayout = ({ children }) => {
  // Reuse PublicLayout so auth pages keep Navbar/Footer
  return <PublicLayout>{children}</PublicLayout>;
};

export default AuthLayout;
