
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import './globals.css';
import Navbar from "../../src/components/shared/Navbar";
import Footer from "../../src/components/shared/Footer";
import { ThemeProvider } from "../../src/components/shared/ThemeProvider";
import ScrollToTopButton from "../../src/components/shared/ScrollToTopButton";
import PageLoader from "../../src/components/shared/PageLoader";
import AvailabilityBar from "../../src/components/shared/AvailabilityBar";
import MobileBottomNav from "../../src/components/shared/MobileBottomNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Samir Kadu — Full Stack Engineer & QA Automation Specialist",
  description:
    "Samir Kadu builds reliable, production-grade web applications and automated test systems. 3+ years at Bajaj Finserv Health. AWS Certified.",
  keywords:
    "Samir Kadu, Full Stack Developer, QA Automation Engineer, React, Next.js, TypeScript, Spring Boot, Selenium, Playwright, AWS, Bajaj Finserv Health, portfolio",
  openGraph: {
    title: "Samir Kadu — Full Stack Engineer & QA Automation Specialist",
    description:
      "Samir Kadu builds reliable, production-grade web applications and automated test systems. 3+ years at Bajaj Finserv Health. AWS Certified.",
    url: "https://www.samirkadu.com",
    siteName: "Samir Kadu",
    images: [
      {
        url: "https://www.samirkadu.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Samir Kadu — Full Stack Engineer & QA Automation Specialist",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Samir Kadu — Full Stack Engineer & QA Automation Specialist",
    description:
      "Samir Kadu builds reliable, production-grade web applications and automated test systems. 3+ years at Bajaj Finserv Health. AWS Certified.",
    images: ["https://www.samirkadu.com/og-image.jpg"],
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
          <AvailabilityBar />
          <PageLoader />
          <Navbar />
          <div className="lg:pb-0 pb-16">{children}</div>
          <Footer />
          <ScrollToTopButton />
          <MobileBottomNav />
        </ThemeProvider>
      </body>
    </html>
  );
}
