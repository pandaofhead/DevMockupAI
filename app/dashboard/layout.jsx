import Header from "./_components/Header";
import React from "react";

function DashboardLayout({ children }) {
  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 py-8">{children}</div>
    </div>
  );
}

export default DashboardLayout;
