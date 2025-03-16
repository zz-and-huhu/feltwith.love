// app/api/images/[postId]/[filename]/route.ts
import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function GET(
  request: Request,
  { params }: { params: { postId: string; filename: string } }
) {
  const { postId, filename } = await params;

  console.log("--postId", postId, filename);

  // Validate parameters
  if (!postId || !filename) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // Construct the file path
  const filePath = path.join(
    process.cwd(),
    "cache",
    "images",
    postId,
    filename
  );

  console.log("filePath", filePath);

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
