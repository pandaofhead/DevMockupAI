"use client";
import { createContext } from "react";

export const ResumeInfoContext = createContext({
  resumeInfo: {
    firstName: "",
    lastName: "",
    jobTitle: "",
    address: "",
    phone: "",
    email: "",
    education: [],
    experience: [],
    projects: [],
    skills: []
  },
  setResumeInfo: () => {}
});
