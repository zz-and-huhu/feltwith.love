import fs from "fs/promises";
import * as path from "path";
import sizeOf from "image-size";

/**
 * 根据文件头的 Magic Number 获取图片文件的扩展名
 * @param buffer - 文件的 Buffer
 * @returns 图片文件的扩展名（如 'png', 'jpg'），如果无法识别则返回 null
 */
function getImageFileExtension(buffer: Buffer): string | null {
  // 读取文件头的前 8 个字节
  const header = buffer.subarray(0, 8).toString("hex");

  // 根据文件头判断文件类型
  if (header.startsWith("89504e470d0a1a0a")) {
    return "png"; // PNG 文件
  } else if (header.startsWith("ffd8ffe0") || header.startsWith("ffd8ffe1")) {
    return "jpg"; // JPEG 文件
  } else if (header.startsWith("47494638")) {
    return "gif"; // GIF 文件
  } else if (header.startsWith("424d")) {
    return "bmp"; // BMP 文件
  } else if (header.startsWith("49492a00") || header.startsWith("4d4d002a")) {
    return "tiff"; // TIFF 文件
  } else if (
    header.startsWith("52494646") &&
    buffer.subarray(8, 12).toString("hex") === "57454250"
  ) {
    return "webp"; // WebP 文件
  } else if (header.startsWith("3c737667")) {
    return "svg"; // SVG 文件（以 '<svg' 开头）
  } else if (header.startsWith("00000100")) {
    return "ico"; // ICO 文件
  } else {
    return null; // 无法识别的文件类型
  }
}

async function fetchWithRetry(url: string, retry: number = 3) {
  while (retry > 0) {
    try {
      const response = await fetch(url);
      return response;
    } catch (error) {
      console.error(`Error fetching image: ${url}: ${error}`);
      retry--;
    }
  }
}

export async function downloadImage(
  url: string,
  postId: string,
  imageIdx: number,
  dir: string
) {
  const response = await fetchWithRetry(url);
  console.log("--resp", response);
  if (response && response.ok) {
    console.log("--response && response.ok", response && response.ok);
    // Read the response as an ArrayBuffer
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const byteArray = new Uint8Array(buffer);
    // Get image dimensions
    const { width, height } = sizeOf(byteArray);
    console.log("--width, height", width, height);
    // Generate the filename and save path
    const filename = `${width}x${height}-${imageIdx}.${getImageFileExtension(
      buffer
    )}`;
    const destDir = path.join(dir, "images", postId);
    await fs.mkdir(destDir, { recursive: true });
    const savePath = path.join(destDir, filename);

    // Save the file
    await fs.writeFile(savePath, byteArray);
    return path.join("images", postId, filename);
  }
  return null;
}
