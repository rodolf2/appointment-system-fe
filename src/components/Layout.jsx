// Layout.jsx
import React from "react";
import BackToTopButton from "./BackToTopButton";

const Layout = ({ children }) => {
  return (
    <div>
      {children}
      <BackToTopButton />
    </div>
  );
};

export default Layout;
