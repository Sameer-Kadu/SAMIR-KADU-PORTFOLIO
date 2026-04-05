
import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import './globals.css';
import Navbar from "../../src/components/shared/Navbar";
import Footer from "../../src/components/shared/Footer";
import { ThemeProvider } from "../../src/components/shared/ThemeProvider";
import ScrollToTopButton from "../../src/components/shared/ScrollToTopButton";
import PageLoader from "../../src/components/shared/PageLoader";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Samir Kadu — Full Stack Engineer",
  description:
    "Samir Kadu is a Full Stack Engineer & QA Automation specialist with 3+ years building scalable health-tech platforms. React, Next.js, TypeScript, Node.js, AWS.",
  keywords:
    "Samir Kadu, Full Stack Engineer, Software Engineer, React, Next.js, TypeScript, Node.js, AWS, QA Automation, Bajaj Finserv Health, portfolio",
  openGraph: {
    title: "Samir Kadu — Full Stack Engineer",
    description:
      "3+ years building scalable health-tech platforms. React · Next.js · TypeScript · AWS.",
    url: "https://www.samirkadu.com",
    siteName: "Samir Kadu",
    images: [
      {
        url: "https://www.samirkadu.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Samir Kadu — Full Stack Engineer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Samir Kadu — Full Stack Engineer",
    description:
      "3+ years building scalable health-tech platforms. React · Next.js · TypeScript · AWS.",
    images: ["https://www.samirkadu.com/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${dmSans.variable}`}
    >
      <body className="font-body antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <PageLoader />
          <Navbar />
          {children}
          <Footer />
          <ScrollToTopButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
