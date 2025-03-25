// components/CusdisComments.tsx
"use client"; // 必须添加在文件顶部
import { ReactCusdis } from "react-cusdis";

export default function CusdisComments({
  attrs,
}: {
  attrs: {
    host: string;
    appId: string;
    pageId: string;
    pageTitle: string;
    pageUrl: string;
  };
}) {
  return <ReactCusdis attrs={attrs} />;
}
