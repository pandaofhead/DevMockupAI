"use client";
import React from "react";
import { Card } from "@/components/ui/card";
import {
  ArrowRight,
  FileText,
  Bot,
  Download,
  LineChart,
  MessageSquare,
  BookOpen,
} from "lucide-react";
import Link from "next/link";

function Dashboard() {
  return (
    <div className="p-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-bold text-3xl mb-6">Welcome to DevMockupAI</h1>

        <div className="prose prose-lg dark:prose-invert mb-8">
          <p>
            Your all-in-one platform for resume building, interview preparation,
            and career analytics.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <FileText className="h-6 w-6 text-secondary" />
            Resume Builder
          </h2>
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary/10 text-secondary">
                  1
                </span>
                Create Your Default Resume
              </h3>
              <p className="mb-4">
                Start by creating your default resume with your core
                information. This will serve as a template for all your future
                job applications.
              </p>

              <div className="mt-4">
                <Link
                  href="/dashboard/resume/new"
                  className="inline-flex items-center text-secondary hover:underline"
                >
                  Create Default Resume <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary/10 text-secondary">
                  2
                </span>
                Customize for Specific Jobs
              </h3>
              <p className=" mb-4">
                Create tailored versions of your resume based on the job
                description and your previous experiences.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary/10 text-secondary">
                  3
                </span>
                AI-Powered Optimization
              </h3>
              <p className="mb-4">
                Use our AI assistant to enhance your resume content and match
                job requirements.
              </p>
              <div className="pl-10 space-y-2 text-sm">
                <p>
                  • Look for the <Bot className="inline h-4 w-4 mx-1" /> button
                  in experience sections
                </p>
                <p>• AI will analyze the job description and your experience</p>
                <p>• Review and accept AI suggestions to improve your resume</p>
              </div>
            </Card>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <MessageSquare className="h-6 w-6 text-secondary" />
            Interview Preparation
          </h2>
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary/10 text-secondary">
                  1
                </span>
                Practice Sessions
              </h3>
              <p className="mb-4">
                Prepare for your interviews with our AI-powered practice
                sessions.
              </p>
              <div className="pl-10 space-y-2 text-sm">
                <p>
                  • Choose from various interview types (behavioral, technical,
                  etc.)
                </p>
                <p>• Get real-time feedback on your responses</p>
                <p>• Practice common questions for your specific role</p>
              </div>
              <div className="mt-4">
                <Link
                  href="/dashboard/interview"
                  className="inline-flex items-center text-secondary hover:underline"
                >
                  Start Practice <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary/10 text-secondary">
                  2
                </span>
                Study Materials
              </h3>
              <p className="mb-4">
                Access curated resources to enhance your interview preparation.
              </p>
              <div className="pl-10 space-y-2 text-sm">
                <p>• Review industry-specific question banks</p>
                <p>• Learn from sample answers and best practices</p>
                <p>• Access technical documentation and guides</p>
              </div>
            </Card>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <LineChart className="h-6 w-6 text-secondary" />
            Analytics & Tracking
          </h2>
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary/10 text-secondary">
                  1
                </span>
                Performance Insights
              </h3>
              <p className="  mb-4">
                Track your progress and identify areas for improvement.
              </p>
              <div className="pl-10 space-y-2 text-sm">
                <p>• View detailed practice session statistics</p>
                <p>• Track your improvement over time</p>
                <p>• Get personalized recommendations</p>
              </div>
              <div className="mt-4">
                <Link
                  href="/dashboard/analytics"
                  className="inline-flex items-center text-secondary hover:underline"
                >
                  View Analytics <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary/10 text-secondary">
                  2
                </span>
                Application Tracking
              </h3>
              <p className="mb-4">
                Keep track of your job applications and interview progress.
              </p>
              <div className="pl-10 space-y-2 text-sm">
                <p>• Monitor application statuses</p>
                <p>• Set reminders for follow-ups</p>
                <p>• Track feedback and outcomes</p>
              </div>
            </Card>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          Explore DevMockupAI and get started! Contact us at{" "}
          <Link href="/contact" className="text-secondary hover:underline">
            contact
          </Link>
        </h3>
      </div>
    </div>
  );
}

export default Dashboard;
