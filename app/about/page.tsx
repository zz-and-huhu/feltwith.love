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

const AboutPage = () => {
  return (
    <>
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
