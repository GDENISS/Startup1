import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ - Frequently Asked Questions",
  description: "Find answers to common questions about Akoot.tech's services, project timelines, pricing, technology stack, and how we work with startups and businesses.",
  openGraph: {
    title: "FAQ - Akoot.tech",
    description: "Get answers to frequently asked questions about our services and process.",
    url: "https://akoot.tech/FAQ",
  },
};

import FAQ from "./FAQ";
import Footer from "@/components/Footer/Footer";

export default function FAQPage() {
  return (
    <>
      <FAQ />
      <Footer />
    </>
  );
}
