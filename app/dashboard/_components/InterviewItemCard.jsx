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
  return (
    <div className="border shadow-sm rounded-sm p-3">
      <h2 className="font-bold text-secondary text-xl mb-3">{interview?.jobPosition}</h2>
      <div className="flex flex-row justify-between">
        <h2 className=" text-gray-500">Tech Stack: {interview?.jobDesc}</h2>
        <h2 className=" text-gray-500">
          {interview?.createdAt}
        </h2>
      </div>

      <div className="flex justify-between gap-5 mt-4">
        <Button
          size="lg"
          variant='outline'
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
