"use client";
import { Volume2, VolumeX } from "lucide-react";
import React, { useState } from "react";
import { set } from "react-hook-form";

const QuestionsSection = ({ mockInterviewQuestion, activeQuestionIndex }) => {
  const [speechOn, setSpeechOn] = useState(false);
  console.log(
    "🚀 ~ QuestionsSection ~ mockInterviewQuestion:",
    mockInterviewQuestion
  );

  const textToSpeech = (text) => {
    if (!speechOn) {
      // Turn on speech
      if ("speechSynthesis" in window) {
        const speech = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(speech);
      } else {
        alert("Sorry, your browser does not support text to speech");
      }
      setSpeechOn(true);
    } else {
      // Turn off speech
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      setSpeechOn(false);
    }
  };
  return (
    mockInterviewQuestion && (
      <div className="p-5 border rounded-lg my-5">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {mockInterviewQuestion &&
            mockInterviewQuestion.map((question, index) => (
              <h2
                className={`p-2 bg-secondary rounded-full text-xs md:text-sm text-center cursor-pointer ${
                  activeQuestionIndex == index && "bg-secondary text-white"
                }`}
              >
                Question #{index + 1}
              </h2>
            ))}
        </div>
        <h2 className="my-5 text-md md:text-lg">
          {mockInterviewQuestion[activeQuestionIndex]?.question}
        </h2>
        {speechOn ? (
          <VolumeX
            className="cursor-pointer"
            onClick={() =>
              textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.question)
            }
          />
        ) : (
          <Volume2
            className="cursor-pointer"
            onClick={() =>
              textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.question)
            }
          />
        )}
      </div>
    )
  );
};

export default QuestionsSection;
