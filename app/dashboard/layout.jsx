import Header from "../../components/Header";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import React from "react";

function DashboardLayout({ children }) {
  return (
    <div>
      <Header />
      <div className="flex flex-row m-0 bg-gradient-to-b from-background to-accent h-screen">
        <Sidebar />
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default DashboardLayout;
