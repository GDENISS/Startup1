import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "E-Rates - Real-Time Exchange Rates Coming Soon",
  description: "Akoot.tech E-Rates - Your upcoming platform for real-time exchange rate monitoring and currency conversion. Stay informed with accurate, up-to-date forex data. Launching February 2026.",
  openGraph: {
    title: "E-Rates by Akoot.tech - Coming Soon",
    description: "Real-time exchange rates platform launching February 2026. Subscribe for early access.",
    type: "website",
    url: "https://akoot.tech/e-rates",
    images: [{ url: "/og-erates.png", width: 1200, height: 630, alt: "E-Rates Coming Soon" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "E-Rates by Akoot.tech - Coming Soon",
    description: "Real-time exchange rates platform launching February 2026.",
    images: ["/og-erates.png"],
  },
  alternates: {
    canonical: "https://akoot.tech/e-rates",
  },
};

export default function ERatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
