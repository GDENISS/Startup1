import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Akoot.tech",
  description: "Get in touch with Akoot.tech. Let's discuss your project and build something great together. Contact us for web development, mobile apps, GIS solutions, and custom software.",
  keywords: ["contact software developer Kenya", "hire web developer", "custom software inquiry", "GIS development contact", "Nairobi tech company contact"],
  openGraph: {
    title: "Contact Us | Akoot.tech",
    description: "Have a project in mind? We'd love to hear from you.",
    type: "website",
    url: "https://akoot.tech/contact",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Akoot.tech",
    description: "Get in touch with our team to discuss your next project.",
  },
  alternates: {
    canonical: "https://akoot.tech/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
