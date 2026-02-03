"use client";

import React from "react";
import Image from "next/image";
import { StoreData } from "@/lib/db";
import { motion } from "framer-motion";
import { Instagram, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ArtistClientProps {
  data: StoreData;
}

export default function ArtistClient({ data }: ArtistClientProps) {
  const { artistInfo } = data;

  return (
    <div className="flex flex-col gap-24 md:gap-32 pb-24">
      {/* Intro Section */}
      <section className="container mx-auto px-6 md:px-12 pt-12 md:pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-sm tracking-[0.3em] uppercase font-sans text-zinc-400 font-medium">
                The Artist
              </h2>
              <h1 className="text-4xl md:text-6xl font-sans text-zinc-900 leading-[1.1] tracking-tight">
                About <br />
                {artistInfo.name}
              </h1>
            </div>
            
            <div className="space-y-6 text-base md:text-lg text-zinc-600 font-sans leading-relaxed">
              <p>{artistInfo.bio}</p>
            </div>

            <div className="flex gap-6 pt-4">
              <a href={`https://www.instagram.com/${artistInfo.instagram}/`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 transition-colors">
                <Instagram className="w-5 h-5" /> <span className="text-sm font-sans tracking-widest uppercase font-medium">Instagram</span>
              </a>
              <a href="mailto:hello@alina-studio.com" className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 transition-colors">
                <Mail className="w-5 h-5" /> <span className="text-sm font-sans tracking-widest uppercase font-medium">Email</span>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative aspect-square lg:aspect-[4/5] rounded-2xl overflow-hidden shadow-subtle-lg"
          >
            <Image
              src={artistInfo.profileImage}
              alt={artistInfo.name}
              fill
              className="object-cover object-top"
            />
          </motion.div>
        </div>
      </section>

      {/* Philosophy & Background */}
      <section className="bg-zinc-50 py-24 md:py-32 border-y border-zinc-100">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
            <div className="space-y-6">
              <h3 className="font-sans text-3xl text-zinc-900 font-bold">Background</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm tracking-widest uppercase font-sans font-bold text-zinc-400 mb-1">Education</h4>
                  <p className="font-sans text-zinc-600 font-medium">{artistInfo.education}</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="font-sans text-3xl text-zinc-900 font-bold">Vision</h3>
              <p className="font-sans text-lg text-zinc-600 leading-relaxed border-l-2 border-zinc-200 pl-6 py-2 italic">
                "{artistInfo.philosophy}"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="container mx-auto px-6 md:px-12 py-12">
        <div className="bg-zinc-900 rounded-[2.5rem] p-12 md:p-24 text-center text-white space-y-8 shadow-subtle-lg">
          <h2 className="text-3xl md:text-5xl font-sans font-bold">Let's create something together</h2>
          <p className="text-zinc-400 font-sans text-lg max-w-xl mx-auto">
            Whether you have a specific space in mind or just want to chat about art.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 justify-center pt-8 max-w-2xl mx-auto">
            <div className="bg-white/5 p-8 rounded-3xl border border-white/10 space-y-3 hover:bg-white/10 transition-colors">
              <p className="text-zinc-400 text-xs uppercase tracking-[0.2em] font-bold font-sans">Enquiries</p>
              <a href="mailto:hello@alina-studio.com" className="text-lg font-sans font-bold hover:text-white transition-colors block">hello@alina-studio.com</a>
            </div>
            <div className="bg-white/5 p-8 rounded-3xl border border-white/10 space-y-3 hover:bg-white/10 transition-colors">
              <p className="text-zinc-400 text-xs uppercase tracking-[0.2em] font-bold font-sans">WhatsApp</p>
              <a href={`https://wa.me/${artistInfo.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-lg font-sans font-bold hover:text-white transition-colors block">{artistInfo.whatsapp}</a>
            </div>
          </div>
          <div className="pt-8">
            <a href={`https://www.instagram.com/${artistInfo.instagram}/`} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="rounded-full bg-white text-zinc-900 hover:bg-zinc-100 h-16 px-10 flex gap-2 mx-auto font-sans font-bold text-lg">
                <Instagram className="w-5 h-5 text-zinc-900" /> Follow My Journey
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
