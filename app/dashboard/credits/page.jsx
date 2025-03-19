"use client";
import React, { useMemo, useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  CircleDollarSign,
  Zap,
  History,
  AlertCircle,
  ChevronRight,
  Bot,
  FileText,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";

function CircularProgress({ percentage }) {
  const circumference = 2 * Math.PI * 40; // radius = 40
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg className="transform -rotate-90 w-32 h-32">
        {/* Background circle */}
        <circle
          cx="64"
          cy="64"
          r="40"
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          className="text-secondary/10"
        />
        {/* Progress circle */}
        <circle
          cx="64"
          cy="64"
          r="40"
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="text-secondary transition-all duration-500 ease-in-out"
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center text-center">
        <span className="text-2xl font-bold text-secondary">{percentage}%</span>
        <span className="text-xs text-muted-foreground">Used</span>
      </div>
    </div>
  );
}

function Credits() {
  const breadcrumbItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Credits" },
  ];

  // This would come from your database/API
  const [credits] = useState({
    total: 100,
    used: 45,
    plan: "Professional",
    renewalDate: "2024-04-30",
  });

  // Recent activity - would come from your database/API
  const [recentActivity] = useState([
    {
      id: 1,
      type: "AI Resume Suggestion",
      credits: -2,
      date: "2024-03-28",
    },
    {
      id: 2,
      type: "Interview Practice",
      credits: -3,
      date: "2024-03-27",
    },
    {
      id: 3,
      type: "Monthly Renewal",
      credits: 100,
      date: "2024-03-01",
    },
  ]);

  const usagePercentage = Math.round((credits.used / credits.total) * 100);

  return (
    <div className="p-10">
      <Breadcrumb items={breadcrumbItems} />

      <div className="max-w-6xl mx-auto">
        {/* Credit Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="px-20 py-5">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Credit Overview</h2>
                    <div className="flex items-center gap-2 text-4xl font-bold text-secondary">
                      <Zap className="h-8 w-8" />
                      {credits.total - credits.used}
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      {credits.used} credits used out of {credits.total}
                    </p>
                  </div>
                  <Button asChild variant="outline" className="md:hidden">
                    <Link href="/pricing">
                      Get More Credits
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>

                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Current Plan: {credits.plan}</span>
                    <span>
                      Renews:{" "}
                      {new Date(credits.renewalDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center gap-4 md:border-l md:pl-8">
                <CircularProgress percentage={usagePercentage} />
                <div className="text-sm text-muted-foreground text-center">
                  {credits.total - credits.used} credits remaining
                </div>
                <Button
                  asChild
                  variant="outline"
                  className="hidden md:inline-flex"
                >
                  <Link href="/pricing">
                    Get More Credits
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
          <Card>
            <div className="divide-y">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="p-4 flex items-center justify-between"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-2 rounded-full ${
                        activity.credits > 0
                          ? "bg-green-100 text-green-600"
                          : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      {activity.credits > 0 ? (
                        <CircleDollarSign className="h-4 w-4" />
                      ) : (
                        <History className="h-4 w-4" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium">{activity.type}</div>

                      <div className="text-xs text-muted-foreground">
                        {new Date(activity.date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`font-medium ${
                      activity.credits > 0 ? "text-green-600" : "text-blue-600"
                    }`}
                  >
                    {activity.credits > 0 ? "+" : ""}
                    {activity.credits} credits
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Low Credits Warning - Show only if credits are low */}
        {credits.total - credits.used < 10 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8"
          >
            <Card className="p-4 border-orange-200 bg-orange-50 dark:bg-orange-900/10">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-orange-500" />
                <div>
                  <h3 className="font-medium text-orange-500">
                    Low Credits Warning
                  </h3>
                  <p className="text-sm text-orange-500/80">
                    You're running low on credits. Consider upgrading your plan
                    or purchasing additional credits to continue using all
                    features.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Credits;
