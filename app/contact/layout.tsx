import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Akoot.tech",
  description: "Get in touch with Akoot.tech. Let's discuss your project and build something great together. We respond within 24 hours.",
  openGraph: {
    title: "Contact Us | Akoot.tech",
    description: "Have a project in mind? We'd love to hear from you.",
    type: "website",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
