"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [shippingFee, setShippingFee] = useState(0);
  const [artistZip, setArtistZip] = useState("");

  React.useEffect(() => {
    fetch("/api/store")
      .then(res => res.json())
      .then(data => {
        if (data.artistInfo?.zipCode) {
          setArtistZip(data.artistInfo.zipCode);
        }
      });
  }, []);

  const calculateShipping = (userZip: string) => {
    if (!userZip || !artistZip) return 15; // Base fee if zip unknown
    const userPrefix = parseInt(userZip.substring(0, 3));
    const artistPrefix = parseInt(artistZip.substring(0, 3));
    if (isNaN(userPrefix) || isNaN(artistPrefix)) return 15;
    
    const diff = Math.abs(userPrefix - artistPrefix);
    return 15 + (diff * 0.5); // $15 base + $0.5 per "zip unit"
  };

  const handleZipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fee = calculateShipping(e.target.value);
    setShippingFee(fee);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const orderData = {
      customerName: `${formData.get("firstName")} ${formData.get("lastName")}`,
      customerEmail: formData.get("email"),
      customerPhone: formData.get("phone"),
      items: items.map(item => ({
        id: item.id,
        title: item.title,
        price: item.price,
        quantity: item.quantity
      })),
      total: totalPrice + shippingFee,
      shippingFee: shippingFee,
      address: formData.get("address"),
      city: formData.get("city"),
      zip: formData.get("zip")
    };

    try {
      // Fetch current data
      const res = await fetch("/api/store");
      const store = await res.json();

      // Create new order
      const newOrder = {
        id: Date.now().toString(),
        ...orderData,
        status: 'pending' as const,
        createdAt: new Date().toISOString(),
      };

      // Update/Add customer
      let updatedCustomers = [...store.customers];
      const customerIdx = updatedCustomers.findIndex(c => c.email === orderData.customerEmail);
      
      if (customerIdx >= 0) {
        updatedCustomers[customerIdx].orderHistory.push(newOrder.id);
      } else {
        updatedCustomers.push({
          id: Date.now().toString(),
          name: orderData.customerName,
          email: orderData.customerEmail,
          phone: orderData.customerPhone as string,
          address: orderData.address as string,
          city: orderData.city as string,
          zip: orderData.zip as string,
          orderHistory: [newOrder.id]
        });
      }

      // Update store
      const updatedData = {
        ...store,
        orders: [newOrder, ...store.orders],
        customers: updatedCustomers
      };

      const saveRes = await fetch("/api/store", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (saveRes.ok) {
        setIsSubmitted(true);
        clearCart();
      } else {
        throw new Error("Failed to save order");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("There was an error processing your order. Please try again.");
    }
  };

  if (isSubmitted) {
    return (
      <div className="container mx-auto px-6 md:px-12 py-24 min-h-[70vh] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-8 max-w-md"
        >
          <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-sans text-zinc-900">Thank You</h1>
            <p className="text-zinc-500 font-sans text-lg">
              Your order has been received. We'll send you a confirmation email with tracking details shortly.
            </p>
          </div>
          <Link href="/shop">
            <Button className="rounded-full bg-zinc-900 text-white hover:bg-zinc-800 h-14 px-8 mt-4">
              Return to Gallery
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-6 md:px-12 py-24 text-center space-y-6">
        <h1 className="text-4xl font-sans text-zinc-900">Your cart is empty</h1>
        <p className="text-zinc-500 font-sans">Add some beautiful art to your collection first.</p>
        <Link href="/shop">
          <Button className="rounded-full bg-zinc-900 text-white hover:bg-zinc-800">
            Browse Gallery
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 md:px-12 py-12 md:py-24">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24">
        {/* Checkout Form */}
        <div className="flex-1 space-y-12">
          <div className="space-y-4">
            <Link href="/shop" className="text-zinc-400 hover:text-zinc-900 transition-colors flex items-center gap-2 text-sm font-sans tracking-widest uppercase">
              <ArrowLeft className="w-4 h-4" /> Back to Gallery
            </Link>
            <h1 className="text-4xl md:text-5xl font-sans text-zinc-900">Checkout</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            <section className="space-y-6">
              <h3 className="text-sm tracking-[0.2em] font-sans uppercase font-bold text-zinc-900">Customer Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-xs uppercase tracking-widest font-bold text-zinc-400">First Name</Label>
                  <Input id="firstName" name="firstName" placeholder="Jane" required className="h-12 border-zinc-100 rounded-xl focus-visible:ring-zinc-900 font-sans" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-xs uppercase tracking-widest font-bold text-zinc-400">Last Name</Label>
                  <Input id="lastName" name="lastName" placeholder="Doe" required className="h-12 border-zinc-100 rounded-xl focus-visible:ring-zinc-900 font-sans" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="email" className="text-xs uppercase tracking-widest font-bold text-zinc-400">Email Address</Label>
                  <Input id="email" name="email" type="email" placeholder="jane@example.com" required className="h-12 border-zinc-100 rounded-xl focus-visible:ring-zinc-900 font-sans" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="phone" className="text-xs uppercase tracking-widest font-bold text-zinc-400">Phone Number</Label>
                  <Input id="phone" name="phone" type="tel" placeholder="+1 (555) 000-0000" required className="h-12 border-zinc-100 rounded-xl focus-visible:ring-zinc-900 font-sans" />
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <h3 className="text-sm tracking-[0.2em] font-sans uppercase font-bold text-zinc-900">Shipping Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="address" className="text-xs uppercase tracking-widest font-bold text-zinc-400">Street Address</Label>
                  <Input id="address" name="address" placeholder="123 Art Lane" required className="h-12 border-zinc-100 rounded-xl focus-visible:ring-zinc-900 font-sans" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-xs uppercase tracking-widest font-bold text-zinc-400">City</Label>
                  <Input id="city" name="city" placeholder="San Francisco" required className="h-12 border-zinc-100 rounded-xl focus-visible:ring-zinc-900 font-sans" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip" className="text-xs uppercase tracking-widest font-bold text-zinc-400">Postal Code</Label>
                  <Input id="zip" name="zip" placeholder="94110" required onChange={handleZipChange} className="h-12 border-zinc-100 rounded-xl focus-visible:ring-zinc-900 font-sans" />
                </div>
              </div>
            </section>

            <Button type="submit" className="w-full h-16 rounded-full bg-zinc-900 text-white hover:bg-zinc-800 text-xl font-sans">
              Complete Purchase • ${(totalPrice + shippingFee).toLocaleString()}
            </Button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-[400px]">
          <div className="bg-zinc-50 rounded-3xl p-8 sticky top-32 space-y-8">
            <h3 className="font-sans text-2xl text-zinc-900">Order Summary</h3>
            
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <Image src={item.image} alt={item.title} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-sans text-sm font-medium text-zinc-900 line-clamp-1">{item.title}</h4>
                    <p className="text-xs text-zinc-400 font-sans">{item.quantity} × ${item.price.toLocaleString()}</p>
                  </div>
                  <span className="text-sm font-medium text-zinc-900">
                    ${(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <Separator className="bg-zinc-200" />

            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm font-sans uppercase tracking-widest text-zinc-500">
                <span>Subtotal</span>
                <span>${totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-sm font-sans uppercase tracking-widest text-zinc-500">
                <span>Shipping</span>
                <span className="text-zinc-900 font-bold">
                  {shippingFee > 0 ? `$${shippingFee.toFixed(2)}` : "Calculating..."}
                </span>
              </div>
              <Separator className="bg-zinc-200" />
              <div className="flex justify-between items-center text-xl font-sans font-medium text-zinc-900">
                <span>Total</span>
                <span>${(totalPrice + shippingFee).toLocaleString()}</span>
              </div>
            </div>

            <div className="bg-zinc-100/50 p-4 rounded-2xl flex items-center gap-3 text-xs text-zinc-400 leading-relaxed">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-4 h-4 text-zinc-400" />
              </div>
              Your artwork is insured and packaged with archival-quality materials to ensure it arrives in perfect condition.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
