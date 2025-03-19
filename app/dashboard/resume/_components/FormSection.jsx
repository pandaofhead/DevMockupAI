"use client";
import React, { useContext, useState, useEffect } from "react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, NotepadText } from "lucide-react";
import Link from "next/link";
import { Tooltip } from "antd";
import { Input, message, Modal } from "antd";
import { OpenAI } from 'openai';
import { recordAiSuggestion } from "@/utils/analytics-helpers";

const { TextArea } = Input;

function FormSection({ resumeId }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch resume data when component mounts
    const fetchResumeData = async () => {
      try {
        const response = await fetch(`/api/resume/${resumeId}`);
        const data = await response.json();
        
        if (response.ok && data.resume) {
          setResumeInfo({
            ...data.resume,
            ...JSON.parse(data.resume.resumeSections)
          });
        }
      } catch (error) {
        console.error('Error fetching resume:', error);
        message.error('Failed to load resume data');
      }
    };

    if (resumeId) {
      fetchResumeData();
    }
  }, [resumeId]);

  const handleSectionChange = (section, value) => {
    setResumeInfo(prev => ({
      ...prev,
      [section]: value
    }));
  };

  const improveSection = async (section) => {
    try {
      setLoading(true);
      const openai = new OpenAI({
        apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
      });

      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `You are a professional resume writer. Improve the following ${section} section while maintaining the core information and facts. Make it more impactful and professional.`
          },
          {
            role: "user",
            content: resumeInfo[section]
          }
        ],
      });

      const improvedContent = response.choices[0].message.content;
      const originalContent = resumeInfo[section];
      
      // Show the improved content in a modal for user confirmation
      Modal.confirm({
        title: `Improved ${section} section`,
        content: (
          <div className="mt-4">
            <div className="mb-4">
              <h4 className="font-medium text-sm mb-1">Original:</h4>
              <p className="p-2 bg-gray-100 rounded-md text-sm">{originalContent}</p>
            </div>
            <div>
              <h4 className="font-medium text-sm mb-1">Improved:</h4>
              <p className="p-2 bg-green-50 rounded-md text-sm">{improvedContent}</p>
            </div>
          </div>
        ),
        width: 700,
        okText: 'Apply Changes',
        cancelText: 'Keep Original',
        onOk: () => {
          // Apply the improved content
          handleSectionChange(section, improvedContent);
          message.success(`${section} section improved!`);
          
          // Record the acceptance for analytics
          recordAiSuggestion({
            category: 'resume-section',
            action: 'accepted',
            suggestionId: `${resumeId}-${section}-${Date.now()}`
          }).catch(err => console.error('Analytics error:', err));
        },
        onCancel: () => {
          // Record the rejection for analytics
          recordAiSuggestion({
            category: 'resume-section',
            action: 'rejected',
            suggestionId: `${resumeId}-${section}-${Date.now()}`
          }).catch(err => console.error('Analytics error:', err));
          
          message.info('Original content kept');
        }
      });
    } catch (error) {
      console.error('Error improving section:', error);
      message.error('Failed to improve section. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const sections = [
    'contact',
    'summary',
    'experience',
    'education',
    'skills',
    'projects'
  ];

  return (
    <div>
      <div className="flex justify-between items-center mx-4 mb-6">
        <Link href="/dashboard/resume">
          <Tooltip title="Back to Resumes">
            <Button>
              <ArrowLeft className="mr-2" />
              Back
            </Button>
          </Tooltip>
        </Link>
      </div>

      <div className="p-6 space-y-6">
        {sections.map(section => (
          <div key={section} className="space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold capitalize">{section}</h3>
              <Button 
                onClick={() => improveSection(section)}
                disabled={loading}
              >
                Improve with AI
              </Button>
            </div>
            <TextArea
              value={resumeInfo[section]}
              onChange={(e) => handleSectionChange(section, e.target.value)}
              rows={4}
              placeholder={`Enter your ${section} information`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default FormSection;
