"use client";

import Image from "next/image";
import { Artwork } from "@/lib/data";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";

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
      <Card className="group overflow-hidden border-none shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl bg-white">
        <CardContent className="p-0 relative aspect-[4/5] overflow-hidden">
          <Image
            src={artwork.image}
            alt={artwork.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {!artwork.available && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[2px]">
              <Badge variant="secondary" className="bg-white/90 text-zinc-900 border-none px-4 py-1 text-sm font-medium">
                Sold
              </Badge>
            </div>
          )}
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </CardContent>
        <CardFooter className="flex flex-col items-start p-5 gap-2">
          <div className="flex justify-between w-full items-start">
            <div>
              <h3 className="font-serif text-xl font-medium tracking-tight text-zinc-900">
                {artwork.title}
              </h3>
              <p className="text-sm text-zinc-500 font-sans">
                {artwork.medium} • {artwork.dimensions}
              </p>
            </div>
          </div>
          <div className="flex justify-between w-full items-center mt-2">
            <span className="text-lg font-medium text-zinc-900">
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
