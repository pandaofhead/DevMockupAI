"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function Faqs() {
  const questionList = [
    {
      question: "What is DevMockupAI?",
      answer:
        "DevMockupAI is an AI-powered platform designed to help job seekers optimize their application process. Our tools use advanced AI to create tailored resumes, provide interview practice with realistic feedback, and offer personalized career guidance based on your experience and target positions.",
    },
    {
      question: "How does resume customization work?",
      answer:
        "Our resume customization tool analyzes both your base resume and the job description you're applying for. It then intelligently highlights relevant skills and experiences, reorganizes content for maximum impact, and suggests improvements to match the specific requirements of the position. This approach typically increases interview callback rates by up to 40%.",
    },
    {
      question: "What types of interview practice do you offer?",
      answer:
        "We offer several interview practice formats: 1) Technical interviews with coding challenges and explanations, 2) Behavioral interviews that assess your soft skills and cultural fit, 3) Industry-specific interviews tailored to your field, and 4) Mock interviews that simulate the exact position you're applying for. All practice sessions include detailed feedback and improvement suggestions.",
    },
    {
      question: "Is my data secure and private?",
      answer:
        "We take data security and privacy very seriously. All your personal information and uploaded documents are encrypted both in transit and at rest. We never share your data with third parties without explicit consent, and you can request deletion of your data at any time. Our systems comply with GDPR, CCPA, and other relevant privacy regulations.",
    },
    {
      question: "Can I use DevMockupAI for multiple job applications?",
      answer:
        "Absolutely! You can use DevMockupAI for unlimited job applications. Simply upload different job descriptions, and our AI will customize your resume for each position. We also keep track of your applications and provide insights on how to improve your approach for different companies and roles.",
    },
    {
      question: "What technology powers DevMockupAI?",
      answer:
        "DevMockupAI uses a combination of natural language processing (NLP), machine learning, and large language models like GPT-4o and Gemini. Our systems are specifically fine-tuned for resume analysis, job market understanding, and interview preparation, making them much more effective than generic AI tools for job applications.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-800">
      <div className="max-w-3xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 text-secondary dark:text-white">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Everything you need to know about DevMockupAI
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {questionList.map((question, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="rounded-lg overflow-hidden"
            >
              <Accordion type="single" collapsible>
                <AccordionItem value={`item-${index}`} className="border-none">
                  <AccordionTrigger
                    className="
                      px-6 py-4 
                      text-left
                      bg-gray-50 dark:bg-slate-900
                      hover:bg-gray-100 dark:hover:bg-slate-950
                      border border-gray-200 dark:border-gray-700
                      transition-colors
                      rounded-t-lg
                      data-[state=open]:rounded-b-none
                      data-[state=closed]:rounded-lg
                    "
                  >
                    <div className="flex items-center text-secondary dark:text-white">
                      <span className="text-lg font-medium">
                        {question.question}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent
                    className="
                      px-6 py-4 
                      text-gray-700 dark:text-gray-300
                      bg-white dark:bg-slate-800
                      border-x border-b
                      border-gray-200 dark:border-gray-700
                      rounded-b-lg
                      leading-relaxed
                    "
                  >
                    {question.answer}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default Faqs;
