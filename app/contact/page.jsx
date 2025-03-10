"use client";
import React, { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { db } from "@/utils/db";
import { ContactInfo } from "@/utils/schema";

function Contact() {
  const { toast } = useToast();
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    const { name, email, subject, message } = formData;
    setIsSubmitDisabled(!name || !email || !subject || !message);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (value) => {
    setFormData({
      ...formData,
      subject: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);

    // Get the current time
    const now = new Date();
    const formattedDate = now.toLocaleDateString([], {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const formattedTime = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const toastTitle = "Message sent!";
    const toastContent = `Sent on ${formattedDate} at ${formattedTime}`;
    toast({
      title: toastTitle,
      description: toastContent,
    });

    // Insert data into the database
    await db.insert(ContactInfo).values({
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
      createdAt: formattedDate + " " + formattedTime,
    });

    // clear form data
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="flex flex-col justify-center items-center bg-white min-h-screen dark:bg-slate-700">
      <h1 className="text-3xl font-bold mb-5">Get in touch</h1>
      <p className="text-gray-600 dark:text-gray-400">
        We would love to hear from you
      </p>
      <form className="p-8 max-w-md w-full" onSubmit={handleSubmit}>
        <div className="mb-4">
          <Label className="text-sm font-bold mb-2" htmlFor="name">
            Name
          </Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="dark:bg-gray-400 appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <Label className="block text-sm font-bold mb-2" htmlFor="email">
            Email
          </Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="dark:bg-gray-400 appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <Label className="block  text-sm font-bold mb-2" htmlFor="subject">
            Subject
          </Label>
          <Select onValueChange={handleSelectChange} required>
            <SelectTrigger className="w-full dark:bg-gray-400">
              <SelectValue placeholder="choose your subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="usage">Usage</SelectItem>
              <SelectItem value="technical">Technical Issues</SelectItem>
              <SelectItem value="Account">Account</SelectItem>
              <SelectItem value="others">Others</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="mb-4">
          <Label className="block text-sm font-bold mb-2" htmlFor="message">
            Message
          </Label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="dark:bg-gray-400 appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline h-32"
            required
          />
        </div>
        <div className="flex items-center justify-center">
          <button type="submit" disabled={isSubmitDisabled}>
            <Send 
              color="black"
              size={48}
              onClick={handleSubmit}
              className={`border-2 border-black dark:border-white hover:scale-105 text-white font-bold p-3 rounded-full focus:outline-none focus:shadow-outline ${
                isSubmitDisabled ? "opacity-50 cursor-not-allowed" : ""
              }`}
            />
          </button>
        </div>
      </form>
    </div>
  );
}

export default Contact;
