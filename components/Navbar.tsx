"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Menu, X, Instagram } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { CartDrawer } from "./CartDrawer";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { totalItems } = useCart();

  const navLinks = [
    { name: "Portfolio", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "About", href: "/artist" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-50 h-20 px-6 md:px-12 flex items-center justify-between">
        <div className="flex-1 flex items-center">
          <Link href="/" className="group">
            <h1 className="font-serif text-3xl font-medium tracking-tighter text-zinc-900 group-hover:opacity-70 transition-opacity">
              ALINA
            </h1>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-12 flex-1 justify-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-sm tracking-widest uppercase font-sans transition-all duration-300 hover:text-zinc-900",
                pathname === link.href ? "text-zinc-900 font-medium" : "text-zinc-400"
              )}
            >
              {link.name}
              {pathname === link.href && (
                <motion.div
                  layoutId="nav-underline"
                  className="h-px bg-zinc-900 mt-1"
                />
              )}
            </Link>
          ))}
        </div>

        <div className="flex-1 flex items-center justify-end gap-2 md:gap-6">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center text-zinc-400 hover:text-zinc-900 transition-colors"
          >
            <Instagram className="w-5 h-5" />
          </a>
          
          <Button
            variant="ghost"
            size="icon"
            className="relative hover:bg-zinc-50 rounded-full"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingBag className="w-5 h-5 text-zinc-900" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-zinc-900 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden hover:bg-zinc-50 rounded-full"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-zinc-900" />
            ) : (
              <Menu className="w-6 h-6 text-zinc-900" />
            )}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-8 md:hidden"
          >
            <div className="flex flex-col gap-8 items-center pt-12">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-2xl font-serif text-zinc-900"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex gap-6 mt-8">
                <Instagram className="w-6 h-6 text-zinc-400" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CartDrawer open={isCartOpen} onOpenChange={setIsCartOpen} />
      <div className="h-20" /> {/* Spacer */}
    </>
  );
}
