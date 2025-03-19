"use client";
import React, { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Send, User, Mail, MessageSquare } from "lucide-react";
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
import { motion } from "framer-motion";

const inputVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

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

    try {
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

      await db.insert(ContactInfo).values({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        createdAt: formattedDate + " " + formattedTime,
      });

      toast({
        title: "Message sent successfully! 🎉",
        description: `We'll get back to you soon. Sent on ${formattedDate} at ${formattedTime}`,
        variant: "success",
      });

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-800">
      <div className="max-w-2xl mx-auto px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <h1 className="text-4xl font-bold mb-4 text-secondary">Get in Touch</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Send us a message and we'll respond as soon as possible.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-5"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div variants={inputVariants} className="space-y-2">
              <Label
                className="text-sm font-medium flex items-center gap-2"
                htmlFor="name"
              >
                <User className="w-4 h-4" />
                Your Name
              </Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="h-12 bg-transparent border-gray-200 dark:border-gray-700 focus:ring-2 ring-offset-2 ring-secondary"
                placeholder="Harry Potter"
                required
              />
            </motion.div>

            <motion.div variants={inputVariants} className="space-y-2">
              <Label
                className="text-sm font-medium flex items-center gap-2"
                htmlFor="email"
              >
                <Mail className="w-4 h-4" />
                Email Address
              </Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="h-12 bg-transparent border-gray-200 dark:border-gray-700 focus:ring-2 ring-offset-2 ring-secondary"
                placeholder="harry@hogwarts.com"
                required
              />
            </motion.div>

            <motion.div variants={inputVariants} className="space-y-2">
              <Label
                className="text-sm font-medium flex items-center gap-2"
                htmlFor="subject"
              >
                <MessageSquare className="w-4 h-4" />
                Subject
              </Label>
              <Select onValueChange={handleSelectChange} required>
                <SelectTrigger className="h-12 bg-transparent border-gray-200 dark:border-gray-700 focus:ring-2 ring-offset-2 ring-secondary">
                  <SelectValue placeholder="Choose a subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usage">General Usage</SelectItem>
                  <SelectItem value="account">Account Related</SelectItem>
                  <SelectItem value="feedback">Subscription Related</SelectItem>
                  <SelectItem value="others">Other Inquiry</SelectItem>
                </SelectContent>
              </Select>
            </motion.div>

            <motion.div variants={inputVariants} className="space-y-2">
              <Label
                className="text-sm font-medium flex items-center gap-2"
                htmlFor="message"
              >
                <MessageSquare className="w-4 h-4" />
                Your Message
              </Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="min-h-[150px] bg-transparent border-gray-200 dark:border-gray-700 focus:ring-2 ring-offset-2 ring-secondary"
                placeholder="I spotted Muggles in the Forbidden Forest!"
                required
              />
            </motion.div>

            <motion.div
              variants={inputVariants}
              className="flex justify-center pt-6"
            >
              <motion.button
                type="submit"
                disabled={isSubmitDisabled}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`
                  flex items-center gap-2 px-8 py-3
                  bg-secondary text-white rounded-md
                  transition-colors
                  ${
                    isSubmitDisabled
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-secondary/90"
                  }
                `}
              >
                <span>Send Message</span>
                <Send className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

export default Contact;
