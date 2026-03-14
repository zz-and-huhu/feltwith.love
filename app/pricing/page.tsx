import { Metadata } from "next";
import Breadcrumb from "@/components/Common/Breadcrumb";
import CustomOrderProductList from "@/components/CustomOrderProductList";

export const metadata: Metadata = {
  title: "Pricing & Custom Order",
  description:
    "Browse custom needle felted pet options — keychains, framed portraits, and full-body sculptures. 100% handmade, 30–40 days creation time.",
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
      <CustomOrderProductList />
    </>
  );
};

export default PricingPage;
