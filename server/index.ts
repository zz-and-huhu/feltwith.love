import * as dotenv from "dotenv";
dotenv.config();

import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";

// 环境变量配置
const BUCKET_NAME = "feltwithlove-images";
const ACCOUNT_ID = "014e6956352c8e83626380197e087594";

// 添加环境变量检查
if (!process.env.R2_ACCESS_KEY_ID || !process.env.R2_SECRET_ACCESS_KEY) {
  throw new Error("Missing required R2 credentials in environment variables");
}

// 创建 S3 客户端
const S3 = new S3Client({
  region: "auto",
  endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

const app = new Hono();

// 启用 CORS
app.use(
  cors({
    origin: ['https://feltwith.love', 'http://localhost:3000'],
    allowMethods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// 获取预签名上传 URL
app.post("/api/upload-url", async (c) => {
  console.log("Received upload request");
  const { filename, contentType } = await c.req.json();
  console.log("File info:", { filename, contentType });
  const key = `${Date.now()}-${filename}`;
  console.log("Generated key:", key);

  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    ContentType: contentType,
  });

  try {
    const url = await getSignedUrl(S3, command, { expiresIn: 3600 });
    console.log("Generated presigned URL with credentials:", {
      accessKeyId: process.env.R2_ACCESS_KEY_ID?.slice(0, 5) + "...",
      bucket: BUCKET_NAME,
      key: key,
    });
    return c.json({ url, key });
  } catch (error) {
    console.error("Error generating signed URL:", error);
    return c.json({ error: "Failed to generate upload URL" }, 500);
  }
});

// 获取图片 URL
app.get("/api/images/:key", async (c) => {
  const key = c.req.param("key");
  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  });

  try {
    const url = await getSignedUrl(S3, command, { expiresIn: 3600 });
    return c.json({ url });
  } catch (error) {
    console.error("Error generating signed URL:", error);
    return c.json({ error: "Failed to generate image URL" }, 500);
  }
});

// 启动服务器
serve({
  fetch: app.fetch,
  port: 3001,
});

// 部署命令
export default app;
