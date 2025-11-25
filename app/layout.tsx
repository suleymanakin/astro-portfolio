import type { Metadata } from "next";
import { Orbitron, Inter } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cosmic Perspectives - Astrophotography Portfolio",
  description: "An immersive journey through the cosmos, captured one photon at a time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${orbitron.variable} ${inter.variable} bg-[#050510] text-gray-200 font-sans antialiased overflow-x-hidden`}
      >
        {/* Dynamic Background Blobs */}
        <div className="fixed top-0 left-0 w-full h-full z-[-1] overflow-hidden pointer-events-none">
          <div className="liquid-blob one"></div>
          <div className="liquid-blob two"></div>
          <div className="liquid-blob three"></div>
        </div>

        <div className="relative flex flex-col min-h-screen w-full">
          {children}
        </div>
      </body>
    </html>
  );
}
