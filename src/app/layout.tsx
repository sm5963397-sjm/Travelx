import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientProviders from "@/components/providers/ClientProviders";
import Navbar from "@/components/layout/Navbar";
import MobileNav from "@/components/layout/MobileNav";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TRAVELX — Discover What's Around You | Location-Aware Travel Discovery",
  description:
    "Find famous places, hidden gems, local food, budget stays and photography spots wherever you are with TRAVELX modern travel discovery engine.",
  keywords: [
    "travel discovery",
    "places near me",
    "hidden gems",
    "local food",
    "budget stays",
    "Jaipur travel",
    "Mumbai travel",
    "Goa",
    "trip planner",
    "budget calculator",
  ],
  authors: [{ name: "TRAVELX Team" }],
  openGraph: {
    title: "TRAVELX — Discover What's Around You",
    description:
      "Find famous places, hidden gems, local food, budget stays and unforgettable experiences wherever you are.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#4f46e5",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
        <ClientProviders>
          <Navbar />
          <main className="flex-1 pb-16 md:pb-0">{children}</main>
          <Footer />
          <MobileNav />
        </ClientProviders>
      </body>
    </html>
  );
}
