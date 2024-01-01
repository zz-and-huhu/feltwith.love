"use client";
import SectionTitle from "../Common/SectionTitle";
import OfferList from "./OfferList";
import PricingBox from "./PricingBox";

const Pricing = () => {
  const orderSteps = [
    "📧 Get in touch with me directly! To place an order, simply send me an email at <a href='mailto:your-email@example.com'>your-email@example.com</a>, and I guarantee a response within 12 hours.",
    "📷 To order, please provide lots of photos of your beloved pet from different angles (front, side, top). These photos serve as the foundation for my craftsmanship and enable me to capture your pet's unique personality.",
    "🐈‍⬛ I will share photos of the finished piece for your approval before shipping. I won't proceed until I have your consent. I'm happy to make any necessary adjustments until you're completely satisfied.",
    "✈️ Each piece typically takes 20-30 days to complete (excluding modifications) and will be shipped in about 10 days thereafter. Thank you for your patience during this process.",
    "💅 Please note that all my works are 100% custom-made for you. If you have specific requests, such as adding accessories like hats or charms, or adding your pet's distinctive markings, please let me know, and I'll be happy to accommodate them. As each handmade product is unique, I'm unable to support returns or exchanges.",
    "🎁 A needle-felted creation makes a truly heartfelt gift. Whether it's for a birthday, anniversary, or special occasion, I can create a memorable piece that will be cherished for years to come.  Let me know if you require gift wrapping or a personalized note to accompany your order.",
  ];

  const keyChainFeature = [
    "Size of face: about 3 inches in width and 6 inches in height",
    "Can be used as Key chains, Wedding lapel pin, Ornaments, etc",
  ];
  const frameFeature = [
    "The frame measures approximately 7 * 7 inches",
    "The finished product is ready to hang on the wall to make adorable decors",
  ];
  const bodyFeature = [
    "Size about half a palm 🤲 incredibly cute",
    "I can handle any posture of your fuzz baby, just send me pictures!",
  ];

  const menu = [
    {
      packageName: "Portrait Key-chain or Pin",
      price: "200",
      subtitle: "Lorem ipsum dolor sit amet adiscing elit Mauris egestas enim.",
      children: keyChainFeature.map((v, index) => (
        <OfferList key={index} text={v} status="active" />
      )),
    },
    {
      packageName: "Framed Portrait",
      price: "260",
      subtitle: "Lorem ipsum dolor sit amet adiscing elit Mauris egestas enim.",
      children: frameFeature.map((v, index) => (
        <OfferList key={index} text={v} status="active" />
      )),
    },
    {
      packageName: "Full Body Sculpture",
      price: "220",
      subtitle: "Lorem ipsum dolor sit amet adiscing elit Mauris egestas enim.",
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
          title="How to Order & Pricing Plan"
          center
          width="665px"
        />

        <div className="mb-12 px-0 md:px-16 lg:px-24">
          <ul className="text-gray-700 ml-8 text-base">
            {orderSteps.map((v, index) => (
              <li
                key={index}
                className="mb-4 text-xl leading-relaxed first-letter:text-5xl"
              >
                {v}
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-1 lg:grid-cols-3">
          {menu.map((v) => (
            <PricingBox
              key={v.packageName}
              packageName={v.packageName}
              price={v.price}
              subtitle={v.subtitle}
            >
              {v.children}
            </PricingBox>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
