import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-sans",
});

export const viewport: Viewport = {
  themeColor: "#0a1f38",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Apex Dental Clinic | Modern & Gentle Dental Care in San Francisco",
  description:
    "Award-winning dental care offering general dentistry, Invisalign clear aligners, dental implants, laser whitening, and emergency dentistry in a calm, modern environment.",
  keywords: [
    "dental clinic San Francisco",
    "cosmetic dentistry",
    "dental implants",
    "Invisalign provider",
    "gentle dental care",
    "emergency dentist",
    "teeth whitening",
  ],
  authors: [{ name: "Apex Dental Team" }],
  openGraph: {
    title: "Apex Dental Clinic | Your Smile Deserves Expert Care",
    description:
      "Comfortable, high-tech dental care for the entire family. Book your consultation online today.",
    url: "https://apexdental-demo.com",
    siteName: "Apex Dental Clinic",
    images: [
      {
        url: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Apex Dental Modern Dental Clinic Interior",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Apex Dental Clinic",
    description: "Comfortable, modern dental care in San Francisco.",
    images: ["https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.className} ${inter.variable} min-h-screen bg-[#fbfdff] text-navy-900 antialiased selection:bg-teal-500 selection:text-white`} suppressHydrationWarning>
        <SmoothCursor />
        {children}
      </body>
    </html>
  );
}
