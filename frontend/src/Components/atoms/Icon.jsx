import React from "react";

const Icon = ({ children, size = 20, color = "currentColor", className = "" }) => {
  const style = { width: size, height: size, color };
  return (
    <span className={className} style={style} aria-hidden="true">
      {children}
    </span>
  );
};

export default Icon;
