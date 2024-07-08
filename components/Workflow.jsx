import React from "react";
import Image from "next/image";

const Workflow = () => {
  const sections = [
    {
      title: "Input your default resume details",
      description:
        "Enter your resume details here, and we'll use it as a template for your next job application.",
      buttonText: "Get started",
      buttonLink: "/dashboard",
      imageSrc: "/images/example1.png",
      imageAlt: "Example 1",
      reverse: false,
    },
    {
      title: "Customize your resume by job requirements",
      description:
        "By adding job requirements, DevMockupAI customize your resume to match the job you're applying for.",
      buttonText: "Learn more",
      buttonLink: "/dashboard",
      imageSrc: "/images/example2.png",
      imageAlt: "Example 2",
      reverse: true,
    },
    {
      title: "Generate job interviews with your resume",
      description:
        "We generate job interviews for you by matching your resume with the job requirements, including tech and behavioral questions.",
      buttonText: "Read more",
      buttonLink: "/dashboard",
      imageSrc: "/images/example3.png",
      imageAlt: "Example 3",
      reverse: false,
    },
    {
      title: "Detailed feedback for your interview performance",
      description:
        "After the interview, we provide detailed feedback on your performance, including areas of improvement and strengths.",
      buttonText: "Read more",
      buttonLink: "/dashboard",
      imageSrc: "/images/example3.png",
      imageAlt: "Example 3",
      reverse: true,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto py-12">
      {sections.map((section, index) => (
        <div
          key={index}
          className={`flex flex-col md:flex-row ${
            section.reverse ? "md:flex-row-reverse" : ""
          } items-center justify-between py-12`}
        >
          <div className="md:w-1/2 p-6">
            <h2 className="text-3xl font-bold mb-4">{section.title}</h2>
            <p className="mb-6">{section.description}</p>
            <a
              href={section.buttonLink}
              className="inline-block bg-pink-500 text-white py-2 px-4 rounded-full hover:bg-pink-600 transition"
            >
              {section.buttonText}
            </a>
          </div>
          <div className="md:w-1/2 p-6">
            <Image
              src={section.imageSrc}
              alt={section.imageAlt}
              width={500}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Workflow;
