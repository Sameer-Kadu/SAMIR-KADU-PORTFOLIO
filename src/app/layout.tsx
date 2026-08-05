import type { Metadata, Viewport } from "next";
import { DM_Sans, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

import { SITE } from "@/content/site";
import { ThemeProvider } from "@/components/system/ThemeProvider";
import CommandPaletteProvider from "@/components/system/CommandPaletteProvider";
import WorkspaceNav from "@/components/system/WorkspaceNav";
import Footer from "@/components/system/Footer";
import BootSequence from "@/components/system/BootSequence";
import GridBackdrop from "@/components/system/GridBackdrop";
import Cursor from "@/components/system/Cursor";

const heading = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const body = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "700"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [...SITE.keywords],
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.url,
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.shortDescription,
    images: [{ url: SITE.ogImage, width: 1200, height: 630, alt: SITE.title }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.shortDescription,
    images: [SITE.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f9f9f7" },
    { media: "(prefers-color-scheme: dark)", color: "#080a0e" },
  ],
};

/**
 * Marks the document as already booted before first paint so a repeat
 * navigation within the session never flashes the initialization overlay.
 */
const BOOT_GUARD = `try{if(sessionStorage.getItem('workspace:booted')==='1'){document.documentElement.dataset.booted='1'}}catch(e){}`;

/** Structured data — derived entirely from the site content module. */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.name,
  jobTitle: SITE.role,
  url: SITE.url,
  description: SITE.description,
  address: { "@type": "PostalAddress", addressLocality: "Nagpur", addressCountry: "IN" },
  sameAs: ["https://github.com/Sameer-Kadu", "https://www.linkedin.com/in/sameer-kadu/"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${heading.variable} ${body.variable} ${mono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT_GUARD }} />
        <style>{`html[data-booted="1"] #boot-overlay{display:none}`}</style>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <CommandPaletteProvider>
            <GridBackdrop />
            <BootSequence />
            <WorkspaceNav />
            <main id="main">{children}</main>
            <Footer />
            <Cursor />
          </CommandPaletteProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
