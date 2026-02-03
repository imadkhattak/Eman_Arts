import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data', 'store.json');

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

export type ArtistInfo = {
  name: string;
  bio: string;
  education: string;
  philosophy: string;
  instagram: string;
  whatsapp: string;
  profileImage: string;
  backgroundImage: string;
};

export type Order = {
  id: string;
  customerName: string;
  customerEmail: string;
  items: { id: string; title: string; price: number; quantity: number }[];
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  orderHistory: string[]; // Order IDs
};

export type StoreData = {
  artworks: Artwork[];
  artistInfo: ArtistInfo;
  orders: Order[];
  customers: Customer[];
};

export function readDb(): StoreData {
  try {
    const data = fs.readFileSync(DB_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading DB:', error);
    return { artworks: [], artistInfo: {} as ArtistInfo, orders: [], customers: [] };
  }
}

export function writeDb(data: StoreData) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing DB:', error);
  }
}
