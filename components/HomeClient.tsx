"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { StoreData } from "@/lib/db";
import { ArtworkCard } from "@/components/ArtworkCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Instagram, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";

interface HomeClientProps {
  data: StoreData;
}

export default function HomeClient({ data }: HomeClientProps) {
  const { addToCart } = useCart();
  const featuredArtworks = data.artworks.filter((a) => a.featured);
  const { artistInfo } = data;

  const handleAddToCart = (artwork: any) => {
    addToCart(artwork);
    toast.success(`${artwork.title} added to your collection`);
  };

  return (
    <div className="flex flex-col gap-24 md:gap-32 pb-24">
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[700px] flex items-center px-6 md:px-12 overflow-hidden border-b border-zinc-100">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center z-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-xl space-y-10"
          >
            <div className="space-y-6">
              <h2 className="text-xs tracking-[0.4em] uppercase font-sans text-zinc-400 font-bold">
                Modern Fine Art
              </h2>
              <h1 className="text-5xl md:text-7xl font-sans text-zinc-900 leading-[1.05] tracking-tighter font-bold">
                Capturing the <br />
                Unseen Rhythm <br />
                of Nature
              </h1>
            </div>
            <p className="text-lg md:text-xl text-zinc-500 font-sans leading-relaxed max-w-lg">
              Experience a collection of original oil and acrylic paintings by {artistInfo.name}. Exploring the intersection of light, memory, and raw emotion.
            </p>
            <div className="flex flex-wrap gap-4 md:gap-6 pt-4">
              <Link href="/shop" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto rounded-full bg-zinc-900 text-white hover:bg-zinc-800 h-14 md:h-16 px-8 md:px-10 text-base md:text-lg font-sans font-bold shadow-subtle-lg">
                  View Collection
                </Button>
              </Link>
              <Link href="/artist" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full border-zinc-200 h-14 md:h-16 px-8 md:px-10 text-base md:text-lg font-sans font-bold hover:bg-zinc-50">
                  The Artist
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative aspect-[4/5] w-full max-w-lg mx-auto lg:ml-auto"
          >
            <div className="absolute -inset-6 bg-zinc-100/50 rounded-[2.5rem] -z-10 transform rotate-1" />
            <div className="relative h-full w-full overflow-hidden rounded-3xl shadow-2xl border border-white/20">
              <Image
                src={data.artworks[0]?.image || artistInfo.backgroundImage}
                alt="Featured Artwork"
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>
        </div>
        
        {/* Background Decorative Element */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-zinc-50/30 -z-10" />
      </section>

      {/* Featured Artworks Section */}
      <section className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="space-y-4">
            <h2 className="text-xs tracking-[0.4em] uppercase font-sans text-zinc-400 font-bold">
              Selection
            </h2>
            <h3 className="text-4xl md:text-5xl font-sans text-zinc-900 font-bold tracking-tight">Featured Works</h3>
          </div>
          <Link href="/shop" className="group flex items-center gap-3 text-zinc-900 transition-colors font-sans tracking-[0.2em] uppercase text-xs font-bold border-b-2 border-zinc-900 pb-1">
            See All Works <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
          {featuredArtworks.map((artwork) => (
            <ArtworkCard
              key={artwork.id}
              artwork={artwork}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </section>

      {/* About Section (Short) */}
      <section className="bg-zinc-50 py-24 md:py-40 border-y border-zinc-100">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative aspect-square lg:aspect-auto lg:h-[650px] rounded-3xl overflow-hidden shadow-2xl border border-white/20">
              <Image
                src={artistInfo.backgroundImage}
                alt="Artist studio"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-10">
              <div className="space-y-6">
                <h2 className="text-xs tracking-[0.4em] uppercase font-sans text-zinc-400 font-bold">
                  Philosophy
                </h2>
                <h3 className="text-4xl md:text-5xl font-sans text-zinc-900 leading-tight font-bold tracking-tight">
                  Where Color Meets <br />
                  Silent Meditation
                </h3>
              </div>
              <p className="text-xl text-zinc-600 font-sans leading-relaxed">
                {artistInfo.philosophy}
              </p>
              <p className="text-lg text-zinc-500 font-sans leading-relaxed">
                Based in her studio, {artistInfo.name} creates pieces that serve as meditative windows into alternate states of being. Every piece is a result of months of experimentation with pigments and light. 
              </p>
              <div className="pt-6">
                <Link href="/artist">
                  <Button variant="link" className="p-0 h-auto text-zinc-900 text-xl font-sans group font-bold">
                    Learn about my process <ArrowRight className="w-5 h-5 inline-block ml-3 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="container mx-auto px-6 md:px-12 text-center py-32">
        <div className="max-w-3xl mx-auto space-y-10">
          <h2 className="text-4xl md:text-6xl font-sans text-zinc-900 font-bold tracking-tighter">Interested in a Commission?</h2>
          <p className="text-zinc-500 font-sans text-xl leading-relaxed">
            I love creating bespoke pieces that fit perfectly in your space. <br className="hidden md:block" /> Let's start a conversation about your vision.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-10">
            <a href={`https://wa.me/${artistInfo.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="rounded-full bg-[#25D366] text-white hover:bg-[#128C7E] h-16 px-10 flex gap-3 w-full sm:w-auto font-sans font-bold shadow-subtle-lg">
                <MessageCircle className="w-6 h-6" /> WhatsApp Me
              </Button>
            </a>
            <a href={`https://www.instagram.com/${artistInfo.instagram}/`} target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="rounded-full border-zinc-200 h-16 px-10 flex gap-3 w-full sm:w-auto font-sans font-bold hover:bg-zinc-50 shadow-subtle">
                <Instagram className="w-6 h-6" /> Follow My Journey
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
