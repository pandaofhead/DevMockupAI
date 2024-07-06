import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import AddNewResume from "../../_components/AddNewResume";
function Custom() {
  return (
    <div className="p-10">
      <Breadcrumb>
        <BreadcrumbList className="font-bold text-3xl mb-6">
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Custom Resumes</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div>
        <p className="text-gray-500">Customaize your resumes here</p>
        <div className="grid grid-cols-1 md:grid-cols-3 my-5 gap-4">
          <AddNewResume />
        </div>
      </div>
    </div>
  );
}

export default Custom;
