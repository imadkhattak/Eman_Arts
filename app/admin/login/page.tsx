"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Lock } from "lucide-react";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        toast.success("Login successful");
        router.push("/admin");
      } else {
        toast.error("Invalid credentials");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-none shadow-xl rounded-3xl overflow-hidden">
          <CardHeader className="bg-zinc-900 text-white p-8 space-y-2">
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="text-3xl font-serif">Admin Portal</CardTitle>
            <CardDescription className="text-zinc-400 font-sans">
              Enter your credentials to manage your gallery.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-xs uppercase tracking-widest font-bold text-zinc-400">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="h-12 border-zinc-100 rounded-xl focus-visible:ring-zinc-900"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-xs uppercase tracking-widest font-bold text-zinc-400">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 border-zinc-100 rounded-xl focus-visible:ring-zinc-900"
                  required
                />
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-14 rounded-full bg-zinc-900 text-white hover:bg-zinc-800 text-lg font-serif transition-all"
              >
                {isLoading ? "Signing in..." : "Login to Dashboard"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
