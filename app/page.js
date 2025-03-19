"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ReactTyped } from "react-typed";
import CountUp from "react-countup";
import Link from "next/link";
import Workflow from "@/components/Workflow";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div>
      <main className="flex flex-col justify-center items-center text-center p-8 bg-white  h-screen dark:bg-slate-800">
        <h1 className="text-5xl font-thin mb-20">DevMockupAI</h1>

        <ReactTyped
          className="text-4xl font-bold mb-20 text-secondary "
          strings={["Customize resume and interviews with AI"]}
          typeSpeed={40}
        />
        <Link href="/dashboard">
          <button className="mt-4 px-6 py-3 bg-secondary text-white text-xl rounded-full border-2 hover:scale-110 hover: shadow-md cursor-pointer transition-all">
            Get Started
          </button>
        </Link>

        <div className="mt-24 flex justify-center items-center space-x-10">
          <div className="text-center">
            <h2 className="text-3xl font-bold ">
              <CountUp end={15} duration={1} />s
            </h2>
            <p className="text-xl ">Build Resume</p>
          </div>
          <div className="text-center">
            <h2 className="text-3xl font-bold ">
              <CountUp end={5} duration={1} delay={1} /> pages
            </h2>
            <p className="text-xl ">Feedback</p>
          </div>
          <div className="text-center ">
            <h2 className="text-3xl font-bold">
              <CountUp end={90} duration={2} delay={1.5} />%
            </h2>
            <p className="text-xl ">Time Saved</p>
          </div>
        </div>
      </main>

      <section className="py-24 bg-white dark:bg-slate-800">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 relative inline-block">
              <span>What can we do?</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
              Our AI-powered platform helps you stand out in the job market with
              these key features
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-xl bg-white dark:bg-slate-800 shadow-lg group hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-400 to-purple-500"></div>
              <div className="p-8">
                <div className="w-16 h-16 mb-6 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center mx-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-pink-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 group-hover:text-pink-500 transition-colors">
                  Automatic Resume Generation
                </h3>
                <p className="text-gray-600 dark:text-gray-300 group-hover:text-gray-700 dark:group-hover:text-white transition-colors">
                  Create tailored resumes in seconds by matching your experience
                  with job requirements.
                </p>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-0 bg-gradient-to-t from-pink-500/10 to-transparent group-hover:h-full transition-all duration-300"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-xl bg-white dark:bg-slate-800 shadow-lg group hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-500"></div>
              <div className="p-8">
                <div className="w-16 h-16 mb-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 group-hover:text-blue-500 transition-colors">
                  Personalized Interview Preparation
                </h3>
                <p className="text-gray-600 dark:text-gray-300 group-hover:text-gray-700 dark:group-hover:text-white transition-colors">
                  Practice with AI-powered mock interviews customized for
                  specific roles and companies.
                </p>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-0 bg-gradient-to-t from-blue-500/10 to-transparent group-hover:h-full transition-all duration-300"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-xl bg-white dark:bg-slate-800 shadow-lg group hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-teal-500"></div>
              <div className="p-8">
                <div className="w-16 h-16 mb-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 group-hover:text-green-500 transition-colors">
                  AI Assistance
                </h3>
                <p className="text-gray-600 dark:text-gray-300 group-hover:text-gray-700 dark:group-hover:text-white transition-colors">
                  Get intelligent feedback and suggestions to improve your
                  application materials and interview skills.
                </p>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-0 bg-gradient-to-t from-green-500/10 to-transparent group-hover:h-full transition-all duration-300"></div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="flex flex-col justify-center items-center py-12 bg-white text-white dark:bg-slate-800">
        <Workflow />
      </section>

      <section className="pb-20 bg-white dark:bg-slate-800">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 text-secondary dark:text-white">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            {[
              {
                question: "What is DevMockupAI?",
                answer:
                  "DevMockupAI is an AI-powered platform designed to help job seekers optimize their application process. Our tools use advanced AI to create tailored resumes, provide interview practice with realistic feedback, and offer personalized career guidance.",
              },
              {
                question: "How does resume customization work?",
                answer:
                  "Our resume customization tool analyzes both your base resume and the job description you're applying for. It then intelligently highlights relevant skills and experiences, reorganizes content for maximum impact, and suggests improvements to match the specific requirements of the position.",
              },
              {
                question: "What types of interview practice do you offer?",
                answer:
                  "We offer several interview practice formats: 1) Technical interviews with coding challenges, 2) Behavioral interviews that assess your soft skills, 3) Industry-specific interviews tailored to your field, and 4) Mock interviews that simulate the exact position you're applying for.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="rounded-lg overflow-hidden"
              >
                <Accordion type="single" collapsible>
                  <AccordionItem
                    value={`item-${index}`}
                    className="border-none"
                  >
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
                          {item.question}
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
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </motion.div>
            ))}

            <div className="flex justify-center mt-8">
              <Link href="/faqs">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                >
                  View All FAQs
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
