import Breadcrumb from "@/components/Common/Breadcrumb";
import CustomOrderProductList from "@/components/CustomOrderProductList";

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
