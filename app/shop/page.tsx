import React from "react";
import { readDb } from "@/lib/db";
import ShopClient from "@/components/ShopClient";

export const dynamic = "force-dynamic";

export default function ShopPage() {
  const data = readDb();
  
  return <ShopClient data={data} />;
}
