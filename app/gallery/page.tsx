import { Metadata } from "next";
import Breadcrumb from "@/components/Common/Breadcrumb";
import Gallery from "@/components/Gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Browse a collection of handcrafted needle felted creations by Wendy Zhang — framed portraits, keychains, full-body sculptures, and more.",
};

const GalleryPage = () => {
  return (
    <>
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
