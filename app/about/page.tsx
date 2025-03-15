import AboutMe from "@/components/About/AboutMe";
import Breadcrumb from "@/components/Common/Breadcrumb";

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
