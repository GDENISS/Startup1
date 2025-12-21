"use client";

import React from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What services do you offer?",
    answer:
      "We specialize in crafting intuitive digital platforms including web applications, mobile solutions, and custom software. Our expertise spans GIS systems, Python development, and Golang services tailored to solve everyday problems for startups and government agencies.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Project timelines vary based on complexity and scope. A simple web application might take 4-6 weeks, while more complex platforms can take 3-6 months. We provide detailed timelines during our initial consultation.",
  },
  {
    question: "What technologies do you work with?",
    answer:
      "Our tech stack includes modern frameworks and languages such as Next.js, React, Python, Golang, and GIS technologies. We choose the best tools for each project to ensure optimal performance and scalability.",
  },
  {
    question: "Do you provide ongoing support after launch?",
    answer:
      "Yes, we offer comprehensive maintenance and support packages. This includes bug fixes, security updates, feature enhancements, and technical support to ensure your platform runs smoothly.",
  },
  {
    question: "How do you ensure project quality?",
    answer:
      "We follow industry best practices including code reviews, automated testing, and continuous integration. Every project goes through rigorous quality assurance before deployment.",
  },
  {
    question: "Can you work with existing systems?",
    answer:
      "Absolutely. We specialize in integrating with existing infrastructure, whether it's legacy systems, third-party APIs, or modern cloud services. We ensure seamless connectivity and data flow.",
  },
  {
    question: "What is your pricing structure?",
    answer:
      "We offer flexible pricing models including fixed-price projects, time and materials, and retainer agreements. Contact us for a detailed quote tailored to your specific needs.",
  },
  {
    question: "How do we get started?",
    answer:
      "Simply reach out through our contact form or email. We'll schedule an initial consultation to discuss your requirements, provide recommendations, and create a project roadmap.",
  },
];

const FAQ = () => {
  return (
    <div className="min-h-screen w-full bg-black">
      <div className="mx-auto max-w-4xl px-4 py-16 md:px-8 md:py-24">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <p className="font-mono text-sm uppercase tracking-widest text-neutral-500">
            Support
          </p>
          <h1 className="mt-3 text-4xl font-bold text-white md:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-neutral-400">
            Find answers to common questions about our services and process.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <details
              key={index}
              className="group border-b border-neutral-800 pb-4 transition-all"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-lg font-medium text-white transition-colors hover:text-rose-500">
                <span>{faq.question}</span>
                <svg
                  className="h-5 w-5 flex-shrink-0 text-neutral-500 transition-transform group-open:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <div className="pb-2 pr-8 text-neutral-400">{faq.answer}</div>
            </details>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 border-t border-neutral-800 pt-12 text-center">
          <h3 className="text-2xl font-bold text-white">
            Still have questions?
          </h3>
          <p className="mt-2 text-neutral-400">
            We're here to help. Reach out to our team for personalized support.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="/contact"
              className="flex h-10 w-fit items-center justify-center bg-rose-600 px-8 py-2 transition-colors hover:bg-rose-700"
            >
              <span className="text-md font-medium text-neutral-50">
                Contact Us
              </span>
            </a>
            <a
              href="mailto:info@akoot.tech"
              className="flex h-10 w-fit items-center justify-center border-b border-neutral-600 px-4 py-2 transition-colors hover:border-neutral-400"
            >
              <span className="text-md font-medium text-neutral-50">
                Email Support
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
