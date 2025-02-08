"use client";

import React, { useState } from "react";
import Uppy from "@uppy/core";
import { Dashboard } from "@uppy/react";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import Breadcrumb from "@/components/Common/Breadcrumb";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001";

const UploadPage = () => {
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);

  const uppy = new Uppy({
    restrictions: { maxNumberOfFiles: 10, minNumberOfFiles: 1 },
  });

  // 使用预签名 URL 上传
  uppy.on("upload", async (data) => {
    const files = uppy.getFiles();
    console.log("files to upload:", files);

    try {
      for (const file of files) {
        // 获取预签名 URL
        const response = await fetch(`${API_BASE_URL}/api/upload-url`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            filename: file.name,
            contentType: file.type,
          }),
        });

        const { url, key } = await response.json();
        console.log("Presigned URL:", url);

        // 使用预签名 URL 上传文件
        const uploadResponse = await fetch(url, {
          method: "PUT",
          body: file.data,
          headers: {
            "Content-Type": file.type,
          },
        });

        if (!uploadResponse.ok) {
          const errorText = await uploadResponse.text();
          console.error("Upload failed:", {
            status: uploadResponse.status,
            statusText: uploadResponse.statusText,
            error: errorText,
          });
          throw new Error(
            `Upload failed: ${uploadResponse.status} ${errorText}`
          );
        }

        // 保存文件信息
        setUploadedFiles((prev) => [...prev, { id: key, name: file.name }]);

        // 通知 Uppy 上传成功
        uppy.emit("upload-success", file, {
          status: 200,
          body: { key },
          uploadURL: url,
        });
      }
    } catch (error) {
      console.error("Upload error:", error);
      // 通知 Uppy 上传失败
      uppy.emit("upload-error", files[0], error);
    }
  });

  return (
    <>
      <Breadcrumb pageName="Upload" />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-gray-800 text-2xl font-bold dark:text-white">
            上传图片
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            请上传至少3张不同角度的照片（正面、侧面、背面）
          </p>
        </div>
        <Dashboard uppy={uppy} />
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {uploadedFiles.map((file) => (
            <div
              key={file.id}
              className="border-gray-200 dark:border-gray-700 overflow-hidden rounded-lg border p-2"
            >
              <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
                {file.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default UploadPage;
