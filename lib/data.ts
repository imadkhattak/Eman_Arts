// This file now serves as a client-side bridge.
// For static generation, we still need initial data.
// In the future, this could be replaced by an API fetch in a useEffect or Server Components.

import storeData from '../data/store.json';

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

export const artworks: Artwork[] = storeData.artworks as Artwork[];

export const artistInfo = storeData.artistInfo;
