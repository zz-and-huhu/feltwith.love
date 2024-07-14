"use client";
import SectionTitle from "../Common/SectionTitle";
import OfferList from "./OfferList";
import PricingBox from "./PricingBox";

const Pricing = () => {
  const orderSteps = [
    <p>
      📧 Get in touch with me directly! To place an order, simply send me an
      email at{" "}
      <a
        style={{ color: "blue", fontWeight: 600 }}
        href="mailto:wendy@feltwith.love"
      >
        wendy@feltwith.love
      </a>
      , and I guarantee a response within 24 hours.
    </p>,
    "📷 I'd love to see many photos of your beloved pet from different angles - front, side, top, the more the better. These photos are crucial for me to really capture your pet's unique personality and likeness in the finished piece.",
    "🐈‍⬛ I'll be sure to share photos of the completed artwork with you before shipping, so you can approve it. And if you'd like me to make any adjustments, just let me know.",
    "✈️ Each piece typically takes 20-40 days to complete (excluding modifications) and will be shipped in about 10 working days thereafter. Just a heads up that pets with more complicated color patterns take me extra time to get just right. I really appreciate your patience!",
    "💅 Please note that all my works are 100% hand-made for you. If you have specific requests, such as adding accessories like hats or charms, or adding your pet's distinctive markings, please let me know, and I'll be happy to accommodate them. As each handmade product is unique, I'm unable to support returns or exchanges after shipping.",
    "🎁 A needle-felted creation makes a truly heartfelt gift. Whether it's for a birthday, anniversary, or special occasion, I can create a memorable piece that will be cherished for years to come. I'd be happy to include gift wrapping or a personalized note if you need that as well. Just let me know how I can make this the perfect present.",
  ];

  const keyChainFeature = [
    "Size of face: about 3 inches in width and height",
    "Can be used as Key chains, Wedding lapel pin, Ornaments, etc",
  ];
  const frameFeature = [
    "Size of face: about 4 inches in width and height",
    "Size of frame: about 6 inches in width and height.",
    "The finished product is ready to hang on the wall to be special memories",
  ];
  const bodyFeature = [
    "Size of face: about 2.5 inches",
    "To make transportation safe and convenient, I will use an enamel cup. The inner diameter of the cup is 4 inches. If you would like to use your own cup, please let me know the size.",
  ];

  const menu = [
    // {
    //   packageName: "Portrait Key-chain or Pin",
    //   price: "260-300",
    //   img: {
    //     src: "/images/pricing/key-chain.jpg",
    //     alt: "felted key chain of your pet",
    //   },
    //   children: keyChainFeature.map((v, index) => (
    //     <OfferList key={index} text={v} status="active" />
    //   )),
    // },
    {
      packageName: "3D Framed Portrait",
      price: "320-360",
      img: {
        src: "/images/pricing/frame.jpg",
        alt: "framed portrait of felted pet",
      },
      children: frameFeature.map((v, index) => (
        <OfferList key={index} text={v} status="active" />
      )),
    },
    {
      packageName: "The Cup Cat",
      price: "400-420",
      img: {
        src: "/images/pricing/cup-cat.jpg",
        alt: "cup cat sculpture of felted pet",
      },
      children: bodyFeature.map((v, index) => (
        <OfferList key={index} text={v} status="active" />
      )),
    },
  ];

  return (
    <section
      id="pricing"
      className="relative z-10 bg-primary/[.03] py-16 md:py-20 lg:py-28"
    >
      <div className="container">
        <SectionTitle
          title="Products for choices 🛍️"
          center
          width="665px"
          mb="40px"
          paragraph="100% customized, and please note if you have any special requirements"
        />

        <div className="mb-20 grid grid-cols-1 gap-x-10 gap-y-10 px-20 md:grid-cols-1 lg:grid-cols-2">
          {menu.map((v) => (
            <PricingBox
              key={v.packageName}
              img={v.img}
              packageName={v.packageName}
              price={v.price}
            >
              {v.children}
            </PricingBox>
          ))}
        </div>

        <SectionTitle title="How to Order" center width="665px" mb="40px" />
        <div className="mt-12 px-0 md:px-16 lg:px-24">
          <ul className="text-gray-700 ml-8 text-base">
            {orderSteps.map((v, index) => (
              <li
                key={index}
                className="mb-5 text-lg leading-relaxed first-letter:text-4xl "
              >
                {v}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
