import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Akoot.tech",
  description: "Read the Terms of Service for Akoot.tech. Learn about our agreements, policies, and legal terms for using our services.",
  openGraph: {
    title: "Terms of Service | Akoot.tech",
    description: "Terms of Service and legal agreements for Akoot.tech services.",
    type: "website",
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
