"use client";
import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { MoveRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle form submission, e.g., sending data to a backend
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

    // Display the toast notification
    toast({
      title: "Message sent!",
      description: `Sent on ${formattedDate} at ${formattedTime}`,
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
      <h1 className="text-3xl font-bold">Get in touch</h1>
      <div className="p-8 max-w-md w-full flex flex-row">
        <div className="w-full">
          <div className="mb-4">
            <label className="block  text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
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
            <label className="block text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
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
            <label className="block  text-sm font-bold mb-2" htmlFor="subject">
              Subject
            </label>
            {/* <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              required
            /> */}
            <Select>
              <SelectTrigger className="w-full dark:bg-gray-400">
                <SelectValue placeholder="choose your subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="usage">Usage</SelectItem>
                <SelectItem value="technical">Technical</SelectItem>
                <SelectItem value="others">Others</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="message">
              Message
            </label>
            <textarea
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
      </div>
    </div>
  );
}

export default Contact;
