import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import DefaultResume from "../../_components/DefaultResume";
function Default() {
  return (
    <div className="p-10">
      <Breadcrumb>
        <BreadcrumbList className="font-bold text-3xl mb-6">
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Default Resumes</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div>
        <p className="text-gray-500">Enter your resume details here</p>
        <div className="grid grid-cols-1 md:grid-cols-3 my-5 gap-4">
          <DefaultResume />
        </div>
      </div>
    </div>
  );
}

export default Default;
