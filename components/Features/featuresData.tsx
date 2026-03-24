import { Feature } from "@/types/feature";
import Image from "next/image";

const featuresData: Feature[] = [
  {
    id: "customization",
    icon: (
      <Image
        src="/images/features/customized.png"
        alt="The process of me creating a customized needle felted cat"
        width={1500}
        height={1500}
      />
    ),
    title: "Complete customization",
    paragraph:
      "Cats are definitely my specialty - they're the pets I create the most. But I'm happy to take on other furry friends too, like dogs, birds, rabbits, guinea pigs, and more... No matter the species, I'll take the time to carefully blend together all the right materials and colors of wool, using different techniques to make sure the final piece really captures the look and personality of your beloved pet. Just send me some good photos, and leave the rest to me! I'll work my magic to bring your furry friend to life.",
  },
  {
    id: "handcrafted",
    icon: (
      <Image
        src="/images/features/handcrafted.png"
        alt="needle felted pet is more than ornaments. They are memories."
        width={900}
        height={900}
      />
    ),
    title: "Handcrafted excellence, and more than ornaments",
    paragraph:
      "Each and every piece I create is handmade by me with meticulous attention to detail. I pour my heart and soul into this craft, making sure every needle-felted creation is a true labor of love. A lot of my customers come to me after the loss of a beloved pet. They share the most heartwarming stories about their furry friends, and I know the piece I'm making for them holds deep meaning. It's not just a decoration - it's a cherished keepsake.",
  },
  {
    id: "eco",
    icon: (
      <Image
        src="/images/features/eco.png"
        alt="Eco-Friendly practices in needle felting"
        width={900}
        height={900}
      />
    ),
    title: "Eco-Friendly practices",
    paragraph:
      "I am committed to sustainability and minimizing the environmental impact. The felting process incorporates eco-friendly techniques and materials.",
  },
  {
    id: "quality",
    icon: (
      <Image
        src="/images/features/quality.png"
        alt="Premium quality wool and materials used in needle felted pet portraits"
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
