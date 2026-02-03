import React from "react";
import { readDb } from "@/lib/db";
import HomeClient from "@/components/HomeClient";

// Force dynamic to ensure we always get the latest data from the JSON file
export const dynamic = "force-dynamic";

export default function Home() {
  const data = readDb();
  
  return <HomeClient data={data} />;
}
