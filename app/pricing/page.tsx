import { Metadata } from "next";
import Breadcrumb from "@/components/Common/Breadcrumb";
import CustomOrderProductList from "@/components/CustomOrderProductList";

export const metadata: Metadata = {
  title: "Pricing & Custom Order",
  description:
    "Browse custom needle felted pet options — keychains, framed portraits, and full-body sculptures. 100% handmade, 30–40 days creation time.",
  alternates: {
    canonical: "/pricing",
  },
};

const PricingPage = () => {
  return (
    <>
      <Breadcrumb
        items={[
          { name: "Home", href: "/" },
          { name: "Custom Order", href: "/pricing" },
        ]}
      />
      <section className="container">
        <h1 className="mb-8 text-center font-serif text-3xl font-bold text-dark sm:text-4xl">
          Custom Needle Felted Pet Pricing
        </h1>
      </section>
      <CustomOrderProductList />
    </>
  );
};

export default PricingPage;
