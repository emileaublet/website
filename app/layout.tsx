import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Émile Aublet",
  description: "Senior product designer and developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
