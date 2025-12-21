import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto_Flex } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/Header/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const robotoFlex = Roboto_Flex({
  variable: "--font-roboto-flex",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://akoot.tech'),
  title: {
    default: "Akoot.tech | Building Digital Platforms That Solve Real Problems",
    template: "%s | Akoot.tech",
  },
  description: "Akoot.tech crafts intuitive digital platforms including web applications, mobile solutions, GIS systems, and custom software for startups, businesses, and government agencies in Kenya and beyond.",
  keywords: ["web development", "mobile app development", "GIS solutions", "custom software", "Kenya tech", "software development Kenya", "Nairobi developers", "geospatial technology", "machine learning", "Python development", "Golang development", "Next.js development"],
  authors: [{ name: "Akoot.tech" }],
  creator: "Akoot.tech",
  publisher: "Akoot.tech",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://akoot.tech",
    siteName: "Akoot.tech",
    title: "Akoot.tech | Building Digital Platforms That Solve Real Problems",
    description: "Crafting intuitive digital platforms for everyday problems. Smart systems for real challenges.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Akoot.tech - Building Digital Platforms",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Akoot.tech | Building Digital Platforms That Solve Real Problems",
    description: "Crafting intuitive digital platforms for everyday problems. Smart systems for real challenges.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
<<<<<<< HEAD
  verification: {
    // Add your verification codes here when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
=======
>>>>>>> version2
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${robotoFlex.variable} overflow-x-hidden bg-black antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="fixed inset-0 z-0">
            <div className="absolute top-0 right-0 left-0 h-4 bg-black bg-[linear-gradient(45deg,rgba(16,16,16,0.1)_1px,transparent_1px),linear-gradient(-45deg,rgba(16,16,16,0.1)_1px,transparent_1px),linear-gradient(rgba(8,8,8,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(8,8,8,0.05)_1px,transparent_1px)] bg-size-[6px_6px,6px_6px,12px_12px,12px_12px]"></div>
            <div className="absolute top-0 bottom-0 left-0 w-8 bg-black bg-[linear-gradient(45deg,rgba(16,16,16,0.1)_1px,transparent_1px),linear-gradient(-45deg,rgba(16,16,16,0.1)_1px,transparent_1px),linear-gradient(rgba(8,8,8,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(8,8,8,0.05)_1px,transparent_1px)] bg-size-[6px_6px,6px_6px,12px_12px,12px_12px]"></div>
            <div className="absolute top-0 right-0 bottom-0 w-8 bg-black bg-[linear-gradient(45deg,rgba(16,16,16,0.1)_1px,transparent_1px),linear-gradient(-45deg,rgba(16,16,16,0.1)_1px,transparent_1px),linear-gradient(rgba(8,8,8,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(8,8,8,0.05)_1px,transparent_1px)] bg-size-[6px_6px,6px_6px,12px_12px,12px_12px]"></div>
          </div>

          <Header />
          <main className="relative z-10 flex flex-col items-center">
            {/* Content */}
            <div className="w-full px-0 pt-0 md:px-8 md:pt-8"> {children}</div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
