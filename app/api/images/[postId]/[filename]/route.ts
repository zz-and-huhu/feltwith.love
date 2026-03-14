import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ postId: string; filename: string }> }
) {
  const { postId, filename } = await params;

  // Validate parameters
  if (!postId || !filename) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // Construct and validate the file path to prevent path traversal
  const imagesDir = path.resolve(process.cwd(), "cache", "images");
  const filePath = path.resolve(imagesDir, postId, filename);

  if (!filePath.startsWith(imagesDir + path.sep)) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  try {
    // Check if the file exists
    await fs.access(filePath);

    // Read the file and serve it
    const file = await fs.readFile(filePath);
    const ext = path.extname(filePath);
    const contentType =
      ext === ".svg" ? "image/svg+xml" : `image/${ext.slice(1)}`;

    return new NextResponse(file, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Error serving image:", error);
    return NextResponse.json({ error: "Image not found" }, { status: 404 });
  }
}
