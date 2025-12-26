import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - Legal Information",
  description: "Read Akoot.tech's Terms of Service outlining our service agreements, project engagement terms, intellectual property rights, and legal obligations. Last updated December 21, 2025.",
  openGraph: {
    title: "Terms of Service - Akoot.tech",
    description: "Our terms of service and legal agreements for using Akoot.tech services.",
    url: "https://akoot.tech/terms",
  },
  robots: {
    index: true,
    follow: true,
  },
};

import React from "react";
import Footer from "@/components/Footer/Footer";

const TermsPage = () => {
  return (
    <>
      <div className="min-h-screen w-full bg-black">
        <div className="mx-auto max-w-4xl px-4 py-16 md:px-8 md:py-24">
          {/* Header */}
          <div className="mb-12 md:mb-16">
            <p className="font-mono text-sm uppercase tracking-widest text-neutral-500">
              Legal
            </p>
            <h1 className="mt-3 text-4xl font-bold text-white md:text-5xl">
              Terms of Service
            </h1>
            <p className="mt-4 text-neutral-400">
              Last updated: December 21, 2025
            </p>
          </div>

          {/* Terms Content */}
          <div className="space-y-8 text-neutral-400">
            <section>
              <h2 className="mb-4 text-2xl font-bold text-white">
                1. Agreement to Terms
              </h2>
              <p className="leading-relaxed">
                By accessing or using Akoot.tech's services, you agree to be bound 
                by these Terms of Service and all applicable laws and regulations. 
                If you do not agree with any part of these terms, you may not use 
                our services.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-white">
                2. Services Description
              </h2>
              <p className="leading-relaxed mb-3">
                Akoot.tech provides software development services including but not 
                limited to:
              </p>
              <ul className="ml-6 space-y-2">
                <li className="flex items-start">
                  <span className="mr-2 text-rose-600">•</span>
                  <span>Web and mobile application development</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-rose-600">•</span>
                  <span>GIS (Geographic Information System) solutions</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-rose-600">•</span>
                  <span>Custom software development</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-rose-600">•</span>
                  <span>Machine learning implementations</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-rose-600">•</span>
                  <span>Technical consulting and support</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-white">
                3. Project Engagement
              </h2>
              <p className="leading-relaxed mb-3">
                Each project engagement is governed by a separate statement of work 
                (SOW) or contract that outlines:
              </p>
              <ul className="ml-6 space-y-2">
                <li className="flex items-start">
                  <span className="mr-2 text-rose-600">•</span>
                  <span>Project scope and deliverables</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-rose-600">•</span>
                  <span>Timeline and milestones</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-rose-600">•</span>
                  <span>Payment terms and pricing</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-rose-600">•</span>
                  <span>Intellectual property rights</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-rose-600">•</span>
                  <span>Support and maintenance provisions</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-white">
                4. Intellectual Property
              </h2>
              <p className="leading-relaxed mb-3">
                Unless otherwise specified in the project contract:
              </p>
              <ul className="ml-6 space-y-2">
                <li className="flex items-start">
                  <span className="mr-2 text-rose-600">•</span>
                  <span>
                    Upon full payment, clients receive ownership of custom-developed 
                    code and assets created specifically for their project
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-rose-600">•</span>
                  <span>
                    Akoot.tech retains ownership of proprietary tools, frameworks, 
                    and methodologies used in development
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-rose-600">•</span>
                  <span>
                    Third-party libraries and open-source components remain under 
                    their respective licenses
                  </span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-white">
                5. Confidentiality
              </h2>
              <p className="leading-relaxed">
                We respect the confidentiality of your business information. All 
                proprietary information shared during the course of our engagement 
                will be kept confidential and will not be disclosed to third parties 
                without your explicit consent, except as required by law.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-white">
                6. Payment Terms
              </h2>
              <p className="leading-relaxed mb-3">
                Standard payment terms include:
              </p>
              <ul className="ml-6 space-y-2">
                <li className="flex items-start">
                  <span className="mr-2 text-rose-600">•</span>
                  <span>
                    Initial deposit (typically 30-50%) required before project 
                    commencement
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-rose-600">•</span>
                  <span>Milestone-based payments as outlined in the SOW</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-rose-600">•</span>
                  <span>Final payment due upon project completion and acceptance</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-rose-600">•</span>
                  <span>Late payments may incur additional fees</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-white">
                7. Warranties and Disclaimers
              </h2>
              <p className="leading-relaxed mb-3">
                We warrant that:
              </p>
              <ul className="ml-6 space-y-2 mb-4">
                <li className="flex items-start">
                  <span className="mr-2 text-rose-600">•</span>
                  <span>
                    Services will be performed with professional care and skill
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-rose-600">•</span>
                  <span>
                    Deliverables will substantially conform to specifications in the SOW
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-rose-600">•</span>
                  <span>Bug fixes will be provided during the warranty period</span>
                </li>
              </ul>
              <p className="leading-relaxed">
                However, we do not warrant that software will be error-free or operate 
                without interruption. All services are provided "as is" beyond the 
                explicit warranties in the project contract.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-white">
                8. Limitation of Liability
              </h2>
              <p className="leading-relaxed">
                To the maximum extent permitted by law, Akoot.tech shall not be liable 
                for any indirect, incidental, special, consequential, or punitive damages, 
                or any loss of profits or revenues, whether incurred directly or indirectly. 
                Our total liability shall not exceed the amount paid by the client for the 
                specific project or service giving rise to the claim.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-white">
                9. Termination
              </h2>
              <p className="leading-relaxed">
                Either party may terminate a project engagement as outlined in the 
                specific SOW. Early termination may result in payment for work completed 
                plus reasonable cancellation fees. Upon termination, the client must pay 
                for all work performed up to the termination date.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-white">
                10. Modifications to Terms
              </h2>
              <p className="leading-relaxed">
                We reserve the right to modify these terms at any time. Changes will be 
                effective upon posting to our website. Continued use of our services 
                after changes constitutes acceptance of the modified terms.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-white">
                11. Governing Law
              </h2>
              <p className="leading-relaxed">
                These terms shall be governed by and construed in accordance with the 
                laws of Kenya. Any disputes arising from these terms or our services 
                shall be subject to the exclusive jurisdiction of the courts of Kenya.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-white">
                12. Contact Information
              </h2>
              <p className="leading-relaxed">
                For questions about these Terms of Service, please contact us at:
              </p>
              <div className="mt-4 rounded-lg border border-neutral-800 bg-neutral-950 p-6">
                <p className="text-white">
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:info@akoot.tech"
                    className="text-rose-500 hover:text-rose-400"
                  >
                    info@akoot.tech
                  </a>
                </p>
                <p className="mt-2 text-white">
                  <strong>Address:</strong> Nairobi, Kenya
                </p>
              </div>
            </section>
          </div>

          {/* CTA Section */}
          <div className="mt-16 border-t border-neutral-800 pt-12 text-center">
            <h3 className="text-2xl font-bold text-white">
              Ready to Get Started?
            </h3>
            <p className="mt-4 text-neutral-400">
              Let's discuss your project and how we can help.
            </p>
            <a
              href="/contact"
              className="mt-6 inline-block rounded-lg bg-rose-600 px-8 py-3 font-medium text-white transition-colors hover:bg-rose-700"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TermsPage;
