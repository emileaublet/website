import "./global.css";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { baseUrl } from "./sitemap";
import { Nav } from "./components/nav";
import { Footer } from "./components/footer";
import { title } from "./const";

import { Inter, Space_Grotesk } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const space_grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Émile Aublet",
    template: "%s | Émile Aublet",
  },
  description: title,
  openGraph: {
    title: `Émile Aublet`,
    description: title,
    url: baseUrl,
    siteName: "Portfolio of Émile Aublet",
    locale: "en_CA",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const cx = (...classes) => classes.filter(Boolean).join(" ");

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cx("antialiased", inter.variable, space_grotesk.variable)}
    >
      <body className="antialiased max-w-6xl mx-auto px-4 lg:px-8 text-zinc-950 bg-zinc-50/10 dark:bg-zinc-950 dark:text-zinc-50 font-sans">
        <main className="flex-auto min-w-0 flex flex-col pb-10">
          <Nav />
          {children}
          <Footer />
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  );
}
