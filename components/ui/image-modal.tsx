"use client";

import React from "react";
import Image from "next/image";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import { Button } from "./button";

interface ImageModalProps {
  src: string;
  alt: string;
  title: string;
  children: React.ReactNode;
}

export function ImageModal({ src, alt, title, children }: ImageModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 border-none bg-black/90 backdrop-blur-xl overflow-hidden rounded-2xl flex flex-col items-center justify-center">
        <DialogTitle className="sr-only">{title}</DialogTitle>
        <div className="relative w-full h-full flex items-center justify-center p-4 md:p-12">
          <div className="relative aspect-auto max-w-full max-h-full overflow-hidden rounded-lg shadow-2xl">
            <img 
              src={src} 
              alt={alt} 
              className="max-w-full max-h-[85vh] object-contain"
            />
          </div>
          <div className="absolute bottom-4 left-0 right-0 text-center text-white/70 font-sans text-sm tracking-widest uppercase">
            {title}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
