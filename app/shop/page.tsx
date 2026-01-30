"use client";

import React, { useState, useMemo } from "react";
import { artworks } from "@/lib/data";
import { ArtworkCard } from "@/components/ArtworkCard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { SlidersHorizontal } from "lucide-react";

export default function ShopPage() {
  const [filter, setFilter] = useState("all");
  const { addToCart } = useCart();

  const filteredArtworks = useMemo(() => {
    if (filter === "all") return artworks;
    return artworks.filter((a) => a.category === filter);
  }, [filter]);

  const handleAddToCart = (artwork: any) => {
    addToCart(artwork);
    toast.success(`${artwork.title} added to your collection`);
  };

  return (
    <div className="container mx-auto px-6 md:px-12 py-12 md:py-24">
      <div className="flex flex-col gap-12">
        {/* Header */}
        <div className="space-y-4 max-w-2xl">
          <h2 className="text-sm tracking-[0.3em] uppercase font-sans text-zinc-400 font-medium">
            Art Gallery
          </h2>
          <h1 className="text-5xl font-serif text-zinc-900 leading-tight">
            Original <span className="italic">Collection</span>
          </h1>
          <p className="text-lg text-zinc-500 font-sans leading-relaxed">
            Browse our curated selection of original oil and acrylic paintings. Each piece is unique and comes with a certificate of authenticity.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-zinc-100 pb-8">
          <Tabs defaultValue="all" onValueChange={setFilter} className="w-full md:w-auto">
            <TabsList className="bg-transparent h-auto p-0 gap-8 flex-wrap justify-start">
              <TabsTrigger 
                value="all" 
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-zinc-900 text-zinc-400 p-0 text-sm tracking-widest uppercase font-sans border-b-2 border-transparent data-[state=active]:border-zinc-900 rounded-none h-10 transition-all"
              >
                All Works
              </TabsTrigger>
              <TabsTrigger 
                value="oil" 
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-zinc-900 text-zinc-400 p-0 text-sm tracking-widest uppercase font-sans border-b-2 border-transparent data-[state=active]:border-zinc-900 rounded-none h-10 transition-all"
              >
                Oil
              </TabsTrigger>
              <TabsTrigger 
                value="acrylic" 
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-zinc-900 text-zinc-400 p-0 text-sm tracking-widest uppercase font-sans border-b-2 border-transparent data-[state=active]:border-zinc-900 rounded-none h-10 transition-all"
              >
                Acrylic
              </TabsTrigger>
              <TabsTrigger 
                value="mixed-media" 
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-zinc-900 text-zinc-400 p-0 text-sm tracking-widest uppercase font-sans border-b-2 border-transparent data-[state=active]:border-zinc-900 rounded-none h-10 transition-all"
              >
                Mixed Media
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-4 text-zinc-500 text-sm font-sans">
            <SlidersHorizontal className="w-4 h-4" />
            <span>Showing {filteredArtworks.length} pieces</span>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 min-h-[400px]">
          <AnimatePresence mode="popLayout">
            {filteredArtworks.map((artwork) => (
              <motion.div
                key={artwork.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <ArtworkCard
                  artwork={artwork}
                  onAddToCart={handleAddToCart}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredArtworks.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-24 text-center gap-4"
          >
            <p className="text-zinc-400 font-sans italic text-lg">No pieces found in this category.</p>
            <button 
              onClick={() => setFilter("all")}
              className="text-zinc-900 font-medium underline underline-offset-4"
            >
              Clear filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
