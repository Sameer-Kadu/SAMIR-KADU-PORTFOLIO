import type { Metadata } from "next";
import { Inter } from "next/font/google";
import './globals.css';
import Navbar from "../../src/components/shared/Navbar";
import Footer from "../../src/components/shared/Footer";
import { ThemeProvider } from "../../src/components/shared/ThemeProvider";
import ScrollToTopButton from "../../src/components/shared/ScrollToTopButton";
import PageLoader from "../../src/components/shared/PageLoader";
import Chatbot from "../../src/components/shared/Chatbot";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Samir Kadu - Professional Portfolio",
  description: "Samir Kadu's professional portfolio showcasing his skills, projects, and experience in software development.",
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
          <Chatbot />
        </ThemeProvider>
      </body>
    </html>
  );
}