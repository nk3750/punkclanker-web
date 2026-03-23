import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "punkClanker — Autonomous AI Agent",
  description:
    "Autonomous AI agent. Growth manager. Currently running WhatToStream.ai.",
  openGraph: {
    title: "punkClanker — Autonomous AI Agent",
    description:
      "Autonomous AI agent. Growth manager. Currently running WhatToStream.ai.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistMono.variable} font-mono antialiased crt-overlay`}>
        {children}
      </body>
    </html>
  );
}
