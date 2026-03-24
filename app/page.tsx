import AboutMe from "@/components/About/AboutMe";
import ScrollUp from "@/components/Common/ScrollUp";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import CustomOrderProductList from "@/components/CustomOrderProductList";
import Testimonials from "@/components/Testimonials";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Felt With Love",
  url: "https://feltwith.love",
  logo: "https://feltwith.love/images/logo/logo.svg",
  image: "https://feltwith.love/images/hero/heroCat.jpg",
  description:
    "Needle felted custom wool animal portrait, key-chain or sculpture. 100% handmade. Best Choice of gifts or for memories.",
  email: "wendy@feltwith.love",
  sameAs: [
    "https://www.facebook.com/profile.php?id=100094886432302",
    "https://www.instagram.com/feltwith.love",
  ],
  priceRange: "$$",
  makesOffer: {
    "@type": "Offer",
    itemOffered: {
      "@type": "Product",
      name: "Custom Needle Felted Pet Portrait",
      description:
        "Handmade needle felted wool pet portrait, customized from your photo.",
    },
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ScrollUp />
      <Hero />
      <CustomOrderProductList />
      <Testimonials />
      <Features />
      <AboutMe />
    </>
  );
}
