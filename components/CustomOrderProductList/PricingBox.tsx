import Image from "next/image";

const PricingBox = (props: {
  price: string;
  packageName: string;
  img: { src: string; alt: string };
  children: React.ReactNode;
}) => {
  const { price, packageName, img, children } = props;
  const UNIT = " USD";

  return (
    <div className="w-full">
      <div
        className="wow fadeInUp relative z-10 h-full rounded-md bg-white px-8 py-10 shadow-signUp "
        data-wow-delay=".1s"
      >
        <div className="items-center justify-between md:flex">
          <h4 className="mb-2 text-lg font-bold text-dark">{packageName}</h4>
          <h3 className="price mb-2 text-lg font-bold text-black">
            $
            <span className="amount">
              {price}
              {UNIT}
            </span>
          </h3>
        </div>
        <div className="relative mb-4 aspect-[25/34] w-full overflow-hidden rounded-md md:w-full lg:w-full">
          <Image src={img.src} alt={img.alt} fill />
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default PricingBox;
