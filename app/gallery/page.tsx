import { Metadata } from "next";
import Breadcrumb from "@/components/Common/Breadcrumb";
import Gallery from "@/components/Gallery";
import { galleryItems } from "@/components/Gallery/galleryData";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Browse a collection of handcrafted needle felted creations by Wendy Zhang — framed portraits, keychains, full-body sculptures, and more.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ImageGallery",
  name: "Needle Felted Pet Portrait Gallery",
  description:
    "A collection of handcrafted needle felted pet portraits and sculptures by Wendy Zhang.",
  url: "https://feltwith.love/gallery",
  creator: {
    "@type": "Person",
    name: "Wendy Zhang",
    url: "https://feltwith.love/about",
  },
  image: galleryItems.map((item) => ({
    "@type": "ImageObject",
    contentUrl: `https://feltwith.love${item.src}`,
    name: item.alt,
    description: item.description,
    width: item.width,
    height: item.height,
  })),
};

const GalleryPage = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumb
        items={[
          { name: "Home", href: "/" },
          { name: "Gallery", href: "/gallery" },
        ]}
      />
      <Gallery />
    </>
  );
};

export default GalleryPage;
