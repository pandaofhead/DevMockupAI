"use client";
import { Input } from "@/components/ui/input";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useContext, useEffect, useState } from "react";

function PersonalDetail({ params, errors = {} }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [formData, setFormData] = useState(resumeInfo || {});

  useEffect(() => {
    if (resumeInfo) {
      setFormData(resumeInfo);
    }
  }, [resumeInfo]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setResumeInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  return (
    <div className="p-5 rounded-lg">
      <h2 className="font-bold text-lg">Personal Detail</h2>
      <div className="grid grid-cols-2 mt-5 gap-3">
        <div>
          <label className="text-sm">First Name</label>
          <Input
            name="firstName"
            defaultValue={resumeInfo?.firstName}
            required
            onChange={handleInputChange}
            className={errors.firstName ? "border-red-500" : ""}
          />
          {errors.firstName && (
            <p className="text-sm text-red-500 mt-1">{errors.firstName}</p>
          )}
        </div>
        <div>
          <label className="text-sm">Last Name</label>
          <Input
            name="lastName"
            required
            onChange={handleInputChange}
            defaultValue={resumeInfo?.lastName}
            className={errors.lastName ? "border-red-500" : ""}
          />
          {errors.lastName && (
            <p className="text-sm text-red-500 mt-1">{errors.lastName}</p>
          )}
        </div>
        <div className="col-span-2">
          <label className="text-sm">Job Title (Optional)</label>
          <Input
            name="jobTitle"
            onChange={handleInputChange}
            defaultValue={resumeInfo?.jobTitle}
            className={errors.jobTitle ? "border-red-500" : ""}
            placeholder="e.g., Software Engineer, Product Manager"
          />
          {errors.jobTitle && (
            <p className="text-sm text-red-500 mt-1">{errors.jobTitle}</p>
          )}
        </div>
        <div className="col-span-2">
          <label className="text-sm">Address</label>
          <Input
            name="address"
            required
            defaultValue={resumeInfo?.address}
            onChange={handleInputChange}
            className={errors.address ? "border-red-500" : ""}
          />
          {errors.address && (
            <p className="text-sm text-red-500 mt-1">{errors.address}</p>
          )}
        </div>
        <div>
          <label className="text-sm">Phone</label>
          <Input
            name="phone"
            required
            defaultValue={resumeInfo?.phone}
            onChange={handleInputChange}
            className={errors.phone ? "border-red-500" : ""}
          />
          {errors.phone && (
            <p className="text-sm text-red-500 mt-1">{errors.phone}</p>
          )}
        </div>
        <div>
          <label className="text-sm">Email</label>
          <Input
            name="email"
            required
            defaultValue={resumeInfo?.email}
            onChange={handleInputChange}
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PersonalDetail;
