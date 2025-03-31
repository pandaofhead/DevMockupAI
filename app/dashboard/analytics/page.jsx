"use client";
import React, { useMemo, useState, useEffect } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  FileText,
  Video,
  BarChart2,
  PieChart as PieChartIcon,
  TrendingUp,
  CheckCircle,
  X,
  Github,
  Terminal,
  Database,
  Loader2,
} from "lucide-react";
import { useUser } from "@clerk/nextjs";

function Analytics() {
  const breadcrumbItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Analytics" },
  ];

  const { user, isLoaded: isUserLoaded } = useUser();
  const [timeFrame, setTimeFrame] = useState("month");
  const [isLoading, setIsLoading] = useState(true);

  // Data state
  const [resumeTypeData, setResumeTypeData] = useState([]);
  const [techStackData, setTechStackData] = useState([]);
  const [interviewPerformanceData, setInterviewPerformanceData] = useState([]);
  const [jobTypeSuccessData, setJobTypeSuccessData] = useState([]);
  const [aiSuggestionData, setAiSuggestionData] = useState([]);
  const [techCategoryData, setTechCategoryData] = useState([]);

  const RESUME_COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  // Category colors for tech skills
  const CATEGORY_COLORS = {
    frontend: "indigo-500",
    backend: "green-500",
    database: "blue-500",
    devops: "purple-500",
  };

  // Category icons for tech skills
  const getCategoryIcon = (category) => {
    switch (category) {
      case "frontend":
        return <Github className="h-5 w-5 text-indigo-500" />;
      case "backend":
        return <Terminal className="h-5 w-5 text-green-500" />;
      case "database":
        return <Database className="h-5 w-5 text-blue-500" />;
      case "devops":
        return <TrendingUp className="h-5 w-5 text-purple-500" />;
      default:
        return <Github className="h-5 w-5 text-gray-500" />;
    }
  };

  // Get category background color class for progress bars
  const getCategoryColorClass = (category) => {
    switch (category) {
      case "frontend":
        return "bg-indigo-500";
      case "backend":
        return "bg-green-500";
      case "database":
        return "bg-blue-500";
      case "devops":
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };

  // Load mockup data
  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      // Set mockup data
      setResumeTypeData([
        { name: "Frontend Dev", value: 45 },
        { name: "Backend Dev", value: 30 },
        { name: "Full Stack", value: 25 },
      ]);

      setTechStackData([
        { name: "React", count: 38 },
        { name: "Node.js", count: 30 },
        { name: "TypeScript", count: 28 },
        { name: "Next.js", count: 25 },
        { name: "Python", count: 20 },
        { name: "AWS", count: 15 },
      ]);

      setTechCategoryData([
        { category: "frontend", percentage: 42 },
        { category: "backend", percentage: 35 },
        { category: "database", percentage: 15 },
        { category: "devops", percentage: 8 },
      ]);

      setInterviewPerformanceData([
        { month: "Jan", technical: 65, behavioral: 70 },
        { month: "Feb", technical: 68, behavioral: 72 },
        { month: "Mar", technical: 75, behavioral: 78 },
        { month: "Apr", technical: 80, behavioral: 76 },
        { month: "May", technical: 78, behavioral: 82 },
        { month: "Jun", technical: 85, behavioral: 85 },
      ]);

      setJobTypeSuccessData([
        { name: "Frontend", success: 75, failed: 25 },
        { name: "Backend", success: 65, failed: 35 },
        { name: "Full Stack", success: 70, failed: 30 },
        { name: "DevOps", success: 60, failed: 40 },
        { name: "ML Engineer", success: 55, failed: 45 },
      ]);

      setAiSuggestionData([
        { name: "Resume Edits", accepted: 85, rejected: 15 },
        { name: "Interview Tips", accepted: 78, rejected: 22 },
        { name: "Project Suggestions", accepted: 65, rejected: 35 },
      ]);

      // Set loading to false after data is loaded
      setIsLoading(false);
    }, 1000); // 1 second delay to simulate loading
  }, []);

  const LoadingState = () => (
    <div className="flex items-center justify-center h-64">
      <Loader2 className="h-8 w-8 animate-spin text-secondary" />
      <span className="ml-2">Loading analytics data...</span>
    </div>
  );

  return (
    <div className="p-6 space-y-8 w-full">
      <Breadcrumb items={breadcrumbItems} />

      <div className="flex items-center justify-between ">
        <h1 className="text-3xl font-bold tracking-tight">
          Analytics Dashboard
        </h1>
        <Select value={timeFrame} onValueChange={setTimeFrame}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Last Week</SelectItem>
            <SelectItem value="month">Last Month</SelectItem>
            <SelectItem value="quarter">Last Quarter</SelectItem>
            <SelectItem value="year">Last Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-2 w-full">
          <TabsTrigger
            value="overview"
            className="flex items-center justify-center gap-2"
          >
            <BarChart2 className="h-4 w-4" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger
            value="resumes"
            className="flex items-center justify-center gap-2"
          >
            <FileText className="h-4 w-4" />
            <span>Resume Analytics</span>
          </TabsTrigger>
          <TabsTrigger
            value="interviews"
            className="flex items-center justify-center gap-2"
          >
            <Video className="h-4 w-4" />
            <span>Interview Analytics</span>
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {isLoading ? (
            <LoadingState />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Resume Types Distribution */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">
                    Resume Types
                  </CardTitle>
                  <CardDescription>
                    Distribution of resume categories
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={resumeTypeData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) =>
                            `${name}: ${(percent * 100).toFixed(0)}%`
                          }
                        >
                          {resumeTypeData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={RESUME_COLORS[index % RESUME_COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Tech Stack Frequency */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">
                    Tech Stack
                  </CardTitle>
                  <CardDescription>
                    Most frequent technologies in your resumes
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={techStackData}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" width={70} />
                        <Tooltip />
                        <Bar dataKey="count" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Interview Performance Trends */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">
                    Performance Trends
                  </CardTitle>
                  <CardDescription>
                    Interview performance over time
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={interviewPerformanceData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="technical"
                          stroke="#8884d8"
                          activeDot={{ r: 8 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="behavioral"
                          stroke="#82ca9d"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        {/* Resume Analytics Tab */}
        <TabsContent value="resumes" className="space-y-6">
          {isLoading ? (
            <LoadingState />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* AI Suggestion Acceptance Rate */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-medium">
                    AI Suggestion Acceptance
                  </CardTitle>
                  <CardDescription>
                    How often you accept AI suggestions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={aiSuggestionData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="accepted" stackId="a" fill="#82ca9d" />
                        <Bar dataKey="rejected" stackId="a" fill="#ff8042" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Tech Skills Distribution with Icons */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-medium">
                    Tech Skills Breakdown
                  </CardTitle>
                  <CardDescription>
                    Categories of skills on your resumes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {isLoading ? (
                      <LoadingState />
                    ) : (
                      techCategoryData.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2">
                            {getCategoryIcon(item.category)}
                            <span className="capitalize">
                              {item.category} Development
                            </span>
                          </div>
                          <div className="w-1/2 bg-secondary/10 rounded-full h-2.5">
                            <div
                              className={
                                getCategoryColorClass(item.category) +
                                " h-2.5 rounded-full"
                              }
                              style={{ width: `${item.percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm">{item.percentage}%</span>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        {/* Interview Analytics Tab */}
        <TabsContent value="interviews" className="space-y-6">
          {isLoading ? (
            <LoadingState />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Interview Success Rate by Job Type */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-medium">
                    Success Rate by Job Type
                  </CardTitle>
                  <CardDescription>
                    Interview success rates by position type
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={jobTypeSuccessData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="success" fill="#82ca9d" />
                        <Bar dataKey="failed" fill="#ff8042" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Common Feedback Points */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-medium">
                    Common Feedback Points
                  </CardTitle>
                  <CardDescription>
                    Most frequent interview feedback
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <div>
                        <p className="font-medium">
                          Strong technical knowledge
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Mentioned in 78% of positive feedback
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <div>
                        <p className="font-medium">Clear communication</p>
                        <p className="text-sm text-muted-foreground">
                          Mentioned in 65% of positive feedback
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-red-100 dark:bg-red-900/20 rounded-lg">
                      <X className="h-5 w-5 text-red-500" />
                      <div>
                        <p className="font-medium">
                          Needs more practical examples
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Mentioned in 45% of negative feedback
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-red-100 dark:bg-red-900/20 rounded-lg">
                      <X className="h-5 w-5 text-red-500" />
                      <div>
                        <p className="font-medium">
                          System design knowledge gaps
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Mentioned in 40% of negative feedback
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Analytics;
