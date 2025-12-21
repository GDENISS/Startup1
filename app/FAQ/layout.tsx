import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ | Akoot.tech",
  description: "Frequently asked questions about Akoot.tech services, pricing, project timelines, and our development process.",
  openGraph: {
    title: "FAQ | Akoot.tech",
    description: "Find answers to common questions about our services and process.",
    type: "website",
  },
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
