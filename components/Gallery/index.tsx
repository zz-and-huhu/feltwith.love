"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Masonry from "react-masonry-css";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import SectionTitle from "@/components/Common/SectionTitle";
import { galleryItems, categories, GalleryItem } from "./galleryData";
import "./gallery.css";

const breakpointColumns = {
  default: 3,
  992: 2,
  575: 1,
};

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const filteredItems = useMemo(
    () =>
      activeCategory === "all"
        ? galleryItems
        : galleryItems.filter((item) => item.category.includes(activeCategory)),
    [activeCategory],
  );

  const lightboxSlides = filteredItems.map((item) => ({
    src: item.src,
    width: item.width,
    height: item.height,
    alt: item.alt,
    title: item.description,
  }));

  return (
    <section className="pb-16 pt-4 md:pb-20 lg:pb-28">
      <div className="container">
        <SectionTitle
          title="Gallery"
          paragraph="Every piece is handcrafted with love. Browse my needle felted creations."
          center
          mb="48px"
        />

        {/* Category Filter */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
                activeCategory === cat.key
                  ? "bg-primary text-white shadow-md"
                  : "bg-gray-100 text-body-color hover:bg-primary/10 hover:text-primary dark:bg-gray-800 dark:text-gray-300"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <Masonry
          breakpointCols={breakpointColumns}
          className="masonry-grid"
          columnClassName="masonry-grid-column"
        >
          {filteredItems.map((item, index) => (
            <GalleryCard
              key={item.src}
              item={item}
              onClick={() => setLightboxIndex(index)}
            />
          ))}
        </Masonry>

        {/* Lightbox */}
        <Lightbox
          open={lightboxIndex >= 0}
          index={lightboxIndex}
          close={() => setLightboxIndex(-1)}
          slides={lightboxSlides}
        />
      </div>
    </section>
  );
};

const GalleryCard = ({
  item,
  onClick,
}: {
  item: GalleryItem;
  onClick: () => void;
}) => {
  return (
    <div
      className="group mb-4 cursor-pointer overflow-hidden rounded-lg shadow-sm transition-shadow duration-300 hover:shadow-lg"
      onClick={onClick}
    >
      <div className="relative">
        <Image
          src={item.src}
          alt={item.alt}
          width={item.width}
          height={item.height}
          className="w-full transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 575px) 100vw, (max-width: 992px) 50vw, 33vw"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 translate-y-2 p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <p className="text-sm font-medium leading-snug text-white">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
