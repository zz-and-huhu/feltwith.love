import { Testimonial } from "@/types/testimonial";
import SectionTitle from "../Common/SectionTitle";
import SingleTestimonial from "./SingleTestimonial";

const testimonialData: Testimonial[] = [
  {
    id: 1,
    name: "Helen D.",
    content:
      "Love love love!!! Wendy skillfully captured the characteristics of my Luna. When I opened the package, I thought Luna was back because it feels so vivid 😭 The attention to detail is so lifelike, it's worth the wait!",
    image: "/images/testimonials/author-01.jpg",
    star: 5,
  },
  {
    id: 2,
    name: "Lucas N.",
    content:
      "My friend's little dog recently passed away, and she has been struggling to come to terms with the loss. So, I bought a portrait frame and a felted ornament as a memorial. My friend was moved to tears when received. Thank you Wendy, for bringing warmth to my friend.",
    image: "/images/testimonials/author-02.jpg",
    star: 5,
  },
  {
    id: 3,
    name: "Sarah W.",
    content:
      "Wendy is responsive and professional, answering my questions and even sending me photos during the crafting. I am very satisfied with the final wool felted Ragdoll frame! It is so cute and I put it in my favorite corner in my house 💙",
    image: "/images/testimonials/author-03.jpg",
    star: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="relative z-10 py-16 md:py-20 lg:py-28">
      <div className="container">
        <SectionTitle
          title="What My Customers Say"
          paragraph="I am looking forward to hearing from you!"
          center
        />

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {testimonialData.map((testimonial) => (
            <SingleTestimonial key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
