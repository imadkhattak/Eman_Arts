"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Plus, Edit2, Trash2, Search, Image as ImageIcon } from "lucide-react";
import { StoreData, Artwork } from "@/lib/db";
import { toast } from "sonner";

export default function ArtworksManagement() {
  const [data, setData] = useState<StoreData | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [artworkToDelete, setArtworkToDelete] = useState<string | null>(null);
  const [editingArtwork, setEditingArtwork] = useState<Artwork | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await fetch("/api/store");
    const json = await res.json();
    setData(json);
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!data) return;

    const formData = new FormData(e.currentTarget);
    const file = formData.get("imageFile") as File;
    let imageUrl = editingArtwork?.image || "";

    if (file && file.size > 0) {
      const uploadFormData = new FormData();
      uploadFormData.append("file", file);
      
      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: uploadFormData,
      });
      
      if (uploadRes.ok) {
        const uploadData = await uploadRes.json();
        imageUrl = uploadData.imageUrl;
      } else {
        toast.error("Failed to upload image");
        return;
      }
    } else if (!imageUrl) {
      toast.error("Please provide an image");
      return;
    }

    const artworkData: any = {
      id: editingArtwork?.id || Date.now().toString(),
      title: formData.get("title"),
      price: Number(formData.get("price")),
      dimensions: formData.get("dimensions"),
      medium: formData.get("medium"),
      year: formData.get("year"),
      image: imageUrl,
      category: formData.get("category"),
      description: formData.get("description"),
      available: formData.get("available") === "on",
      featured: formData.get("featured") === "on",
    };

    let updatedArtworks;
    if (editingArtwork) {
      updatedArtworks = data.artworks.map(a => a.id === editingArtwork.id ? artworkData : a);
    } else {
      updatedArtworks = [...data.artworks, artworkData];
    }

    const updatedData = { ...data, artworks: updatedArtworks };
    
    const res = await fetch("/api/store", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });

    if (res.ok) {
      toast.success(editingArtwork ? "Artwork updated" : "Artwork added");
      setData(updatedData);
      setIsDialogOpen(false);
      setEditingArtwork(null);
    } else {
      toast.error("Failed to save artwork");
    }
  };

  const confirmDelete = async () => {
    if (!data || !artworkToDelete) return;

    const updatedData = { ...data, artworks: data.artworks.filter(a => a.id !== artworkToDelete) };
    
    const res = await fetch("/api/store", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });

    if (res.ok) {
      toast.success("Artwork deleted");
      setData(updatedData);
      setIsDeleteModalOpen(false);
      setArtworkToDelete(null);
    }
  };

  const handleDeleteClick = (id: string) => {
    setArtworkToDelete(id);
    setIsDeleteModalOpen(true);
  };

  if (!data) return <div className="p-8">Loading artworks...</div>;

  const filteredArtworks = data.artworks.filter(a => 
    a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.medium.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-sans font-bold text-zinc-900">Artwork Management</h1>
          <p className="text-zinc-500 font-sans">Add, edit, or remove pieces from your public gallery.</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) setEditingArtwork(null);
        }}>
          <DialogTrigger asChild>
            <Button className="rounded-full bg-zinc-900 text-white hover:bg-zinc-800 h-12 px-6 flex gap-2">
              <Plus className="w-4 h-4" /> Add New Artwork
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl">
            <DialogHeader>
              <DialogTitle className="font-sans font-bold text-2xl">{editingArtwork ? "Edit Artwork" : "Add New Artwork"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSave} className="space-y-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-xs uppercase tracking-widest font-bold text-zinc-400">Title</Label>
                  <Input id="title" name="title" defaultValue={editingArtwork?.title} required className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price" className="text-xs uppercase tracking-widest font-bold text-zinc-400">Price ($)</Label>
                  <Input id="price" name="price" type="number" defaultValue={editingArtwork?.price} required className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-xs uppercase tracking-widest font-bold text-zinc-400">Category</Label>
                  <select id="category" name="category" defaultValue={editingArtwork?.category || "oil"} className="w-full h-10 px-3 rounded-xl border border-zinc-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-all cursor-pointer">
                    <option value="oil">Oil</option>
                    <option value="acrylic">Acrylic</option>
                    <option value="mixed-media">Mixed Media</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year" className="text-xs uppercase tracking-widest font-bold text-zinc-400">Year</Label>
                  <Input id="year" name="year" defaultValue={editingArtwork?.year} required className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dimensions" className="text-xs uppercase tracking-widest font-bold text-zinc-400">Dimensions</Label>
                  <Input id="dimensions" name="dimensions" defaultValue={editingArtwork?.dimensions} required className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="medium" className="text-xs uppercase tracking-widest font-bold text-zinc-400">Medium</Label>
                  <Input id="medium" name="medium" defaultValue={editingArtwork?.medium} required className="rounded-xl" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="imageFile" className="text-xs uppercase tracking-widest font-bold text-zinc-400">Image File</Label>
                <Input id="imageFile" name="imageFile" type="file" accept="image/*" className="rounded-xl" />
                {editingArtwork?.image && (
                  <p className="text-xs text-zinc-500 mt-1">Current: {editingArtwork.image}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="description" className="text-xs uppercase tracking-widest font-bold text-zinc-400">Description</Label>
                <Textarea id="description" name="description" defaultValue={editingArtwork?.description} required className="rounded-xl min-h-[100px]" />
              </div>
              <div className="flex gap-8">
                <div className="flex items-center gap-3">
                  <Switch id="available" name="available" defaultChecked={editingArtwork ? editingArtwork.available : true} />
                  <Label htmlFor="available" className="text-sm font-sans font-medium">Available for Sale</Label>
                </div>
                <div className="flex items-center gap-3">
                  <Switch id="featured" name="featured" defaultChecked={editingArtwork?.featured} />
                  <Label htmlFor="featured" className="text-sm font-sans font-medium">Featured on Home</Label>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" className="w-full h-12 rounded-full bg-zinc-900 text-white hover:bg-zinc-800">
                  {editingArtwork ? "Update Artwork" : "Create Artwork"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
        <Input 
          placeholder="Search by title or medium..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-12 h-12 bg-white border-none shadow-sm rounded-2xl focus-visible:ring-zinc-900"
        />
      </div>

      <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-zinc-50">
            <TableRow className="hover:bg-transparent border-zinc-100">
              <TableHead className="w-[100px] font-sans text-xs uppercase tracking-widest font-bold">Image</TableHead>
              <TableHead className="font-sans text-xs uppercase tracking-widest font-bold">Title</TableHead>
              <TableHead className="font-sans text-xs uppercase tracking-widest font-bold">Price</TableHead>
              <TableHead className="font-sans text-xs uppercase tracking-widest font-bold">Category</TableHead>
              <TableHead className="font-sans text-xs uppercase tracking-widest font-bold">Status</TableHead>
              <TableHead className="text-right font-sans text-xs uppercase tracking-widest font-bold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredArtworks.map((artwork) => (
              <TableRow key={artwork.id} className="hover:bg-zinc-50/50 border-zinc-50 transition-colors">
                <TableCell>
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-zinc-100">
                    {artwork.image ? (
                      <img src={artwork.image} alt={artwork.title} className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon className="w-full h-full p-2 text-zinc-300" />
                    )}
                  </div>
                </TableCell>
                <TableCell className="font-sans font-bold text-zinc-900">{artwork.title}</TableCell>
                <TableCell className="font-sans font-bold">${artwork.price.toLocaleString()}</TableCell>
                <TableCell className="font-sans capitalize">{artwork.category}</TableCell>
                <TableCell>
                  <span className={`text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded-full ${
                    artwork.available ? "bg-green-100 text-green-700" : "bg-zinc-100 text-zinc-500"
                  }`}>
                    {artwork.available ? "Available" : "Sold"}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="rounded-xl hover:bg-zinc-100"
                      onClick={() => {
                        setEditingArtwork(artwork);
                        setIsDialogOpen(true);
                      }}
                    >
                      <Edit2 className="w-4 h-4 text-zinc-500" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="rounded-xl hover:bg-red-50 hover:text-red-500"
                      onClick={() => handleDeleteClick(artwork.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="max-w-md rounded-[2rem] p-8">
          <DialogHeader>
            <DialogTitle className="text-2xl font-sans font-bold text-center">Delete Artwork?</DialogTitle>
          </DialogHeader>
          <div className="py-6 text-center text-zinc-500 font-sans">
            This action cannot be undone. This piece will be permanently removed from your public gallery.
          </div>
          <DialogFooter className="flex flex-col sm:flex-row gap-3">
            <Button 
              variant="outline" 
              onClick={() => setIsDeleteModalOpen(false)}
              className="flex-1 h-12 rounded-full font-sans font-bold"
            >
              Cancel
            </Button>
            <Button 
              onClick={confirmDelete}
              className="flex-1 h-12 rounded-full bg-red-600 text-white hover:bg-red-700 font-sans font-bold"
            >
              Confirm Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
