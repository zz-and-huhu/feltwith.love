import { Feature } from "@/types/feature";
import Image from "next/image";

const featuresData: Feature[] = [
  {
    id: "customization",
    icon: (
      <Image
        src="/images/features/customized.png"
        alt="customized"
        width={900}
        height={900}
      />
    ),
    title: "Complete Customization",
    paragraph:
      "Got a furry friend at home? Whether it's a cat, dog, bird, rabbit, guinea pig, or any other pet, you can count on us to create a customized masterpiece just for them! Simply send us their photos and trust us to work our magic!",
  },
  {
    id: "handcrafted",
    icon: (
      <Image
        src="/images/features/handcrafted.png"
        alt="customized"
        width={900}
        height={900}
      />
    ),
    title: "Handcrafted Excellence",
    paragraph:
      "Every piece is meticulously handcrafted by me and other fiber artists, ensuring attention to detail and a passion for the art of felting. Each product is a true work of art, made with love and care.",
  },
  {
    id: "eco",
    icon: (
      <Image
        src="/images/features/eco.png"
        alt="customized"
        width={900}
        height={900}
      />
    ),
    title: "Eco-Friendly Practices",
    paragraph:
      "I am committed to sustainability and minimizing the environmental impact. The felting process incorporates eco-friendly techniques and materials.",
  },
  {
    id: "quality",
    icon: (
      <Image
        src="/images/features/quality.png"
        alt="customized"
        width={900}
        height={900}
      />
    ),
    title: "Premium Quality",
    paragraph:
      "I prioritize the highest quality wool as well as meticulously selected components like eyes, noses, and claws. From premium materials to careful sourcing, I ensure exceptional softness, durability, and attention to detail in every aspect of my creations.",
  },
];
export default featuresData;
