import React from "react";

const FeedbackSection = ({ feedback, interview }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Interview Feedback</h2>
      {/* Display interview feedback */}
      <pre>{JSON.stringify({ feedback, interview }, null, 2)}</pre>
    </div>
  );
};

export default FeedbackSection; 