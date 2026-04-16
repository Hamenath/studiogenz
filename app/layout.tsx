import type { Metadata } from "next";
import { Orbitron, Inter } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Studio GENZ — Creative Agency for the Bold",
  description:
    "Studio GENZ is a premium creative agency crafting cinematic digital experiences, brand identities, and cutting-edge web products for the next generation.",
  keywords: ["creative agency", "branding", "web design", "Studio GENZ", "digital experiences"],
  openGraph: {
    title: "Studio GENZ — Creative Agency for the Bold",
    description: "Premium cinematic digital experiences by Studio GENZ",
    type: "website",
  },
};

import SmoothScroll from "./components/SmoothScroll";
import ScrollToTop from "./components/ScrollToTop";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${orbitron.variable} ${inter.variable} min-h-full antialiased`}>
        <SmoothScroll>
          {children}
          <ScrollToTop />
        </SmoothScroll>
      </body>
    </html>
  );
}
