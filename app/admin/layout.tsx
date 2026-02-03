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
  User,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";



export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

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
    <div className="flex min-h-screen bg-zinc-50 relative">
      {/* Mobile Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-zinc-900 border-b border-white/5 flex items-center justify-between px-4 z-40 lg:hidden">
        <h1 className="text-xl font-serif tracking-tighter text-white">EMAN <span className="text-zinc-500 text-[10px] uppercase tracking-widest font-sans inline-block ml-2">Admin</span></h1>
        <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(true)} className="text-white hover:bg-white/10">
          <Menu className="w-6 h-6" />
        </Button>
      </header>

      {/* Sidebar Overlay (Mobile) */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "w-64 bg-zinc-900 text-white flex flex-col fixed inset-y-0 left-0 z-[60] transition-transform duration-300 transform lg:translate-x-0 lg:static lg:inset-auto",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-8 flex items-center justify-between">
          <h1 className="text-2xl font-serif tracking-tighter">EMAN <span className="text-zinc-500 text-xs uppercase tracking-widest block font-sans">Admin Portal</span></h1>
          <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-zinc-400 hover:text-white">
            <X className="w-6 h-6" />
          </Button>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} onClick={() => setIsSidebarOpen(false)}>
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
      <main className="flex-1 lg:ml-0 p-4 md:p-8 pt-20 lg:pt-8 min-w-0">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
