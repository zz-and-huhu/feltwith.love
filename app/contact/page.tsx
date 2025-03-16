import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";

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
