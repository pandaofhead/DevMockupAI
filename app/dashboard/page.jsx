import React from "react";
import AddNewInterview from "./_components/AddNewInterview";
function Dashboard() {
  return (
    <div className="p-10">
      <h1 className="font-bold text-2xl">Dashboard</h1>
      <p className="text-gray-500">Create and Start your AI Mockup Interview</p>
      <div className="gird grid-cols-4 md:grid-cols-3 my-5">
        <AddNewInterview />
      </div>
    </div>
  );
}

export default Dashboard;
