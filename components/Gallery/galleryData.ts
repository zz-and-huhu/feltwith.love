export type GalleryItem = {
  src: string;
  alt: string;
  description: string;
  category: string[];
  width: number;
  height: number;
};

export const categories = [
  { key: "all", label: "All" },
  { key: "framed", label: "Framed Portrait" },
  { key: "working-process", label: "Working Process" },
  { key: "cat", label: "Cat" },
  { key: "dog", label: "Dog" },
  { key: "other", label: "Other" },
];

// Add your gallery items here.
// Images go in public/images/gallery/
export const galleryItems: GalleryItem[] = [
  {
    src: "/images/gallery/black-cat-framed-portrait.jpg",
    alt: "Black cat framed portrait",
    description:
      "A lifelike black cat portrait in a wooden frame, with paws reaching out over the edge.",
    category: ["framed", "cat"],
    width: 900,
    height: 1200,
  },
  {
    src: "/images/gallery/black-cat-framed-with-reference.jpg",
    alt: "Black cat framed portrait with reference photo",
    description:
      "Side-by-side comparison — the finished needle felted black cat portrait next to the original photo.",
    category: ["framed", "cat"],
    width: 1200,
    height: 675,
  },
  {
    src: "/images/gallery/black-cat-paw-detail.jpg",
    alt: "Black cat paw detail close-up",
    description:
      "Close-up of the tiny felted claws and paw pads — every detail handcrafted with care.",
    category: ["framed", "cat"],
    width: 900,
    height: 1200,
  },
  {
    src: "/images/gallery/white-pomeranian-framed-with-reference.jpg",
    alt: "White Pomeranian framed portrait with reference photo",
    description:
      "A fluffy white Pomeranian portrait alongside the reference photo — can you tell which is real?",
    category: ["framed", "dog"],
    width: 900,
    height: 1200,
  },
  {
    src: "/images/gallery/white-pomeranian-framed-portrait.jpg",
    alt: "White Pomeranian framed portrait",
    description:
      "Framed needle felted white Pomeranian with soft, cloud-like fur texture.",
    category: ["framed", "dog"],
    width: 900,
    height: 1200,
  },
  {
    src: "/images/gallery/needling-white-cat-head.jpg",
    alt: "Needling a white cat head",
    description:
      "Sculpting a white cat face with a felting needle — shaping the features one poke at a time.",
    category: ["working-process", "cat"],
    width: 901,
    height: 1200,
  },
  {
    src: "/images/gallery/white-cat-head-early-stage.jpg",
    alt: "White cat head in early stage",
    description:
      "Early stage of a white cat portrait — the basic shape formed with one glass eye set in place.",
    category: ["working-process", "cat"],
    width: 901,
    height: 1200,
  },
  {
    src: "/images/gallery/white-cat-head-with-needle.jpg",
    alt: "White cat head with felting needle",
    description:
      "A white cat head taking shape on the felting pad, pink nose and expressive eyes already in place.",
    category: ["working-process", "cat"],
    width: 900,
    height: 1200,
  },
  {
    src: "/images/gallery/gray-cat-adding-fur.jpg",
    alt: "Gray cat work in progress — adding fur",
    description:
      "Adding layers of gray wool to build up the fur texture, with felting tools at the ready.",
    category: ["working-process", "cat"],
    width: 901,
    height: 1200,
  },
  {
    src: "/images/gallery/white-chihuahua-framed-portrait.jpg",
    alt: "White Chihuahua framed portrait",
    description:
      "A sweet white Chihuahua with big pink ears, captured in a cream-colored wooden frame.",
    category: ["framed", "dog"],
    width: 901,
    height: 1200,
  },
  {
    src: "/images/gallery/white-bichon-framed-portrait.jpg",
    alt: "White Bichon Frise framed portrait",
    description:
      "A fluffy white Bichon Frise with round, cloud-like fur in a natural wood frame — held in hand to show its compact size.",
    category: ["framed", "dog"],
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/gallery/brown-poodle-framed-portrait.jpg",
    alt: "Brown poodle framed portrait",
    description:
      "A warm brown poodle with soft, curly fur framed in natural wood — those round eyes are hard to resist.",
    category: ["framed", "dog"],
    width: 1200,
    height: 1200,
  },
  {
    src: "/images/gallery/cat-looking-at-golden-retriever-portrait.jpg",
    alt: "Cat looking at golden retriever framed portrait",
    description:
      "A curious tabby cat inspecting a needle felted golden retriever portrait — even the cat is impressed!",
    category: ["framed", "dog"],
    width: 901,
    height: 1200,
  },
  {
    src: "/images/gallery/gray-cat-with-sunflower-outdoor.jpg",
    alt: "Gray cat with sunflower portrait outdoors",
    description:
      "A gray British Shorthair holding a sunflower, photographed outdoors in golden afternoon light.",
    category: ["framed", "cat"],
    width: 900,
    height: 1200,
  },
  {
    src: "/images/gallery/cockapoo-framed-with-cat.jpg",
    alt: "Cockapoo framed portrait with cat",
    description:
      "A cream cockapoo wearing a plaid scarf in a dark frame, with a real cat sitting beside it for scale.",
    category: ["framed", "dog"],
    width: 1200,
    height: 1151,
  },
  {
    src: "/images/gallery/tabby-cat-framed-with-reference.jpg",
    alt: "Tabby cat framed portrait with reference photo",
    description:
      "Side-by-side comparison — a tabby-and-white cat portrait next to the original photo on a laptop screen.",
    category: ["framed", "cat"],
    width: 901,
    height: 1200,
  },
  {
    src: "/images/gallery/two-tabby-cats-framed-pair.jpg",
    alt: "Two tabby cats framed portrait pair",
    description:
      "A matching pair of tabby-and-white cat portraits — one on white felt, one on blue — with reference photos behind them.",
    category: ["framed", "cat"],
    width: 901,
    height: 1200,
  },
  {
    src: "/images/gallery/chihuahua-and-golden-retriever-display.jpg",
    alt: "Chihuahua and golden retriever portraits on display",
    description:
      "Two framed portraits — a white Chihuahua and a golden retriever — displayed side by side on an elegant mantelpiece.",
    category: ["framed", "dog"],
    width: 901,
    height: 1200,
  },
  {
    src: "/images/gallery/golden-retriever-framed-portrait.jpg",
    alt: "Golden retriever framed portrait",
    description:
      "A happy golden retriever with tongue out, captured in a cream-colored wooden frame with incredible fur detail.",
    category: ["framed", "dog"],
    width: 901,
    height: 1200,
  },
  {
    src: "/images/gallery/golden-retriever-with-reference.jpg",
    alt: "Golden retriever portrait with reference photo",
    description:
      "The felted golden retriever face next to the original phone photo — the resemblance is uncanny.",
    category: ["working-process", "dog"],
    width: 1200,
    height: 1126,
  },
  {
    src: "/images/gallery/gray-white-cat-blue-frame-with-reference.jpg",
    alt: "Gray and white cat in blue frame with reference",
    description:
      "A gray-and-white cat on vivid blue felt background, with the reference photo displayed on a laptop.",
    category: ["framed", "cat"],
    width: 901,
    height: 1200,
  },
  {
    src: "/images/gallery/gray-cat-with-sunflower-and-reference.jpg",
    alt: "Gray cat with sunflower and reference photo",
    description:
      "A gray British Shorthair holding a sunflower, shown alongside the reference photo on a tablet — with felting tools visible in the background.",
    category: ["framed", "cat"],
    width: 900,
    height: 1200,
  },
  {
    src: "/images/gallery/gray-cat-sunflower-with-reference.jpg",
    alt: "Gray cat sunflower portrait with reference",
    description:
      "Another angle of the gray cat and sunflower portrait, with the original photo on screen for comparison.",
    category: ["framed", "cat"],
    width: 901,
    height: 1200,
  },
  {
    src: "/images/gallery/chihuahua-and-golden-framed-with-reference.jpg",
    alt: "Chihuahua and golden retriever portraits with reference photos",
    description:
      "The Chihuahua and golden retriever portrait pair held up against a laptop showing the original pet photos.",
    category: ["framed", "dog"],
    width: 901,
    height: 1200,
  },
  {
    src: "/images/gallery/cockapoo-framed-with-reference.jpg",
    alt: "Cockapoo framed portrait with reference photos",
    description:
      "A cream cockapoo in a plaid scarf, framed in dark wood — reference photos on screen show the real pup.",
    category: ["framed", "dog"],
    width: 901,
    height: 1200,
  },
  {
    src: "/images/gallery/cockapoo-scarf-closeup.jpg",
    alt: "Cockapoo scarf portrait close-up",
    description:
      "Close-up of the cockapoo portrait — every strand of curly fur and the tiny plaid scarf handcrafted with love.",
    category: ["framed", "dog"],
    width: 901,
    height: 1200,
  },
];
