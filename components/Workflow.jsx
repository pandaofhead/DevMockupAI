"use client";
import React from "react";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

function useParallax(value, distance) {
  return useTransform(value, [0, 0.7], [-distance * 2, distance * 2]);
}

function Image({ id, title, src, alt, reverse }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useParallax(scrollYProgress, 400);

  return (
    <section
      className={`flex ${
        reverse ? "flex-row-reverse" : "flex-row"
      } items-center`}
    >
      <div ref={ref} className="w-1/2 p-6">
        <img className="w-full h-auto hover:scale-105" src={src} alt={alt} />
      </div>
      <motion.h2
        style={{ y }}
        className="font-bold text-3xl text-white w-1/2 p-6"
      >
        {title}
      </motion.h2>
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
    },
    {
      title: "CUSTOMIZE YOUR INTERVIEW",
      imageSrc: "/img/example3.png",
      imageAlt: "Example 3",
      reverse: false,
    },
    {
      title: "GET DETAILED FEEDBACK",
      imageSrc: "/img/example3.png",
      imageAlt: "Example 3",
      reverse: true,
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
        />
      ))}
    </div>
  );
};

export default Workflow;
