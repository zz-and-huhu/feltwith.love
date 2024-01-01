const PricingBox = (props: {
  price: string;
  packageName: string;
  subtitle: string;
  children: React.ReactNode;
}) => {
  const { price, packageName, subtitle, children } = props;

  return (
    <div className="w-full">
      <div
        className="wow fadeInUp relative z-10 h-full rounded-md bg-white px-8 py-10 shadow-signUp "
        data-wow-delay=".1s"
      >
        <div className="flex items-center justify-between">
          <h4 className="mb-2 text-xl font-bold text-dark">{packageName}</h4>
          <h3 className="price mb-2 text-3xl font-bold text-black">
            $<span className="amount">{price}</span>
          </h3>
        </div>
        <p className="mb-7 text-base text-body-color">{subtitle}</p>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default PricingBox;
