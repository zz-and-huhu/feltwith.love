"use client";
import React, { useState } from "react";
import NextImage from "next/image";
import { renderText } from "./Text";
import { getPlainFromRich, ImageProp } from "@/app/lib/notion/utils";

// Reusable Image Container Component
const ImageContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="overflow_-hidden relative  w-full rounded-lg">{children}</div>
);

// Reusable Image Component (for both NextImage and standard img)
const ResponsiveImage = ({
  src,
  alt,
  isNextImage = false,
}: {
  src: string;
  alt: string;
  isNextImage?: boolean;
}) => {
  const match = src.match(/(\d+)x(\d+)-/);
  const [useFallback, setUseFallback] = useState(false);

  const onError = (e) => {
    console.log(
      `Failed to load image: ${src}, falling back to /api${src}. Error:`,
      e
    );
    setUseFallback(true);
  };

  if (isNextImage && match) {
    const width = parseInt(match[1], 10); // 提取宽度
    const height = parseInt(match[2], 10); // 提取高度
    return (
      <NextImage
        src={useFallback ? `/api${src}` : src}
        alt={alt}
        width={width}
        height={height}
        onError={onError}
        className="transition-transform duration-300 hover:scale-105"
      />
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={useFallback ? `/api${src}` : src}
      alt={alt}
      onError={onError}
      className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
    />
  );
};

// Main Image Component
export default function Image({
  image,
  className = "my-6",
}: {
  image: ImageProp;
  className?: string;
}) {
  const alt = image.caption ? getPlainFromRich(image.caption) : "";

  let imageElement: React.ReactNode;
  if (image.type === "file") {
    imageElement = (
      <ImageContainer>
        <ResponsiveImage
          src={
            image.file.expiry_time === "never"
              ? `/${image.file.url}`
              : image.file.url
          }
          alt={alt}
          isNextImage
        />
      </ImageContainer>
    );
  } else if (image.type === "external") {
    imageElement = (
      <ImageContainer>
        <ResponsiveImage src={image.external.url} alt={alt} />
      </ImageContainer>
    );
  } else {
    console.warn("Unsupported image type:", image);
    return null;
  }

  return (
    <figure className={className}>
      {imageElement}
      <figcaption className="text-gray-600 mt-2 text-center text-sm italic">
        {image.caption && renderText(image.caption)}
      </figcaption>
    </figure>
  );
}
