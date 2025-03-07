import * as dotenv from "dotenv";
dotenv.config();

import { Hono } from "hono";
import { cors } from "hono/cors";
import { S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import {
  CreateUserRequest,
  AddImageRequest,
  PresignedUrlResponse,
} from "../types/api";
import type { Env } from "../types/cloudflare";

// 环境变量配置
const BUCKET_NAME = "feltwithlove-images";
const ACCOUNT_ID = "014e6956352c8e83626380197e087594";

const app = new Hono<{ Bindings: Env }>();

// 启用 CORS
app.use(
  cors({
    origin: [
      "https://feltwith.love",
      "http://localhost:3000",
      "http://127.0.0.1:3000",
    ],
    allowMethods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// 创建 S3 客户端
const S3 = new S3Client({
  region: "auto",
  endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
  },
});

// API 路由
app.post("/api/users", async (c) => {
  const data = await c.req.json<CreateUserRequest>();
  const userid = uuidv4();
  console.log("create userid", userid);
  const now = new Date().toISOString();

  try {
    await c.env.DB.prepare(
      `
      INSERT INTO users (userid, name, email, comment, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `
    )
      .bind(userid, data.name, data.email, data.comment || null, now, now)
      .run();

    return c.json({ userid });
  } catch (error) {
    console.error("Error creating user:", error);
    return c.json({ error: "Failed to create user" }, 500);
  }
});

// 获取用户信息
app.get("/api/users/:userid", async (c) => {
  console.log("get userid", c.req.param("userid"));
  const userid = c.req.param("userid");

  try {
    const user = await c.env.DB.prepare(
      `
      SELECT u.*, json_group_array(
        json_object(
          'filename', i.filename,
          'url', i.url,
          'uploadedAt', i.uploaded_at
        )
      ) as images
      FROM users u
      LEFT JOIN images i ON u.userid = i.userid
      WHERE u.userid = ?
      GROUP BY u.userid
    `
    )
      .bind(userid)
      .first();

    if (!user) {
      return c.json({ error: "User not found" }, 404);
    }

    return c.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return c.json({ error: "Failed to fetch user" }, 500);
  }
});

// 修改上传图片的处理逻辑
app.post("/api/upload-url", async (c) => {
  const { filename, contentType, userid } = await c.req.json();

  // 验证用户是否存在
  const user = await c.env.DB.prepare("SELECT * FROM users WHERE userid = ?")
    .bind(userid)
    .first();

  if (!user) {
    return c.json({ error: "User not found" }, 404);
  }

  const key = `${Date.now()}-${filename}`;
  console.log("Generated key:", key);

  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    ContentType: contentType,
  });

  try {
    const url = await getSignedUrl(S3, command, { expiresIn: 3600 });

    // 记录图片信息到数据库
    await c.env.DB.prepare(
      `
      INSERT INTO images (userid, filename, url, uploaded_at)
      VALUES (?, ?, ?, ?)
    `
    )
      .bind(userid, filename, url, new Date().toISOString())
      .run();

    const response: PresignedUrlResponse = { url, key };
    return c.json(response);
  } catch (error) {
    console.error("Error:", error);
    return c.json({ error: "Failed to process upload" }, 500);
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

// 导出 Worker
export default {
  fetch: app.fetch,
};
