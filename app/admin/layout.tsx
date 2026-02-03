"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  Palette, 
  ShoppingBag, 
  Users, 
  Settings, 
  LogOut,
  ExternalLink,
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";



export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/admin/login") return <>{children}</>;

  const handleLogout = async () => {
    const res = await fetch("/api/auth/logout", { method: "POST" });
    if (res.ok) {
      router.push("/admin/login");
    }
  };

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Artworks", href: "/admin/artworks", icon: Palette },
    { label: "Orders", href: "/admin/orders", icon: ShoppingBag },
    { label: "Customers", href: "/admin/customers", icon: Users },
    { label: "Profile", href: "/admin/profile", icon: User },
  ];

  return (
    <div className="flex min-h-screen bg-zinc-50">
      {/* Sidebar */}
      <aside className="w-64 bg-zinc-900 text-white flex flex-col fixed inset-y-0 left-0 z-50">
        <div className="p-8">
          <h1 className="text-2xl font-serif tracking-tighter">ALINA <span className="text-zinc-500 text-xs uppercase tracking-widest block font-sans">Admin Portal</span></h1>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <div className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive 
                    ? "bg-white text-zinc-900" 
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                }`}>
                  <Icon className="w-5 h-5" />
                  <span className="font-sans text-sm font-medium">{item.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5 space-y-2">
          <Link href="/" target="_blank">
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-all">
              <ExternalLink className="w-5 h-5" />
              <span className="font-sans text-sm font-medium">View Website</span>
            </div>
          </Link>
          <Button 
            variant="ghost" 
            className="w-full justify-start text-zinc-400 hover:text-red-400 hover:bg-red-400/10 gap-3 px-4 py-3 h-auto rounded-xl"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5" />
            <span className="font-sans text-sm font-medium">Logout</span>
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
