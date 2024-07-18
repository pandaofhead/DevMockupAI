"use client";
import React, { useRef, useState } from "react";

function DefaultResume() {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("File selected:", file);
    }
  };
  return (
    <div
      className="p-10 border border-dashed border-gray-500 rounded-lg bg-gray-300 hover:scale-105 hover:shadow-md cursor-pointer transition-all dark:bg-gray-800"
      onClick={handleClick}
    >
      <h2 className="font-bold text-lg text-center">⬆ Default Resume</h2>

      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept=".pdf, .docx"
        onChange={handleFileChange}
      />
    </div>
  );
}

export default DefaultResume;
