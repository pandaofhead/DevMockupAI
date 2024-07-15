"use client";
import React, { useMemo } from "react";
import Breadcrumb from "@/components/Breadcrumb";

function Analytics() {
  const breadcrumbItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Analytics" },
  ];

  return (
    <div className="p-10">
      <Breadcrumb items={breadcrumbItems} />
      <div>
        <p className="text-2xl font-bold">Coming Soon...</p>
      </div>
    </div>
  );
}

export default Analytics;
