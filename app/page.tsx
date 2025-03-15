import AboutMe from "@/components/About/AboutMe";
import ScrollUp from "@/components/Common/ScrollUp";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import CustomOrderProductList from "@/components/CustomOrderProductList";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <>
      <ScrollUp />
      <Hero />
      <CustomOrderProductList />
      <Testimonials />
      <Features />
      <AboutMe />
    </>
  );
}
