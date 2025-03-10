"use client";
import Breadcrumb from "@/components/Breadcrumb";
import AddResume from "@/app/dashboard/_components/AddResume";
import ResumeList from "@/app/dashboard/_components/ResumeList";
export default function Chat({ params }) {
  const breadcrumbItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Resume" }
  ];

  return (
    <div className="p-10">
      <Breadcrumb items={breadcrumbItems} />

      <div>
        <p className="text-gray-500 dark:text-white">
          Generate your Resume here
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 my-5 gap-4">
          <AddResume />
        </div>
        <h2 className="text-2xl font-bold my-8">Your Resumes</h2>
        <ResumeList />
      </div>
    </div>
  );
}
