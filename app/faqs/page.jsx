"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function Faqs() {
  const questionList = [
    {
      question: "What can I do on DevMockupAI?",
      answer:
        "DevMockupAI can help you with resume generation, interview preparation, and more. By entering your default resume and job description, DevMockupAI can generate a resume for you. You can also practice interviews with AI.",
    },
    {
      question: "How to get started?",
      answer:
        "To get started, simply sign up on DevMockupAI and navigate to Dashboard.",
    },
    {
      question: "Do I need to pay for the services?",
      answer: "For now DevMockupAI is free to use, please enjoy our services!",
    },
    {
      question: "How can I contact support?",
      answer: "You can contact support by emailing us at Contact",
    },
  ];

  return (
    <div className="flex flex-col justify-center items-center bg-white h-screen dark:bg-slate-700">
      <div className="w-1/2">
        <h2 className="text-3xl font-bold mb-6 font-custom text-center text-secondary dark:text-white">
          FAQs
        </h2>

        <div className="space-y-4 ">
          {questionList.map((question, index) => (
            <Accordion type="single" collapsible key={index}>
              <AccordionItem value={`item-${index}`}>
                <AccordionTrigger className=" bg-white p-4 rounded hover:scale-105 hover: shadow-md cursor-pointer transition-all border-secondary border-2 text-secondary dark:bg-slate-800">
                  <span className="text-lg font-semibold">
                    {question.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className=" bg-white p-6 rounded shadow-md  text-xl dark:bg-slate-800">
                  {question.answer}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Faqs;
