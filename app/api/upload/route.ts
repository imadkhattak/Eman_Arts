import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ success: false, error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save to public/artworks
    const uploadDir = join(process.cwd(), "public", "artworks");
    
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (e) {
      // Directory might already exist
    }

    const filename = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
    const path = join(uploadDir, filename);
    await writeFile(path, buffer);

    return NextResponse.json({ 
      success: true, 
      imageUrl: `/artworks/${filename}` 
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ success: false, error: "Upload failed" }, { status: 500 });
  }
}
