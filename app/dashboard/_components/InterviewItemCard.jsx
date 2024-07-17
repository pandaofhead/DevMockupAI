import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const InterviewItemCard = ({ interview }) => {
  const router = useRouter();
  const onStart = () => {
    router.push("interview/" + interview?.mockId);
  };
  const onFeedbackPress = () => {
    router.push("interview/" + interview.mockId + "/feedback");
  };

  const formatName = (name) => {
    return name
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
  return (
    <div className="border shadow-sm rounded-sm p-3 dark:border-gray-200 flex flex-col h-full">
      <div className="flex flex-row justify-between ">
        <h2 className="font-bold text-secondary text-xl mb-3 dark:text-white">
          {interview?.jobPosition && formatName(interview.jobPosition)}
        </h2>
        <h2 className=" text-gray-500 dark:text-gray-200">
          {interview?.createdAt}
        </h2>
      </div>

      <h2 className=" text-gray-500 dark:text-gray-200">
        Tech Stack: {interview?.jobDesc}
      </h2>
      {/* Spacer to push buttons to the bottom */}
      <div className="flex-grow"></div>
      <div className="flex justify-between gap-5 mt-4">
        <Button
          size="lg"
          variant="outline"
          className="w-full"
          onClick={onFeedbackPress}
        >
          Feedback
        </Button>
        <Button className="w-full" size="lg" onClick={onStart}>
          Start
        </Button>
      </div>
    </div>
  );
};

export default InterviewItemCard;
