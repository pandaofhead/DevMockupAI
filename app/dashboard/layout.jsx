import Header from "./_components/Header";
import React from "react";

function DashboardLayout({ children }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

export default DashboardLayout;
