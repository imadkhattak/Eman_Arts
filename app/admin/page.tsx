"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Palette, 
  ShoppingBag, 
  Users, 
  TrendingUp,
  Clock,
  CheckCircle2
} from "lucide-react";
import { StoreData } from "@/lib/db";

export default function AdminDashboard() {
  const [data, setData] = useState<StoreData | null>(null);

  useEffect(() => {
    fetch("/api/store")
      .then(res => res.json())
      .then(setData);
  }, []);

  if (!data) return <div className="p-8">Loading dashboard...</div>;

  const stats = [
    { label: "Total Artworks", value: data.artworks.length, icon: Palette, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Total Orders", value: data.orders.length, icon: ShoppingBag, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Total Customers", value: data.customers.length, icon: Users, color: "text-green-600", bg: "bg-green-50" },
    { label: "Revenue", value: `$${data.orders.reduce((sum, o) => sum + o.total, 0).toLocaleString()}`, icon: TrendingUp, color: "text-orange-600", bg: "bg-orange-50" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-sans font-bold text-zinc-900">Dashboard Overview</h1>
        <p className="text-zinc-500 font-sans">Welcome back, Alina. Here's what's happening with your gallery.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-none shadow-sm rounded-2xl overflow-hidden">
            <CardContent className="p-6 flex items-center gap-4">
              <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-zinc-400 font-sans uppercase tracking-widest font-bold">{stat.label}</p>
                <p className="text-2xl font-sans font-bold text-zinc-900">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <Card className="border-none shadow-sm rounded-2xl">
          <CardHeader>
            <CardTitle className="font-sans font-bold text-xl flex items-center gap-2">
              <Clock className="w-5 h-5 text-zinc-400" /> Recent Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            {data.orders.length === 0 ? (
              <p className="text-zinc-400 font-sans text-sm">No orders yet.</p>
            ) : (
              <div className="space-y-4">
                {data.orders.slice(0, 5).map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 bg-zinc-50 rounded-xl">
                    <div>
                      <p className="font-sans font-bold text-sm text-zinc-900">{order.customerName}</p>
                      <p className="text-xs text-zinc-400 font-sans">{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-sans font-medium text-zinc-900">${order.total.toLocaleString()}</p>
                      <span className={`text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded-full ${
                        order.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions / Featured Artworks */}
        <Card className="border-none shadow-sm rounded-2xl">
          <CardHeader>
            <CardTitle className="font-sans font-bold text-xl flex items-center gap-2">
              <Palette className="w-5 h-5 text-zinc-400" /> Featured Artworks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.artworks.filter(a => a.featured).slice(0, 5).map((artwork) => (
                <div key={artwork.id} className="flex items-center gap-4 p-4 bg-zinc-50 rounded-xl">
                  <div className="w-12 h-12 relative rounded-lg overflow-hidden flex-shrink-0">
                    <img src={artwork.image} alt={artwork.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="font-sans font-bold text-sm text-zinc-900">{artwork.title}</p>
                    <p className="text-xs text-zinc-400 font-sans">${artwork.price.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <CheckCircle2 className={`w-5 h-5 ${artwork.available ? 'text-green-500' : 'text-zinc-300'}`} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
