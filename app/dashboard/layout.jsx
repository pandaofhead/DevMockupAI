import Sidebar from "@/components/Sidebar";
import React from "react";

function DashboardLayout({ children }) {
  return (
    <div className="flex flex-row m-0 bg-gradient-to-b from-background to-accent h-screen">
      <Sidebar />
      {children}
    </div>
  );
}

export default DashboardLayout;
