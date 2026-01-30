"use client";

import Link from "next/link";
import { Instagram, Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white pt-24 pb-12 border-t border-zinc-50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div className="space-y-6">
            <h2 className="font-serif text-2xl font-medium tracking-tighter text-zinc-900">
              ALINA
            </h2>
            <p className="text-zinc-500 font-sans leading-relaxed max-w-xs text-sm">
              Original paintings and limited edition prints, created with intention and emotion in the heart of the Pacific Northwest.
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="text-xs tracking-widest uppercase font-sans font-semibold text-zinc-400">
              Quick Links
            </h3>
            <div className="flex flex-col gap-3">
              <Link href="/shop" className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors">Art Collection</Link>
              <Link href="/artist" className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors">Meet the Artist</Link>
              <Link href="/shipping" className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors">Shipping & Returns</Link>
            </div>
          </div>

          <div className="space-y-6 text-right md:text-right">
            <h3 className="text-xs tracking-widest uppercase font-sans font-semibold text-zinc-400">
              Get in Touch
            </h3>
            <div className="flex flex-col gap-3 md:items-end">
              <a href="mailto:hello@alina-studio.com" className="flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 transition-colors">
                hello@alina-studio.com <Mail className="w-4 h-4" />
              </a>
              <a href="tel:+1234567890" className="flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 transition-colors">
                +1 (234) 567-890 <Phone className="w-4 h-4" />
              </a>
              <div className="flex gap-4 pt-2 md:justify-end">
                <Instagram className="w-5 h-5 text-zinc-400 hover:text-zinc-900 cursor-pointer transition-colors" />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-zinc-50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] text-zinc-400 tracking-widest uppercase font-sans">
            &copy; {new Date().getFullYear()} Alina Art Studio. All rights reserved.
          </p>
          <div className="flex gap-6">
            <span className="text-[10px] text-zinc-400 tracking-widest uppercase font-sans">Secure Checkout</span>
            <span className="text-[10px] text-zinc-400 tracking-widest uppercase font-sans">Worldwide Shipping</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
