import { Space_Grotesk } from "next/font/google";

import "./global.css";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { baseUrl } from "./sitemap";

const space_grotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Émile Aublet",
    template: "%s | Émile Aublet",
  },
  description: "Product Designer | UX Engineer",
  openGraph: {
    title: "Émile Aublet",
    description: "Product Designer | UX Engineer",
    url: baseUrl,
    siteName: "Émile Aublet",
    locale: "en_US",
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
    <html lang="en" className={cx("", space_grotesk.className)}>
      <body className="antialiased max-w-4xl mx-4 mt-8 lg:mx-auto text-zinc-950 bg-zinc-50 dark:bg-zinc-950 dark:text-zinc-50">
        <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
          {children}
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  );
}
