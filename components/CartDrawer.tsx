"use client";

import { useCart } from "@/context/CartContext";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ShoppingBag, Trash2, Minus, Plus, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
  const { items, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-6 bg-white border-none shadow-2xl rounded-l-3xl">
        <SheetHeader className="pb-6 border-b border-zinc-100">
          <div className="flex justify-between items-center">
            <SheetTitle className="font-serif text-2xl text-zinc-900">Your Collection</SheetTitle>
          </div>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 py-12">
            <div className="w-16 h-16 rounded-full bg-zinc-50 flex items-center justify-center">
              <ShoppingBag className="w-8 h-8 text-zinc-300" />
            </div>
            <p className="text-zinc-500 font-sans">Your cart is currently empty.</p>
            <Button
              variant="link"
              onClick={() => onOpenChange(false)}
              className="text-zinc-900 font-medium"
            >
              Continue Browsing
            </Button>
          </div>
        ) : (
          <ScrollArea className="flex-1 -mx-6 px-6 py-4">
            <div className="flex flex-col gap-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 group">
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-zinc-100 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <h4 className="font-serif text-lg text-zinc-900 line-clamp-1">{item.title}</h4>
                      <p className="text-sm text-zinc-500">{item.medium}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-zinc-100 rounded-full bg-zinc-50 px-2 py-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:text-zinc-900 text-zinc-400 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:text-zinc-900 text-zinc-400 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="font-medium text-zinc-900">
                        ${(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="opacity-0 group-hover:opacity-100 p-2 text-zinc-400 hover:text-destructive transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}

        {items.length > 0 && (
          <div className="pt-6 border-t border-zinc-100 flex flex-col gap-4">
            <div className="flex justify-between items-center px-2">
              <span className="text-zinc-500 font-sans">Subtotal</span>
              <span className="text-xl font-serif font-medium text-zinc-900">
                ${totalPrice.toLocaleString()}
              </span>
            </div>
            <p className="text-xs text-zinc-400 px-2 leading-relaxed">
              Shipping and taxes calculated at checkout. Every artwork is carefully packaged and insured.
            </p>
            <Link href="/checkout" onClick={() => onOpenChange(false)}>
              <Button className="w-full h-14 rounded-full bg-zinc-900 text-white hover:bg-zinc-800 transition-all text-lg font-serif">
                Proceed to Checkout
              </Button>
            </Link>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
