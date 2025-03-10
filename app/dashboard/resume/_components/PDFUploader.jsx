import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, message } from 'antd';
import { CloudUploadIcon } from 'lucide-react';

const PDFUploader = ({ onParsedData }) => {
  const onDrop = useCallback(async (acceptedFiles) => {
    try {
      const file = acceptedFiles[0];
      if (!file) return;

      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/resume/parse', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to parse PDF');
      }

      onParsedData(data.data);
      message.success('PDF successfully parsed!');
    } catch (error) {
      console.error('Error uploading PDF:', error);
      message.error('Failed to parse PDF. Please try again.');
    }
  }, [onParsedData]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    multiple: false
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
        ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}`}
    >
      <input {...getInputProps()} />
      <CloudUploadIcon className="w-12 h-12 mx-auto text-gray-400" />
      <p className="mt-2 text-sm text-gray-600">
        {isDragActive
          ? 'Drop the PDF here'
          : 'Drag and drop your resume PDF here, or click to select file'}
      </p>
      <p className="text-xs text-gray-500 mt-1">Only PDF files are accepted</p>
    </div>
  );
};

export default PDFUploader; 