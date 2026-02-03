import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "@/components/ui/sonner";

import { NavigationWrapper } from "@/components/NavigationWrapper";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Eman | Original Paintings & Art Collection",
  description: "Explore and purchase original oil and acrylic paintings. A modern gallery experience for the discerning collector.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${cormorantGaramond.variable} font-sans antialiased bg-white text-zinc-900 scroll-smooth`}
      >
        <CartProvider>
          <NavigationWrapper>
            <main className="min-h-screen">
              {children}
            </main>
          </NavigationWrapper>
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}
