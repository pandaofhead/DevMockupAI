import Sidebar from "@/components/Sidebar";
import React from "react";

function DashboardLayout({ children }) {
  return (
    <div className="flex flex-row m-0 bg-white h-screen dark:bg-slate-700">
      <Sidebar />
      {children}
    </div>
  );
}

export default DashboardLayout;
