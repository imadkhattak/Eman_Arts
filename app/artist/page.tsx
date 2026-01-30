"use client";

import Image from "next/image";
import { artistInfo, artworks } from "@/lib/data";
import { motion } from "framer-motion";
import { Instagram, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ArtistPage() {
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
              <h1 className="text-5xl md:text-7xl font-serif text-zinc-900 leading-[1.1] tracking-tight">
                About <br />
                <span className="italic">Alina</span>
              </h1>
            </div>
            
            <div className="space-y-6 text-lg text-zinc-600 font-sans leading-relaxed">
              <p>{artistInfo.bio}</p>
              <p>
                My journey began in the rugged landscapes of the North, where the shifting colors of the sky first taught me the language of emotion. I believe that every brushstroke is a breath, and every canvas is a new opportunity to find silence in the noise.
              </p>
            </div>

            <div className="flex gap-6 pt-4">
              <a href={`https://instagram.com/${artistInfo.instagram}`} target="_blank" className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 transition-colors">
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
            className="relative aspect-square lg:aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl"
          >
            <Image
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop"
              alt="Alina"
              fill
              className="object-cover object-top"
            />
          </motion.div>
        </div>
      </section>

      {/* Philosophy & Background */}
      <section className="bg-zinc-50 py-24 md:py-32">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
            <div className="space-y-6">
              <h3 className="font-serif text-3xl text-zinc-900">Background</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm tracking-widest uppercase font-sans font-bold text-zinc-400 mb-1">Education</h4>
                  <p className="font-sans text-zinc-600">{artistInfo.education}</p>
                </div>
                <div>
                  <h4 className="text-sm tracking-widest uppercase font-sans font-bold text-zinc-400 mb-1">Selected Exhibitions</h4>
                  <ul className="font-sans text-zinc-600 space-y-1">
                    <li>Royal Academy Summer Exhibition (2023)</li>
                    <li>Modern Collective, London (2022)</li>
                    <li>Abstract Spaces, Paris (2021)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="font-serif text-3xl text-zinc-900 font-medium italic">Vision</h3>
              <p className="font-sans text-lg text-zinc-600 leading-relaxed italic border-l-2 border-zinc-200 pl-6 py-2">
                "{artistInfo.philosophy}"
              </p>
              <p className="font-sans text-zinc-600 leading-relaxed">
                My work is a pursuit of essentialism. In a world of overstimulation, I look for the quiet rhythms that connect us to the earth and to each other.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="container mx-auto px-6 md:px-12 py-12 md:py-24">
        <div className="bg-zinc-900 rounded-[2.5rem] p-12 md:p-24 text-center text-white space-y-8">
          <h2 className="text-4xl md:text-5xl font-serif">Let's create something <span className="italic">together</span></h2>
          <p className="text-zinc-400 font-sans text-lg max-w-xl mx-auto">
            Whether you have a specific space in mind or just want to chat about art, I'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button size="lg" className="rounded-full bg-white text-zinc-900 hover:bg-zinc-100 h-14 px-8 text-lg font-serif">
              Send an Inquiry
            </Button>
            <Button size="lg" variant="outline" className="rounded-full border-white/20 text-white hover:bg-white/10 h-14 px-8 flex gap-2">
              <Instagram className="w-5 h-5" /> Follow My Studio
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
