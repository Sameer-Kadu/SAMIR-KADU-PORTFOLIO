
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import './globals.css';
import Navbar from "../../src/components/shared/Navbar";
import Footer from "../../src/components/shared/Footer";
import { ThemeProvider } from "../../src/components/shared/ThemeProvider";
import ScrollToTopButton from "../../src/components/shared/ScrollToTopButton";

import PageLoader from "../../src/components/shared/PageLoader";
import ChatbotClientWrapper from "../../src/components/shared/ChatbotClientWrapper";
import FloatingContactButton from "../../src/components/shared/FloatingContactButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Samir Kadu - Professional Portfolio",
  description: "Samir Kadu's professional portfolio showcasing his skills, projects, and experience in software development.",
  keywords: "Samir Kadu, portfolio, software developer, web developer, full-stack, frontend, backend, React, Next.js, JavaScript, TypeScript, Python",
  openGraph: {
    title: "Samir Kadu - Professional Portfolio",
    description: "Samir Kadu's professional portfolio showcasing his skills, projects, and experience in software development.",
    url: "https://www.samirkadu.com", // Replace with actual URL
    siteName: "Samir Kadu - Professional Portfolio",
    images: [
      {
        url: "https://www.samirkadu.com/og-image.jpg", // Replace with actual URL
        width: 1200,
        height: 630,
        alt: "Samir Kadu - Professional Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Samir Kadu - Professional Portfolio",
    description: "Samir Kadu's professional portfolio showcasing his skills, projects, and experience in software development.",
    creator: "@SamirKadu", // Replace with actual Twitter handle if available
    images: ["https://www.samirkadu.com/og-image.jpg"], // Replace with actual URL
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <PageLoader />
          
          <Navbar />
          {children}
          <Footer />
          <ScrollToTopButton />
          <ChatbotClientWrapper />
          <FloatingContactButton />
        </ThemeProvider>
      </body>
    </html>
  );
}