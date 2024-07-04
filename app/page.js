"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ReactTyped } from "react-typed";
import CountUp from "react-countup";
import Link from "next/link";
export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="flex flex-col justify-center items-center text-center p-8 bg-gradient-to-b from-background to-secondary h-screen">
        <ReactTyped
          className="text-4xl font-bold mb-4"
          strings={["Customize your resume and interviews with AI"]}
          typeSpeed={40}
        />
        <p className="text-lg my-3">Automatic resume generation</p>
        <p className="text-lg">&</p>
        <p className="text-lg my-3">Personalized interview preparation</p>
        <button className="mt-4 px-6 py-3 bg-primary text-white text-xl rounded-full border-2 hover:scale-110 hover: shadow-md cursor-pointer transition-all">
          Get Started
        </button>

        <div className="mt-24 flex justify-center items-center space-x-10">
          <div className="text-center ">
            <h2 className="text-3xl font-bold text-white">
              <CountUp end={90} duration={2.5} />%
            </h2>
            <p className="text-xl text-white">Time Saved</p>
          </div>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">
              <CountUp end={15} duration={1} delay={2} />s
            </h2>
            <p className="text-xl text-white">Build Resume</p>
          </div>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">
              <CountUp end={5} duration={1} delay={3} /> pages
            </h2>
            <p className="text-xl text-white">Feedback</p>
          </div>
        </div>
      </main>

      <section className="flex flex-col justify-center items-center py-12 bg-secondary h-screen">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl text-white font-bold mb-8">How it works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-100 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">
                Share your knowledge
              </h3>
              <p>
                Everyone's an expert at something. Share your expertise and help
                make AI more human.
              </p>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">
                Connect with fellow experts
              </h3>
              <p>
                Join our community to work alongside like-minded experts in your
                domain.
              </p>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">
                Get paid on your terms
              </h3>
              <p>
                Earn competitive pay, while enjoying the flexibility to work
                where and when you want.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20 bg-gradient-to-b from-secondary to-accent ">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 font-custom text-center text-white">
            FAQs
          </h2>

          <div className="space-y-4">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="flex justify-between items-center bg-white p-4 rounded hover:scale-105 hover: shadow-md cursor-pointer transition-all">
                  <span className="text-lg font-semibold">
                    What can I do on DevMockupAI?
                  </span>
                </AccordionTrigger>
                <AccordionContent className="flex justify-between items-center bg-white p-6 rounded shadow-md  text-xl">
                  DevMockupAI can help you with resume generation, interview
                  preparation, and more. By entering your resume details and job
                  description, DevMockupAI can generate a resume for you. You
                  can also practice interviews with AI.
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="flex justify-between items-center bg-white p-4 rounded hover:scale-105 hover: shadow-md cursor-pointer transition-all">
                  <span className="text-lg font-semibold">
                    How to get started?
                  </span>
                </AccordionTrigger>
                <AccordionContent className="flex justify-between items-center bg-white p-6 rounded shadow-md  text-xl">
                  To get started, simply sign up on DevMockupAI and start
                  entering your resume details.
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="flex justify-between items-center bg-white p-4 rounded hover:scale-105 hover: shadow-md cursor-pointer transition-all">
                  <span className="text-lg font-semibold">
                    Do I need to pay for the services?
                  </span>
                </AccordionTrigger>
                <AccordionContent className="flex justify-between items-center bg-white p-6 rounded shadow-md  text-xl">
                  For the basic services, you do not need to pay. However, for
                  premium services like interview preparation, you may need to
                  pay.
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="flex justify-between items-center bg-white p-4 rounded hover:scale-105 hover: shadow-md cursor-pointer transition-all">
                  <span className="text-lg font-semibold">How to pay?</span>
                </AccordionTrigger>
                <AccordionContent className="flex justify-between items-center bg-white p-6 rounded shadow-md  text-xl">
                  DevMockupAI now supports payments through credit cards and
                  PayPal.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
