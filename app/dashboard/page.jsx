import React from "react";
import AddNewInterview from "./_components/AddNewInterview";
import AddNewResume from "./_components/AddNewResume";
import BasicResume from "./_components/DefaultResume";
function Dashboard() {
  return (
    <div className="p-10">
      <h1 className="font-bold text-3xl mb-6">Dashboard</h1>
      <div>
        <h2 className="font-bold text-2xl">My Resumes</h2>
        <p className="text-gray-500">Customize your resumes here</p>
        <div className="grid grid-cols-1 md:grid-cols-3 my-5 gap-4">
          <BasicResume />
          <AddNewResume />
        </div>
      </div>
      <div>
        <h2 className="font-bold text-2xl">My Interviews</h2>
        <p className="text-gray-500">Prepare for your interviews here</p>
        <div className="grid grid-cols-1 md:grid-cols-3 my-5 gap-4">
          <AddNewInterview />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
