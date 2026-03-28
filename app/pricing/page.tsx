import { Metadata } from "next";
import Breadcrumb from "@/components/Common/Breadcrumb";
import CustomOrderProductList from "@/components/CustomOrderProductList";

export const metadata: Metadata = {
  title: "Pricing & Custom Order",
  description:
    "Order a custom felted pet portrait. Choose from framed pet felt art in multiple sizes. 100% handmade, 30 to 40 days creation time.",
  alternates: {
    canonical: "/pricing",
  },
};

const products = [
  {
    "@type": "Product",
    name: "6.5 Inch Framed Needle Felted Pet Portrait",
    description:
      "Custom needle felted pet portrait (~4 inches wide) in a 18cm x 18cm wooden frame. Recommended for cats and small dogs. Includes neck fluff for cats. Ready-to-hang wall art.",
    image: "https://feltwith.love/images/pricing/frame.jpg",
    brand: { "@type": "Brand", name: "Felt With Love" },
    offers: {
      "@type": "Offer",
      url: "https://feltwith.love/pricing",
      priceCurrency: "USD",
      price: "320",
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: "Felt With Love" },
    },
  },
  {
    "@type": "Product",
    name: "8 Inch Framed Needle Felted Pet Portrait",
    description:
      "Custom needle felted pet portrait (~4.5 inches wide) in a 21cm x 25cm wooden frame. Recommended for dogs. Includes full neck fluff details. Ready-to-display cherished keepsake.",
    image: "https://feltwith.love/images/pricing/8-inch-dog.jpg",
    brand: { "@type": "Brand", name: "Felt With Love" },
    offers: {
      "@type": "Offer",
      url: "https://feltwith.love/pricing",
      priceCurrency: "USD",
      price: "360",
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: "Felt With Love" },
    },
  },
];

const jsonLd = products.map((product) => ({
  "@context": "https://schema.org",
  ...product,
}));

const PricingPage = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
