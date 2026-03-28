import { Metadata } from "next";
import AboutMe from "@/components/About/AboutMe";
import Breadcrumb from "@/components/Common/Breadcrumb";

export const metadata: Metadata = {
  title: "About Me",
  description:
    "Meet Wendy Zhang, a full-time needle felting artist based in Shanghai. Every piece is handmade with love and meticulous attention to detail.",
  alternates: {
    canonical: "/about",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Wendy Zhang",
  url: "https://feltwith.love/about",
  image: "https://feltwith.love/images/about/about-image.jpg",
  jobTitle: "Needle Felting Artist",
  description:
    "Full-time needle felting artist based in Shanghai, creating custom handmade wool pet portraits and sculptures.",
  worksFor: {
    "@type": "Organization",
    name: "Felt With Love",
    url: "https://feltwith.love",
  },
  sameAs: [
    "https://www.instagram.com/feltwith.love",
    "https://www.facebook.com/profile.php?id=100094886432302",
  ],
};

const AboutPage = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumb
        items={[
          { name: "Home", href: "/" },
          { name: "About Me", href: "/about" },
        ]}
      />
      <AboutMe />
    </>
  );
};

export default AboutPage;
