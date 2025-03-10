"use client";
import React from "react";
import { useRef } from "react";

function Image({ id, title, src, alt, reverse }) {
  const ref = useRef(null);

  return (
    <section
      className={`flex ${
        reverse ? "flex-row-reverse" : "flex-row"
      } items-center`}
    >
      <div ref={ref} className="w-1/2 p-6">
        <img className="w-full h-auto hover:scale-105" src={src} alt={alt} />
      </div>
      <h2 className="font-bold text-3xl text-primary w-1/2 p-6">
        {title}
      </h2>
    </section>
  );
}

const Workflow = () => {
  const sections = [
    {
      title: "ADD YOUR RESUME",
      imageSrc: "/img/example1.png",
      imageAlt: "Example 1",
      reverse: true,
      rounded: true,
    },
    {
      title: "CUSTOMIZE YOUR INTERVIEW",
      imageSrc: "/img/example3.png",
      imageAlt: "Example 3",
      reverse: false,
      rounded: true,
    },
    {
      title: "GET DETAILED FEEDBACK",
      imageSrc: "/img/example3.png",
      imageAlt: "Example 3",
      reverse: true,
      rounded: true,
      border: true,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto py-12">
      {sections.map((section, index) => (
        <Image
          key={index}
          id={index}
          title={section.title}
          src={section.imageSrc}
          alt={section.imageAlt}
          reverse={section.reverse}
          rounded={section.rounded}
          border={section.border}
        />
      ))}
    </div>
  );
};

export default Workflow;
