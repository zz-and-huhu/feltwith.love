"use client";

import React, { useState, useEffect } from "react";
import Uppy from "@uppy/core";
import { Dashboard } from "@uppy/react";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import Breadcrumb from "@/components/Common/Breadcrumb";
import {
  PresignedUrlResponse,
  UploadedFile,
  UserData,
  CreateUserRequest,
} from "@/types/api";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001";

const UploadPage = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [formData, setFormData] = useState<CreateUserRequest>({
    name: "",
    email: "",
    comment: "",
  });

  // 初始化 Uppy
  const uppy = new Uppy({
    restrictions: { maxNumberOfFiles: 10, minNumberOfFiles: 1 },
  });

  // 页面加载时检查是否有已存储的用户ID
  useEffect(() => {
    const storedUserId = localStorage.getItem("userid");
    console.log("storedUserId", storedUserId);
    if (storedUserId) {
      fetchUserData(storedUserId);
    }
  }, []);

  const fetchUserData = async (userid: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/${userid}`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch user data");
      }
      setUserData(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      localStorage.removeItem("userid"); // 清除无效的 userid
    }
  };

  // 配置上传处理逻辑
  uppy.on("upload", async (data) => {
    const userid = localStorage.getItem("userid");
    console.log("userid", userid);
    if (!userid) {
      throw new Error("Please save your profile first");
    }

    const files = uppy.getFiles();
    try {
      for (const file of files) {
        const response = await fetch(`${API_BASE_URL}/api/upload-url`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            filename: file.name,
            contentType: file.type,
            userid,
          }),
        });

        const res = (await response.json()) as PresignedUrlResponse;

        if ("error" in res) {
          throw new Error(res.error);
        }

        const { url, key } = res;

        const uploadResponse = await fetch(url, {
          method: "PUT",
          body: file.data,
          headers: {
            "Content-Type": file.type,
          },
        });

        if (!uploadResponse.ok) {
          const errorText = await uploadResponse.text();
          throw new Error(
            `Upload failed: ${uploadResponse.status} ${errorText}`
          );
        }

        // 上传成功后刷新用户数据以显示新图片
        await fetchUserData(userid);

        uppy.emit("upload-success", file, {
          status: 200,
          body: { key } as any,
          uploadURL: url,
        });
      }
    } catch (error) {
      console.error("Upload error:", error);
      uppy.emit("upload-error", files[0], error);
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("formData", formData);
    try {
      console.log("Sending request to:", `${API_BASE_URL}/api/users`);
      const response = await fetch(`${API_BASE_URL}/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("response data", data);
      if (!response.ok) {
        throw new Error(data.error || "Failed to create user");
      }

      if (data.userid) {
        localStorage.setItem("userid", data.userid);
        await fetchUserData(data.userid);
      }
    } catch (error) {
      console.error("Error creating user:", error, API_BASE_URL);
    }
  };

  return (
    <>
      <Breadcrumb pageName="Upload" />
      <div className="container mx-auto px-4 py-8">
        {!userData ? (
          <div className="mb-8">
            <h2 className="mb-6 text-2xl font-bold">创建个人资料</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    姓名 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="请输入姓名"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    required
                    className="focus:border-blue-500 w-full rounded border p-2 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    邮箱 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="请输入邮箱"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    required
                    className="focus:border-blue-500 w-full rounded border p-2 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">备注</label>
                  <textarea
                    placeholder="添加备注信息（可选）"
                    value={formData.comment}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        comment: e.target.value,
                      }))
                    }
                    className="focus:border-blue-500 w-full rounded border p-2 focus:outline-none"
                    rows={3}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 rounded px-6 py-2 text-black
               focus:outline-none"
              >
                保存资料
              </button>
            </form>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">上传图片</h3>
              <Dashboard uppy={uppy} />
            </div>
          </div>
        ) : (
          <div className="mb-8">
            <div className="mb-6">
              <h2 className="mb-2 text-2xl font-bold">
                Hi, {userData.name}
              </h2>
              <p className="text-gray-600">{userData.email}</p>
              {userData.comment && (
                <p className="text-gray-600 mt-2">{userData.comment}</p>
              )}
            </div>

            <div className="mt-8">
              <h3 className="mb-4 text-xl font-medium">已上传的图片</h3>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {/* {userData?.images?.map((image) => (
                  <div key={image.url} className="rounded border p-2">
                    <img
                      src={image.url}
                      alt={image.filename}
                      className="aspect-square w-full object-cover"
                    />
                    <p className="text-gray-600 mt-2 truncate text-sm">
                      {image.filename}
                    </p>
                    <p className="text-gray-500 text-xs">
                      {new Date(image.uploadedAt).toLocaleDateString()}
                    </p>
                  </div>
                ))} */}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UploadPage;
