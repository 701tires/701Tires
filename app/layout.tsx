import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";  // <-- ADD THIS LINE

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "701 Tires | Tire Repair & Installation in Watford City, ND",
  description:
    "701 Tires offers tire installation, repair, rotations, and emergency calls in Watford City, ND. Call or text (701) 580-5567 for fast, affordable service.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <Analytics />  {/* ✅ This is the new line that tracks visits */}
      </body>
    </html>
  );
}
