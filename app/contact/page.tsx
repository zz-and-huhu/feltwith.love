import { Metadata } from "next";
import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch to order your custom needle felted pet portrait. Reach out at wendy@feltwith.love — response within 24 hours.",
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

      <Contact />
    </>
  );
};

export default ContactPage;
