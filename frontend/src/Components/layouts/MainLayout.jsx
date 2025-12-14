import React from "react";
import Navigation from "../organisms/Navigation";

const MainLayout = ({ children }) => {
  const left = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/features", label: "Features" },
    { to: "/support", label: "Support" },
  ];
  const right = [
    { to: "/login", label: "Sign In" },
    { to: "/signup", label: "Sign Up" },
  ];

  return (
    <>
      <Navigation left={left} right={right} />
      {children}
    </>
  );
};

export default MainLayout;
