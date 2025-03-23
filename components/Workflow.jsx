"use client";
import React, { useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import Image from "next/image";

function WorkflowItem({ id, title, src, alt, reverse, description }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      x: reverse ? -20 : 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className={`flex flex-col ${
        reverse ? "md:flex-row-reverse" : "md:flex-row"
      } items-center mb-16 gap-8`}
    >
      <motion.div variants={itemVariants} className="w-full md:w-1/2 p-4">
        <div className="relative overflow-hidden rounded-xl shadow-lg group">
          <Image
            className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
            src={src}
            alt={alt}
            width={600}
            height={400}
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="w-full md:w-1/2 p-4">
        <h2 className="font-bold text-2xl md:text-3xl text-primary mb-4 relative">
          <span className="relative z-10">{title}</span>
        </h2>
        {description && (
          <p className="text-lg text-gray-700 dark:text-gray-300 mt-2">
            {description}
          </p>
        )}
      </motion.div>
    </motion.section>
  );
}

const Workflow = () => {
  const sections = [
    {
      title: "ADD YOUR RESUME",
      imageSrc: "/img/example1.png",
      imageAlt: "Example 1",
      reverse: true,
      description:
        "Upload your existing resume and let our AI analyze your experience and skills.",
    },
    {
      title: "CUSTOMIZE YOUR INTERVIEW",
      imageSrc: "/img/example2.png",
      imageAlt: "Example 3",
      reverse: false,
      description:
        "Select the job position and tailor your interview preparation to match specific requirements.",
    },
    {
      title: "ANALYZE YOUR PERFORMANCE",
      imageSrc: "/img/example3.png",
      imageAlt: "Example 3",
      reverse: true,
      description:
        "With our analytics, you can see your performance and improve your skills.",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold mb-16 text-center relative"
      >
        <span className="relative inline-block">How It Works</span>
      </motion.h2>

      {sections.map((section, index) => (
        <WorkflowItem
          key={index}
          id={index}
          title={section.title}
          src={section.imageSrc}
          alt={section.imageAlt}
          reverse={section.reverse}
          description={section.description}
        />
      ))}
    </div>
  );
};

export default Workflow;
