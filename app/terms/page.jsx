"use client";
import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Link from "next/link";

function Terms() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="min-h-screen bg-white dark:bg-slate-800 text-black dark:text-white">
      <motion.div 
        className="fixed top-16 left-0 right-0 h-0.5 bg-secondary origin-left z-50" 
        style={{ scaleX }} 
      />

      <div className="max-w-3xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-secondary">
            Terms of Service
          </h1>
          <p className="text-gray-600 dark:text-gray-400">Last updated: July 15, 2024</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-16"
        >
          <section className="prose dark:prose-invert max-w-none">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="text-2xl font-semibold mb-6 text-secondary border-b border-gray-200 dark:border-gray-700 pb-2">
                1. Introduction
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Welcome to DevMockupAI ("we," "our," or "us"). By accessing or using our application and services (collectively, the "Services"), you agree to be bound by these Terms of Service ("Terms"). Please read these Terms carefully before using our Services.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="text-2xl font-semibold mb-6 text-secondary border-b border-gray-200 dark:border-gray-700 pb-2">
                2. Data Protection and Privacy
              </h2>
              <div className="space-y-4">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  2.1. We process personal data in accordance with our Privacy Policy and applicable data protection laws, including but not limited to the General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA).
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  2.2. By using our Services, you acknowledge that your personal data will be processed as described in our Privacy Policy.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="text-2xl font-semibold mb-6 text-secondary border-b border-gray-200 dark:border-gray-700 pb-2">
                3. Intellectual Property Rights
              </h2>
              <div className="space-y-4">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  3.1. Our Services and all related content, features, and functionality are owned by DevMockupAI and are protected by international copyright, trademark, and other intellectual property laws.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  3.2. You retain ownership of any content you submit through our Services. By submitting content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and display such content solely for the purpose of providing and improving our Services.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="text-2xl font-semibold mb-6 text-secondary border-b border-gray-200 dark:border-gray-700 pb-2">
                4. AI-Generated Content
              </h2>
              <div className="space-y-4">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  4.1. Our Services utilize artificial intelligence to generate content. While we strive to provide accurate and helpful content, we make no warranties about the accuracy, reliability, or completeness of AI-generated content.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  4.2. You are responsible for reviewing and verifying any AI-generated content before use. We are not liable for any consequences resulting from your use of AI-generated content.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="text-2xl font-semibold mb-6 text-secondary border-b border-gray-200 dark:border-gray-700 pb-2">
                5. Limitation of Liability
              </h2>
              <div className="space-y-4">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  5.1. To the maximum extent permitted by law, DevMockupAI and its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  5.2. Our total liability for any claims arising under these Terms shall not exceed the amount you paid for our Services in the 12 months preceding the claim.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="text-2xl font-semibold mb-6 text-secondary border-b border-gray-200 dark:border-gray-700 pb-2">
                6. Contact Information
              </h2>
              <div className="space-y-4">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  For any questions about these Terms, please contact us at:
                </p>
                <div className="mt-4">
                  <Link 
                    href="/contact" 
                    className="inline-flex items-center px-6 py-3 bg-secondary text-white rounded-md hover:bg-secondary/90 transition-colors"
                  >
                    Contact Us
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.div>
          </section>
        </motion.div>
      </div>
    </div>
  );
}

export default Terms;
