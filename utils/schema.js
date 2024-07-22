import { pgTable, varchar, serial, text } from "drizzle-orm/pg-core";

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

export const NewResume = pgTable("newResume", {
  id: serial("id").primaryKey(),
  resumeId: varchar("resumeId").notNull(),
  resumeTitle: varchar("resumeTitle").notNull(),
  jobDesc: text("jobDesc").notNull(),
  createdBy: varchar("createdBy").notNull(),
  createdAt: varchar("createdAt").notNull(),
});

// export const ResumeDetails = pgTable("resumeDetails", {
//   id: serial("id").primaryKey(),
//   resumeIdRef: varchar("resumeId").notNull(),
//   sectionTitle: varchar("sectionTitle").notNull(),
//   sectionContent: text("sectionContent").notNull(),
//   createdBy: varchar("createdBy").notNull(),
//   createdAt: varchar("createdAt").notNull(),
// });

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
