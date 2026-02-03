import React from "react";
import { readDb } from "@/lib/db";
import ArtistClient from "@/components/ArtistClient";

export const dynamic = "force-dynamic";

export default function ArtistPage() {
  const data = readDb();
  
  return <ArtistClient data={data} />;
}
