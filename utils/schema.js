import { pgTable, varchar, serial, text, boolean } from "drizzle-orm/pg-core";

export const MockInterview = pgTable("mockInterview", {
  id: serial("id").primaryKey(),
  jsonMockResp: text("jsonMockResp").notNull(),
  jobPosition: varchar("jobPosition").notNull(),
  jobDesc: varchar("jobDesc").notNull(),
  jobExperience: varchar("jobExperience").notNull(),
  createdBy: varchar("createdBy").notNull(),
  createdAt: varchar("createdAt").notNull(),
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

export const Resume = pgTable("Resume", {
  id: serial("id").primaryKey(),
  resumeId: varchar("resumeId").notNull(),
  resumeTitle: varchar("resumeTitle").notNull(),
  jobDesc: text("jobDesc").notNull(),
  createdBy: varchar("createdBy").notNull(),
  createdAt: varchar("createdAt").notNull(),
});

export const ResumePersonal = pgTable("resumePersonal", {
  id: serial("id").primaryKey(),
  resumeIdRef: varchar("resumeId").notNull(),
  firstName: varchar("firstName").notNull(),
  lastName: varchar("lastName").notNull(),
  jobTitle: varchar("jobTitle").notNull(),
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

export const NotificationInfo = pgTable("notificationInfo", {
  id: serial("id").primaryKey(),
  notificationTitle: varchar("notificationTitle").notNull(),
  notificationContent: text("notificationContent").notNull(),
  createdBy: varchar("createdBy").notNull(),
  createdAt: varchar("createdAt").notNull(),
});

export const ContactInfo = pgTable("contactInfo", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  email: varchar("email").notNull(),
  subject: varchar("subject").notNull(),
  message: text("message").notNull(),
  createdAt: varchar("createdAt").notNull(),
});
