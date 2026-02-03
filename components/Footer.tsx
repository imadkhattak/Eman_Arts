"use client";

import React from "react";
import Link from "next/link";
import { Instagram, Mail, Phone, ExternalLink } from "lucide-react";
import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) return null;
  return (
    <footer className="bg-white pt-24 pb-12 border-t border-zinc-50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div className="space-y-6">
            <h2 className="text-3xl font-sans font-bold tracking-tighter text-zinc-900">
               EMAN
            </h2>
            <p className="text-zinc-500 font-sans leading-relaxed max-w-xs text-sm">
              Original paintings and limited edition prints, created with intention and emotion in the heart of the Pacific Northwest.
            </p>
            <div className="pt-2">
              <Link href="/admin/login" className="inline-flex items-center gap-2 px-4 py-2 border border-zinc-200 rounded-full text-[10px] uppercase tracking-[0.2em] text-zinc-500 hover:bg-zinc-900 hover:text-white hover:border-zinc-900 transition-all font-sans font-bold shadow-sm">
                Admin Login <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
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
              <a href="mailto:hello@eman-studio.com" className="flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 transition-colors font-sans">
                hello@eman-studio.com <Mail className="w-4 h-4" />
              </a>
              <a href="tel:+923199928963" className="flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 transition-colors font-sans">
                +92 3390624944 <Phone className="w-4 h-4" />
              </a>
              <a href="https://wa.me/923199928963" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 transition-colors font-sans">
                WhatsApp Us <span className="w-4 h-4 flex items-center justify-center bg-[#25D366] rounded-full text-white text-[10px]">W</span>
              </a>
              <div className="flex gap-4 pt-2 md:justify-end">
                <a href="https://www.instagram.com/imad_.khattak/" target="_blank" rel="noopener noreferrer">
                  <Instagram className="w-5 h-5 text-zinc-400 hover:text-zinc-900 cursor-pointer transition-colors" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-zinc-50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-500 text-sm font-sans">
            &copy; {new Date().getFullYear()} EMAN Studio. All rights reserved.
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
