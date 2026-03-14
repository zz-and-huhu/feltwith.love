"use client";
import Script from "next/script";
import SectionTitle from "../Common/SectionTitle";
import OfferList from "./OfferList";
import PricingBox from "./PricingBox";

const CustomOrderProductList = () => {
  const otherSteps = [
    {
      title: "1. Share Photos of Your Pet",
      content: [
        <span key="email">
          📧 Email:{" "}
          <a
            href="mailto:wendy@feltwith.love"
            style={{ color: "blue", fontWeight: 600, textDecoration: "none" }}
          >
            wendy@feltwith.love
          </a>{" "}
          (I'll respond within 24 hours!)
        </span>,
        <span key="google-photos">
          Or, sharing a{" "}
          <a
            href="https://photos.google.com/albums"
            style={{ color: "blue", fontWeight: 600, textDecoration: "none" }}
          >
            Google Photos album
          </a>{" "}
          to me would also be amazing!
        </span>,
        "📷 Photo Tips:",
        "Share multiple angles (front, side, top—the more, the better!) to help me capture their quirks.",
        "Pick one main photo for pose/expression and one for fur color (lighting can play tricks—natural light works best!).",
      ],
    },
    {
      title: "2. Your Approval Matters",
      content: [
        "🐾 I'll send progress photos for your feedback. This is your piece, and I want it to feel perfect. Need adjustments? Just say the word!",
      ],
    },
    {
      title: "3. Timeline",
      content: [
        "⏳ Creation: 30–40 days (longer for intricate patterns—I'll keep you updated!).",
        "✈️ Shipping: 10–25 business days after approval.",
      ],
    },
    {
      title: "4. Handmade with Love",
      content: [
        "✨ Custom Requests? Scarf, charms, unique markings? Absolutely! Let's make it personal.",
        "🚫 No Returns/Exchanges: Each piece is one-of-a-kind, crafted just for you.",
      ],
    },
    {
      title: "5. Gift It!",
      content: [
        "🎁 Add gift wrapping (+$10) or a handwritten note (free!) on eco-friendly stationery. Tell me their story—I'll make it extra special.",
      ],
    },
  ];

  const sixInchFrameFeatures = [
    "Recommend for cats and small dogs",
    "Portrait size: ~4 inches wide (10 cm)",
    'Wooden frame: 18cm x 18cm (7" x 7")',
    "Includes neck fluff for cats (may exclude for larger dogs)",
    "Ready-to-hang wall art for lasting memories 🖼️✨",
  ];

  const eightInchFrameFeatures = [
    "Recommend for dogs",
    "Portrait size: ~4.5 inches wide (11.5 cm)",
    'Wooden frame: 21cm x 25cm (8.3" x 10")',
    "Includes full neck fluff details",
    "Ready-to-display cherished keepsake 🐾",
  ];

  const legsOutFrameFeatures = [
    'Frame size: 21cm x 25cm (8.3" x 10")',
    "Cat portraits only 🐈⬛",
    "Please provide a clear photo of your cat sitting/lying down to capture paw positions",
  ];

  const mugFeatures = [
    "Portrait size: ~2.5 inches (6.5 cm)",
    "For cats and small dogs only",
    'Fits standard mugs (4"/10cm inner diameter)',
    "Bring-your-own-mug option available (share dimensions!) ☕",
    "Food-safe sealed finish",
  ];

  const keychainFeatures = [
    "Portrait size: ~3 inches (7.5 cm) square",
    "Versatile use: keychains, lapel pins, bag charms 🔑💍",
    "Lightweight and durable felted design",
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
      packageName: "6.5 Inch Framed Portraits",
      price: "320",
      img: {
        src: "/images/pricing/frame.jpg",
        alt: "framed portrait of felted pet",
      },
      children: [
        ...sixInchFrameFeatures.map((v, index) => (
          <OfferList key={index} text={v} status="active" />
        )),
        <div key="stripe-button">
          {/* @ts-ignore */}
          <stripe-buy-button
            buy-button-id="buy_btn_1R0MP3Bjv1GVbVIwjXUwPBDy"
            publishable-key="pk_live_51NXln5Bjv1GVbVIw6Ouy2u7Ml5RmLW88JyjkyccgpOv1N79WTTjXz5X4v4cE75pDDAqUj25HTiCBcBeh9f63L3Lj00qpP3rmok"
          />
        </div>,
        //i want to add google analytics event listener to the stripe button
      ],
    },
    {
      packageName: "8 Inch Framed Portraits",
      price: "360",
      img: {
        src: "/images/pricing/8-inch-dog.jpg",
        alt: "framed portrait of felted pet",
      },
      children: [
        ...eightInchFrameFeatures.map((v, index) => (
          <OfferList key={index} text={v} status="active" />
        )),
        <div key="stripe-button">
          {/* @ts-ignore */}
          <stripe-buy-button
            buy-button-id="buy_btn_1QzvjQBjv1GVbVIwgmCx2fJE"
            publishable-key="pk_live_51NXln5Bjv1GVbVIw6Ouy2u7Ml5RmLW88JyjkyccgpOv1N79WTTjXz5X4v4cE75pDDAqUj25HTiCBcBeh9f63L3Lj00qpP3rmok"
          />
        </div>,
      ],
    },
    // {
    //   packageName: "'Legs Out' Cat Portraits (Playful & Unique!)",
    //   price: "430",
    //   img: {
    //     src: "/images/pricing/frame.jpg",
    //     alt: "framed portrait of felted pet",
    //   },
    //   children: legsOutFrameFeature.map((v, index) => (
    //     <OfferList key={index} text={v} status="active" />
    //   )),
    // },
    // {
    //   packageName: "Pet in a Mug (Cats & Small Dogs)",
    //   price: "430",
    //   img: {
    //     src: "/images/pricing/cup-cat.jpg",
    //     alt: "cup cat sculpture of felted pet",
    //   },
    //   children: mugFeature.map((v, index) => (
    //     <OfferList key={index} text={v} status="active" />
    //   )),
    // },
    // {
    //   packageName: "Key-chain or Pin",
    //   price: "300",
    //   img: {
    //     src: "/images/pricing/cup-cat.jpg",
    //     alt: "cup cat sculpture of felted pet",
    //   },
    //   children: keyChainFeature.map((v, index) => (
    //     <OfferList key={index} text={v} status="active" />
    //   )),
    // },
  ];

  return (
    <section
      id="pricing"
      className="relative z-10 bg-primary/[.03] py-16 md:py-20 lg:py-28"
    >
      <Script
        src="https://js.stripe.com/v3/buy-button.js"
        strategy="lazyOnload"
      />
      <div className="container">
        <SectionTitle
          title="Styles for choices 🛍️"
          center
          width="665px"
          mb="40px"
          paragraph="100% customized, and please note if you have any special requirements"
        />

        <div className="mb-20 grid grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-1 lg:grid-cols-2 lg:px-20">
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

        <SectionTitle
          title="After Your Purchase 💌"
          center
          width="665px"
          mb="40px"
        />
        <div className="mt-12 px-0 md:px-16 lg:px-24">
          {otherSteps.map((step, index) => (
            <div key={index} className="step-container">
              <h3 className="mb-4 text-lg font-bold">{step.title}</h3>
              <div>
                {step.content.map((item, i) => (
                  <p className="text-gray-700 mb-4 text-base" key={i}>
                    {item}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomOrderProductList;
