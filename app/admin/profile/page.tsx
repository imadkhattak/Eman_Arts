"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StoreData, ArtistInfo } from "@/lib/db";
import { toast } from "sonner";
import { ImageIcon, Save } from "lucide-react";

export default function ArtistProfileManagement() {
  const [data, setData] = useState<StoreData | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await fetch("/api/store");
    const json = await res.json();
    setData(json);
  };

  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    
    if (res.ok) {
      const uploadData = await res.json();
      return uploadData.imageUrl;
    }
    toast.error("Failed to upload image");
    return null;
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!data) return;

    setIsSaving(true);
    const formData = new FormData(e.currentTarget);
    
    let profileImageUrl = data.artistInfo.profileImage;
    let backgroundImageUrl = data.artistInfo.backgroundImage;

    const profileFile = (e.currentTarget.elements.namedItem("profileImageFile") as HTMLInputElement).files?.[0];
    const backgroundFile = (e.currentTarget.elements.namedItem("backgroundImageFile") as HTMLInputElement).files?.[0];

    if (profileFile) {
      const url = await handleUpload(profileFile);
      if (url) profileImageUrl = url;
    }

    if (backgroundFile) {
      const url = await handleUpload(backgroundFile);
      if (url) backgroundImageUrl = url;
    }

    const updatedArtistInfo: ArtistInfo = {
      name: formData.get("name") as string,
      bio: formData.get("bio") as string,
      education: formData.get("education") as string,
      philosophy: formData.get("philosophy") as string,
      instagram: formData.get("instagram") as string,
      whatsapp: formData.get("whatsapp") as string,
      profileImage: profileImageUrl,
      backgroundImage: backgroundImageUrl,
    };

    const updatedData = { ...data, artistInfo: updatedArtistInfo };
    
    const res = await fetch("/api/store", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });

    if (res.ok) {
      toast.success("Artist profile updated");
      setData(updatedData);
    } else {
      toast.error("Failed to save changes");
    }
    setIsSaving(false);
  };

  if (!data) return <div className="p-8">Loading profile...</div>;

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-sans font-bold text-zinc-900">Artist Profile</h1>
        <p className="text-zinc-500 font-sans">Manage your public bio, profile pictures, and contact information.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-none shadow-subtle rounded-3xl overflow-hidden">
            <CardHeader>
              <CardTitle className="text-sm uppercase tracking-widest font-bold text-zinc-400">Public Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Artist Name</Label>
                <Input id="name" name="name" defaultValue={data.artistInfo.name} required className="rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="instagram">Instagram Username</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">@</span>
                  <Input id="instagram" name="instagram" defaultValue={data.artistInfo.instagram} className="pl-8 rounded-xl" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="whatsapp">WhatsApp Number</Label>
                <Input id="whatsapp" name="whatsapp" defaultValue={data.artistInfo.whatsapp} className="rounded-xl" placeholder="+1234567890" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-subtle rounded-3xl overflow-hidden">
            <CardHeader>
              <CardTitle className="text-sm uppercase tracking-widest font-bold text-zinc-400">Visuals</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>Profile Picture</Label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-zinc-100 flex-shrink-0">
                    <img src={data.artistInfo.profileImage} alt="Profile" className="w-full h-full object-cover" />
                  </div>
                  <Input name="profileImageFile" type="file" accept="image/*" className="rounded-xl text-xs" />
                </div>
              </div>
              <div className="space-y-4">
                <Label>Background Cover</Label>
                <div className="aspect-[3/1] rounded-xl overflow-hidden bg-zinc-100 mb-2">
                  <img src={data.artistInfo.backgroundImage} alt="Background" className="w-full h-full object-cover" />
                </div>
                <Input name="backgroundImageFile" type="file" accept="image/*" className="rounded-xl text-xs" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-none shadow-subtle rounded-3xl overflow-hidden">
          <CardHeader>
            <CardTitle className="text-sm uppercase tracking-widest font-bold text-zinc-400">Bio & Philosophy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="bio">Biography</Label>
              <Textarea id="bio" name="bio" defaultValue={data.artistInfo.bio} className="rounded-xl min-h-[120px]" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="education">Education</Label>
              <Input id="education" name="education" defaultValue={data.artistInfo.education} className="rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="philosophy">Philosophy</Label>
              <Textarea id="philosophy" name="philosophy" defaultValue={data.artistInfo.philosophy} className="rounded-xl min-h-[100px]" />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={isSaving} className="h-14 px-10 rounded-full bg-zinc-900 text-white hover:bg-zinc-800 gap-2 text-lg font-sans">
            <Save className="w-5 h-5" />
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}
