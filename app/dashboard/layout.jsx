import Header from "../../components/Header";
import Footer from "@/components/Footer";
import React from "react";

function DashboardLayout({ children }) {
  return (
    <div>
      <Header />
      <div className="px-6 m-0 bg-gradient-to-b from-background to-accent h-screen">
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default DashboardLayout;
