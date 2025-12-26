import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - Let's Build Something Together",
  description: "Get in touch with Akoot.tech to discuss your project. We're here to help startups, businesses, and government agencies build digital solutions. Email: info@akoot.tech",
  keywords: ["contact software developer Kenya", "hire web developer", "custom software inquiry", "GIS development contact", "Nairobi tech company contact"],
  openGraph: {
    title: "Contact Akoot.tech - Let's Build Something Together",
    description: "Ready to start your project? Get in touch with our team today.",
    type: "website",
    url: "https://akoot.tech/contact",
    images: [{ url: "/og-contact.png", width: 1200, height: 630, alt: "Contact Akoot.tech" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Akoot.tech - Let's Build Something Together",
    description: "Get in touch with our team to discuss your next project.",
    images: ["/og-contact.png"],
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
