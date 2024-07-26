"use client";
import Sidebar from "@/components/Sidebar";
import React from "react";
import { ResumeInfoProvider } from "@/context/ResumeInfoContext";
function DashboardLayout({ children }) {
  return (
      <div className="flex flex-row m-0 bg-white min-h-[768px] dark:bg-slate-700">
        <Sidebar />
        {children}
      </div>
  );
}

export default DashboardLayout;
