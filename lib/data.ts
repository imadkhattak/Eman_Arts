export type Artwork = {
  id: string;
  title: string;
  price: number;
  dimensions: string;
  medium: string;
  year: string;
  image: string;
  category: "oil" | "acrylic" | "mixed-media";
  available: boolean;
  featured: boolean;
  description: string;
};

export const artworks: Artwork[] = [
  {
    id: "1",
    title: "Ethereal Whispers",
    price: 1200,
    dimensions: "24 x 36 inches",
    medium: "Oil on Canvas",
    year: "2023",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=800&auto=format&fit=crop",
    category: "oil",
    available: true,
    featured: true,
    description: "A deep exploration of atmospheric light and shadow, capturing the transient nature of memory.",
  },
  {
    id: "2",
    title: "Convergence",
    price: 950,
    dimensions: "30 x 30 inches",
    medium: "Acrylic and Sand",
    year: "2024",
    image: "https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=800&auto=format&fit=crop",
    category: "mixed-media",
    available: true,
    featured: true,
    description: "A textured piece that bridge the gap between abstract expressionism and physical materials.",
  },
  {
    id: "3",
    title: "Azure Serenity",
    price: 800,
    dimensions: "18 x 24 inches",
    medium: "Oil on Linen",
    year: "2023",
    image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=800&auto=format&fit=crop",
    category: "oil",
    available: false,
    featured: true,
    description: "An evocative study of color fields, focusing on the calming properties of deep blues.",
  },
  {
    id: "4",
    title: "Ephemeral Bloom",
    price: 1500,
    dimensions: "40 x 50 inches",
    medium: "Acrylic on Canvas",
    year: "2024",
    image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=800&auto=format&fit=crop",
    category: "acrylic",
    available: true,
    featured: false,
    description: "Large scale floral abstraction that challenges the boundaries of representative form.",
  },
  {
    id: "5",
    title: "Nocturnal Rhythm",
    price: 1100,
    dimensions: "24 x 24 inches",
    medium: "Oil and Gold Leaf",
    year: "2023",
    image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?q=80&w=800&auto=format&fit=crop",
    category: "mixed-media",
    available: true,
    featured: true,
    description: "Inspired by the movement of night light, this piece uses gold leaf to catch the viewer's eye.",
  },
  {
    id: "6",
    title: "Silent Horizon",
    price: 750,
    dimensions: "16 x 20 inches",
    medium: "Oil on Board",
    year: "2024",
    image: "https://images.unsplash.com/photo-1515402246390-e156f17e8876?q=80&w=800&auto=format&fit=crop",
    category: "oil",
    available: true,
    featured: false,
    description: "A minimalist landscape that invites contemplation and focuses on the vastness of the horizon.",
  }
];

export const artistInfo = {
  name: "Alina",
  bio: "Alina is a contemporary painter whose work explores the intersection of nature and abstract emotion. Based in her light-filled studio, she creates pieces that serve as meditative windows into alternate states of being.",
  education: "BFA in Fine Arts, Royal Academy of Arts",
  philosophy: "I believe art should be a silent conversation between the canvas and the viewer, an invitation to pause in a world that never stops.",
  instagram: "alina.studio",
  whatsapp: "+1234567890"
};
