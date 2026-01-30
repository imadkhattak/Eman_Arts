"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { artworks, artistInfo } from "@/lib/data";
import { ArtworkCard } from "@/components/ArtworkCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Instagram, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";

export default function Home() {
  const { addToCart } = useCart();
  const featuredArtworks = artworks.filter((a) => a.featured);

  const handleAddToCart = (artwork: any) => {
    addToCart(artwork);
    toast.success(`${artwork.title} added to your collection`);
  };

  return (
    <div className="flex flex-col gap-24 md:gap-32 pb-24">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center px-6 md:px-12 overflow-hidden">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-xl space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-sm tracking-[0.3em] uppercase font-sans text-zinc-400 font-medium">
                Modern Fine Art
              </h2>
              <h1 className="text-5xl md:text-7xl font-serif text-zinc-900 leading-[1.1] tracking-tight">
                Capturing the <br />
                <span className="italic">Unseen Rhythm</span> <br />
                of Nature
              </h1>
            </div>
            <p className="text-lg text-zinc-500 font-sans leading-relaxed">
              Experience a collection of original oil and acrylic paintings that explore the intersection of light, memory, and raw emotion.
            </p>
            <div className="flex gap-4 pt-4">
              <Link href="/shop">
                <Button size="lg" className="rounded-full bg-zinc-900 text-white hover:bg-zinc-800 h-14 px-8 text-lg font-serif">
                  View Collection
                </Button>
              </Link>
              <Link href="/artist">
                <Button size="lg" variant="outline" className="rounded-full border-zinc-200 h-14 px-8 text-lg font-serif">
                  The Artist
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative aspect-[4/5] w-full max-w-lg mx-auto lg:ml-auto"
          >
            <div className="absolute -inset-4 bg-zinc-50 rounded-3xl -z-10 transform rotate-2" />
            <div className="relative h-full w-full overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src={artworks[0].image}
                alt="Featured Artwork"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute bottom-8 -left-8 bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl max-w-[200px] hidden md:block">
              <p className="text-xs font-sans text-zinc-400 uppercase tracking-widest mb-1">Featured Piece</p>
              <p className="font-serif text-lg text-zinc-900">{artworks[0].title}</p>
            </div>
          </motion.div>
        </div>
        
        {/* Background Decorative Element */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-zinc-50/50 -z-10" />
      </section>

      {/* Featured Artworks Section */}
      <section className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="space-y-4">
            <h2 className="text-sm tracking-[0.3em] uppercase font-sans text-zinc-400 font-medium">
              Selection
            </h2>
            <h3 className="text-4xl font-serif text-zinc-900">Featured Works</h3>
          </div>
          <Link href="/shop" className="group flex items-center gap-2 text-zinc-600 hover:text-zinc-900 transition-colors font-sans tracking-widest uppercase text-xs">
            See All Works <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
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
      <section className="bg-zinc-50 py-24 md:py-32">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-square lg:aspect-auto lg:h-[600px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop"
                alt="Artist in studio"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-sm tracking-[0.3em] uppercase font-sans text-zinc-400 font-medium">
                  Philosophy
                </h2>
                <h3 className="text-4xl md:text-5xl font-serif text-zinc-900 leading-tight">
                  Where Color Meets <br />
                  <span className="italic">Silent Meditation</span>
                </h3>
              </div>
              <p className="text-lg text-zinc-600 font-sans leading-relaxed">
                {artistInfo.philosophy}
              </p>
              <p className="text-zinc-500 font-sans leading-relaxed">
                Every piece in this collection is a results of months of experimentation with pigments and light. I invite you to find a piece that resonates with your own inner landscape.
              </p>
              <div className="pt-4">
                <Link href="/artist">
                  <Button variant="link" className="p-0 h-auto text-zinc-900 text-lg font-serif italic group">
                    Learn about my process <ArrowRight className="w-4 h-4 inline-block ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="container mx-auto px-6 md:px-12 text-center py-24">
        <div className="max-w-2xl mx-auto space-y-8">
          <h2 className="text-4xl font-serif text-zinc-900">Interested in a <span className="italic">Commission</span>?</h2>
          <p className="text-zinc-500 font-sans text-lg">
            I love creating bespoke pieces that fit perfectly in your space. Let's start a conversation about your vision.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button size="lg" className="rounded-full bg-[#25D366] text-white hover:bg-[#128C7E] h-14 px-8 flex gap-2">
              <MessageCircle className="w-5 h-5" /> WhatsApp Me
            </Button>
            <Button size="lg" variant="outline" className="rounded-full border-zinc-200 h-14 px-8 flex gap-2">
              <Instagram className="w-5 h-5" /> Follow My Journey
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
