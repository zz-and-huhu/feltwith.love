import { Metadata } from "next";
import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch to order your custom needle felted pet portrait. Reach out at wendy@feltwith.love — response within 24 hours.",
  alternates: {
    canonical: "/contact",
  },
};

const ContactPage = () => {
  return (
    <>
      <Breadcrumb
        items={[
          { name: "Home", href: "/" },
          { name: "Contact Page", href: "/contact" },
        ]}
      />

      <section className="container">
        <h1 className="mb-8 text-center font-serif text-3xl font-bold text-dark sm:text-4xl">
          Get in Touch
        </h1>
      </section>

      <Contact />
    </>
  );
};

export default ContactPage;
