import { pgTable, varchar, serial, text, boolean, timestamp, integer, date } from "drizzle-orm/pg-core";

export const MockInterview = pgTable("mockInterview", {
  id: serial("id").primaryKey(),
  jsonMockResp: text("jsonMockResp"),
  jobPosition: varchar("jobPosition"),
  jobDesc: varchar("jobDesc"),
  jobExperience: varchar("jobExperience"),
  questionType: varchar("questionType").default("domain"),
  createdBy: varchar("createdBy"),
  createdAt: varchar("createdAt"),
  mockId: varchar("mockId").notNull(),
});

export const UserAnswer = pgTable("userAnswer", {
  id: serial("id").primaryKey(),
  mockIdRef: varchar("mockId").notNull(),
  question: varchar("question").notNull(),
  correctAns: text("correctAns"),
  userAns: text("userAns"),
  feedback: text("feedback"),
  rating: varchar("rating"),
  userEmail: varchar("userEmail"),
  createdAt: varchar("createdAt"),
});

export const Resume = pgTable("resumes", {
  id: serial("id"),
  resumeId: varchar("resume_id").primaryKey(),
  resumeTitle: varchar("resume_title").notNull(),
  jobDesc: text("job_desc"),
  resumeText: text("resume_text"),
  resumeSections: text("resume_sections").notNull(),
  createdBy: varchar("created_by").notNull(),
  createdAt: varchar("created_at").notNull(),
  isDefault: boolean("is_default").default(false),
});

export const ResumePersonal = pgTable("resumePersonal", {
  id: serial("id").primaryKey(),
  resumeIdRef: varchar("resumeId").notNull(),
  firstName: varchar("firstName").notNull(),
  lastName: varchar("lastName").notNull(),
  jobTitle: varchar("jobTitle"),
  address: varchar("address").notNull(),
  phone: varchar("phone").notNull(),
  email: varchar("email").notNull(),
  createdAt: varchar("createdAt"),
});

export const ResumeEducation = pgTable("resumeEducation", {
  id: serial("id").primaryKey(),
  resumeIdRef: varchar("resumeId").notNull(),
  universityName: varchar("universityName").notNull(),
  startDate: varchar("startDate").notNull(),
  endDate: varchar("endDate").notNull(),
  degree: varchar("degree").notNull(),
  major: varchar("major").notNull(),
  description: text("description"),
  createdAt: varchar("createdAt"),
});

export const ResumeExperience = pgTable("resumeExperience", {
  id: serial("id").primaryKey(),
  resumeIdRef: varchar("resumeId").notNull(),
  title: varchar("title").notNull(),
  companyName: varchar("companyName").notNull(),
  city: varchar("city").notNull(),
  state: varchar("state").notNull(),
  startDate: varchar("startDate").notNull(),
  endDate: varchar("endDate"),
  currentlyWorking: boolean("currentlyWorking").notNull(),
  workSummary: text("workSummary").notNull(),
  createdAt: varchar("createdAt"),
});

export const ResumeProject = pgTable("resumeProject", {
  id: serial("id").primaryKey(),
  resumeIdRef: varchar("resumeId").notNull(),
  title: varchar("title").notNull(),
  companyName: varchar("companyName").notNull(),
  city: varchar("city").notNull(),
  state: varchar("state").notNull(),
  startDate: varchar("startDate").notNull(),
  endDate: varchar("endDate"),
  currentlyWorking: boolean("currentlyWorking").notNull(),
  workSummary: text("workSummary").notNull(),
  createdAt: varchar("createdAt"),
});

export const ResumeSkills = pgTable("resumeSkills", {
  id: serial("id").primaryKey(),
  resumeIdRef: varchar("resumeId").notNull(),
  name: varchar("name").notNull(),
  list: text("list").notNull(),
  createdAt: varchar("createdAt"), // Assuming skills list will be stored as a comma-separated string
});

export const ContactInfo = pgTable("contactInfo", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  email: varchar("email").notNull(),
  subject: varchar("subject").notNull(),
  message: text("message").notNull(),
  createdAt: varchar("createdAt").notNull(),
});

// Analytics-related schemas
export const ResumeTypeMetrics = pgTable("resumeTypeMetrics", {
  id: serial("id").primaryKey(),
  userId: varchar("userId").notNull(),
  resumeId: varchar("resume_id").notNull(),
  resumeType: varchar("resume_type").notNull(), // frontend, backend, fullstack
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});

export const TechStackMetrics = pgTable("techStackMetrics", {
  id: serial("id").primaryKey(),
  technology: varchar("technology").notNull(),
  count: integer("count").default(0),
  userId: varchar("userId").notNull(),
  lastUpdated: timestamp("last_updated").defaultNow()
});

export const InterviewMetrics = pgTable("interviewMetrics", {
  id: serial("id").primaryKey(),
  userId: varchar("userId").notNull(),
  interviewId: varchar("interview_id").notNull(),
  jobType: varchar("job_type").notNull(), // frontend, backend, fullstack, etc.
  technicalScore: integer("technical_score").default(0),
  behavioralScore: integer("behavioral_score").default(0),
  result: varchar("result").notNull(), // success, failed
  completedAt: timestamp("completed_at").defaultNow()
});

export const AiSuggestionMetrics = pgTable("aiSuggestionMetrics", {
  id: serial("id").primaryKey(),
  userId: varchar("userId").notNull(),
  suggestionId: varchar("suggestion_id").notNull().unique(),
  category: varchar("category").notNull(), // resume, interview, etc.
  action: varchar("action").notNull(), // accepted, rejected
  createdAt: timestamp("created_at").defaultNow()
});
