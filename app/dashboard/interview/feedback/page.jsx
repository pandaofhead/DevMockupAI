import React from "react";
import Breadcrumb from "@/components/Breadcrumb";

function Feedback() {
  const breadcrumbItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Feedback" },
  ];

  return (
    <div className="p-10">
      <Breadcrumb items={breadcrumbItems} />
      <div>
        <p className="text-gray-500">Generate your Interviews here</p>
        <div className="grid grid-cols-1 md:grid-cols-3 my-5 gap-4">
          Feedback
        </div>
      </div>
    </div>
  );
}

export default Feedback;
