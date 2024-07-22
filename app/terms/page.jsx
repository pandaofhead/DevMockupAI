"use client";
import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

function Terms() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="min-h-screen bg-white dark:bg-slate-700 text-black dark:text-white p-20">
      <motion.div className="fixed top-20 left-0 right-0 h-4 bg-primary origin-left" style={{ scaleX }} />

      <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
      <p className="mb-2">Last updated: 07-15-2024</p>

      <section className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">1. Introduction</h2>
        <p>
          Welcome to DevMockupAI! By accessing or using our app, you agree to be
          bound by these Terms of Service. Please read them carefully.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">2. Acceptance of Terms</h2>
        <p>
          By using DevMockupAI, you confirm that you are at least 18 years old
          and have the legal capacity to enter into these terms. If you do not
          agree with these terms, please do not use our app.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">3. User Accounts</h2>
        <p>
          To use certain features of our app, you must create an account. You
          are responsible for maintaining the confidentiality of your account
          information and for all activities that occur under your account.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">4. User Content</h2>
        <p>
          "User Content" refers to any videos, resumes, or other materials you
          upload or submit to our app. You retain all rights to your User
          Content. By submitting User Content, you grant DevMockupAI a
          worldwide, non-exclusive, royalty-free license to use, display, and
          distribute your content in connection with the operation of the app.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">5. Content License</h2>
        <p>
          By submitting User Content, you grant us the right to use, modify, and
          display your content within the app and for promotional purposes. We
          will not sell your User Content to third parties.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">6. Privacy</h2>
        <p>
          We are committed to protecting your privacy. Please refer to our{" "}
          <a
            href="[link to privacy policy]"
            className="text-blue-500 dark:text-blue-300"
          >
            Privacy Policy
          </a>{" "}
          for information on how we collect, use, and disclose your personal
          information.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">
          7. Prohibited Activities
        </h2>
        <p>
          You agree not to engage in any of the following prohibited activities:
        </p>
        <ul className="list-disc list-inside">
          <li>
            Posting any content that is unlawful, harmful, or infringes on the
            rights of others.
          </li>
          <li>Using the app for any fraudulent or malicious activities.</li>
          <li>Harassing or abusing other users.</li>
        </ul>
      </section>

      <section className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">
          8. Intellectual Property
        </h2>
        <p>
          All content and materials available on DevMockupAI, excluding User
          Content, are the property of DevMockupAI and are protected by
          copyright, trademark, and other intellectual property laws.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">9. Termination</h2>
        <p>
          We reserve the right to terminate or suspend your account at our sole
          discretion, without prior notice, if we determine that you have
          violated these terms. Upon termination, your right to use the app will
          cease immediately.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">
          10. Disclaimers and Limitation of Liability
        </h2>
        <p>
          DevMockupAI is provided on an "as is" and "as available" basis. We
          make no warranties, express or implied, regarding the app. To the
          fullest extent permitted by law, we disclaim all warranties and
          liabilities in connection with the app.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">11. Governing Law</h2>
        <p>
          These terms shall be governed and construed in accordance with the
          laws of [State/Country], without regard to its conflict of law
          provisions.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">12. Changes to Terms</h2>
        <p>
          We reserve the right to update these terms at any time. If we make
          material changes, we will notify you via email or through a notice on
          our app. Your continued use of the app after such changes signifies
          your acceptance of the new terms.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">13. Contact Information</h2>
        <p>
          If you have any questions about these Terms of Service, please contact
          us at{" "}
          <a
            href="mailto:[contact email]"
            className="text-blue-500 dark:text-blue-300"
          >
            [contact email]
          </a>
          .
        </p>
      </section>
    </div>
  );
}

export default Terms;
