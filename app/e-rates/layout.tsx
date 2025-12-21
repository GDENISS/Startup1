import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "E-Rates - Coming Soon | Akoot.tech",
  description: "E-Rates is an intelligent rate calculation platform designed to streamline pricing, quotations, and cost analysis for businesses of all sizes. Coming soon.",
  openGraph: {
    title: "E-Rates - Coming Soon | Akoot.tech",
    description: "Smart rate calculations at your fingertips. Launching soon.",
    type: "website",
  },
};

export default function ERatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
