"use client";
import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { MoveRight } from "lucide-react";
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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [notificationTitle, setNotificationTitle] = useState("");
  const [notificationContent, setNotificationContent] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
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
      content: toastContent,
    });

    // Insert data into the database
    await db.insert(ContactInfo).values({
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
      createdAt: formattedDate + " " + formattedTime,
    });

    // await db.insert(NotificationInfo).values({
    //   notificationTitle: toastTitle,
    //   notificationContent: toastContent,
    //   createdBy: formData.email,
    //   createdAt: now.toISOString(),
    // });
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
      <h1 className="text-3xl font-bold">Get in touch</h1>
      <p className="text-gray-600 dark:text-gray-400">
        We would love to hear from you and help you with any queries you may
      </p>
      <form className="p-8 max-w-md w-full" onSubmit={handleSubmit}>
        <div className="w-full">
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
            {/* <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              required
            /> */}
            <Select required>
              <SelectTrigger className="w-full dark:bg-gray-400">
                <SelectValue placeholder="choose your subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="usage">Usage</SelectItem>
                <SelectItem value="technical">Technical</SelectItem>
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
        </div>
        <div className="flex items-center justify-center">
          <button>
            <MoveRight
              size={48}
              onClick={handleSubmit}
              className="bg-primary hover:scale-105 text-white font-bold p-3 rounded-full focus:outline-none focus:shadow-outline"
            />
          </button>
        </div>
      </form>
    </div>
  );
}

export default Contact;
