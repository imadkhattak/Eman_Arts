"use client";

import Image from "next/image";
import { Artwork } from "@/lib/db";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { ShoppingCart, Maximize2 } from "lucide-react";
import { ImageModal } from "./ui/image-modal";

interface ArtworkCardProps {
  artwork: Artwork;
  onAddToCart?: (artwork: Artwork) => void;
}

export function ArtworkCard({ artwork, onAddToCart }: ArtworkCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Card className="group overflow-hidden border border-zinc-100 shadow-subtle hover:shadow-subtle-lg transition-all duration-500 rounded-3xl bg-white">
        <CardContent className="p-0 relative aspect-[4/5] overflow-hidden group/image">
          <ImageModal src={artwork.image} alt={artwork.title} title={artwork.title}>
            <div className="relative w-full h-full cursor-zoom-in">
              <Image
                src={artwork.image}
                alt={artwork.title}
                fill
                className="object-cover transition-transform duration-700 group-hover/image:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/20 transition-all duration-300 flex items-center justify-center">
                <Maximize2 className="w-8 h-8 text-white opacity-0 group-hover/image:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          </ImageModal>
          {!artwork.available && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[2px] pointer-events-none">
              <Badge variant="secondary" className="bg-white/90 text-zinc-900 border-none px-4 py-1 text-sm font-bold uppercase tracking-widest font-sans">
                Sold
              </Badge>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col items-start p-5 gap-2">
          <div className="flex justify-between w-full items-start">
            <div>
              <h3 className="font-sans text-lg md:text-xl font-bold tracking-tight text-zinc-900">
                {artwork.title}
              </h3>
              <p className="text-sm text-zinc-500 font-sans">
                {artwork.medium} • {artwork.dimensions}
              </p>
            </div>
          </div>
          <div className="flex justify-between w-full items-center mt-2">
            <span className="text-base md:text-lg font-bold text-zinc-900 font-sans">
              ${artwork.price.toLocaleString()}
            </span>
            {artwork.available && (
              <Button
                size="sm"
                variant="outline"
                className="rounded-full border-zinc-200 hover:bg-zinc-900 hover:text-white transition-colors duration-300 flex gap-2"
                onClick={() => onAddToCart?.(artwork)}
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
