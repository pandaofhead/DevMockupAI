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
export default function Home() {
  return (
    <div>
      <main className="flex flex-col justify-center items-center text-center p-8 bg-white  h-screen dark:bg-slate-800">
        <h1 className="text-5xl font-thin mb-20">DevMockupAI</h1>

        <ReactTyped
          className="text-4xl font-bold mb-20 text-secondary "
          strings={["Customize your resume and interviews with AI"]}
          typeSpeed={40}
        />
        <Link href="/dashboard/resume">
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

      <section className="flex flex-col justify-center items-center py-12 bg-white h-auto dark:bg-slate-800">
        <div className="max-w-6xl text-center ">
          <h2 className="text-3xl text-white font-bold mb-20">
            What can DevMockupAI do?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-8 sm:mx-auto">
            <div className="p-6 rounded-lg shadow-md bg-pink-200 group hover:scale-105 dark:bg-slate-700">
              <h3 className="text-xl group relative font-semibold mb-4">
                <span>Automatic resume generation</span>
                <span className="absolute -bottom-1 left-0 w-0 transition-all h-1 bg-indigo-600 group-hover:w-full duration-300"></span>
              </h3>
              <p className="text-lg m-6">
                Share your knowledge with the community and help others grow.
              </p>
            </div>

            <div className="p-6 bg-pink-200 rounded-lg shadow-md group hover:scale-105 dark:bg-slate-700">
              <h3 className="text-xl font-semibold mb-4 group relative">
                <span className="px-1 relative z-10 group-hover:text-white">
                  Personalized interview preparation
                </span>
                <span className="absolute left-0 bottom-0 w-full h-0 transition-all bg-indigo-600 z-0 group-hover:h-full "></span>
              </h3>
              <p>
                Join our community to work alongside like-minded experts in your
                domain.
              </p>
            </div>

            <div className="p-6 bg-pink-200 rounded-lg shadow-md  group hover:scale-105 dark:bg-slate-700">
              <h3 className="text-xl relative group font-semibold mb-4">
                <span>AI assistance</span>
                <span className="absolute -bottom-1 right-0 w-0 transition-all h-1 bg-indigo-600 group-hover:w-full duration-300"></span>
              </h3>
              <p>
                We use AI to help you with your resume and interview
                preparation.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col justify-center items-center py-12 bg-white text-white dark:bg-slate-800">
        <Workflow />
      </section>

      <section className="pb-20 bg-white dark:bg-slate-800">
        <div className="max-w-6xl mx-8 md:mx-auto">
          <h2 className="text-3xl font-bold mb-6 font-custom text-center text-secondary">
            FAQs
          </h2>

          <div className="space-y-4 ">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className=" bg-white p-4 rounded hover:scale-105 hover: shadow-md cursor-pointer transition-all">
                  <span className="text-lg font-semibold">
                    What can I do on DevMockupAI?
                  </span>
                </AccordionTrigger>
                <AccordionContent className="flex justify-between items-center bg-white p-6 rounded shadow-md  text-xl dark:bg-slate-800">
                  DevMockupAI can help you with resume generation, interview
                  preparation, and more. By entering your default resume and job
                  description, DevMockupAI can generate a resume for you. You
                  can also practice interviews with AI.
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className=" bg-white p-4 rounded hover:scale-105 hover: shadow-md cursor-pointer transition-all">
                  <span className="text-lg font-semibold">
                    How to get started?
                  </span>
                </AccordionTrigger>
                <AccordionContent className=" bg-white p-6 rounded shadow-md  text-xl dark:bg-slate-800">
                  To get started, simply sign up on DevMockupAI and navigate to
                  Dashboard.
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className=" bg-white p-4 rounded hover:scale-105 hover: shadow-md cursor-pointer transition-all">
                  <span className="text-lg font-semibold">
                    Do I need to pay for the services?
                  </span>
                </AccordionTrigger>
                <AccordionContent className=" bg-white p-6 rounded shadow-md  text-xl dark:bg-slate-800">
                  DevMockupAI is free to use, please enjoy the services!
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Link href="/faqs" className="justify-center mt-4 flex">
              <button className="mt-4 px-6 py-3 bg-primary text-white rounded-full hover:scale-110 hover: shadow-md cursor-pointer transition-all">
                View All Questions
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
