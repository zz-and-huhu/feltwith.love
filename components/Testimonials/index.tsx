"use client";
import { Testimonial } from "@/types/testimonial";
import SectionTitle from "../Common/SectionTitle";
import SingleTestimonial from "./SingleTestimonial";
import Pagination from "rc-pagination/lib/Pagination";
import { useState } from "react";
import classes from "./Pagination.module.css";
import { LeftArrowIcon, RightArrowIcon } from "@/public/icons/Index";

const testimonialData: Testimonial[] = [
  {
    id: "Adam F.",
    name: "Adam F.",
    content:
      "I'm still in awe at how beautiful this piece came out and how much it really looks like Simba. Wendy really captured Simba and I'm amazed how realistic and beautiful it is. Thank you Wendy. You really put your heart into it. Keep doing what you love and I wish you much success.",
    image: "/images/testimonials/adam-f.jpg",
    star: 5,
  },
  {
    id: "Sophie L.",
    name: "Sophie L.",
    content:
      "This is the most beautiful work i have ever seen. I am so amazed at how much detail and how life like the portrait is! It really means a lot to me to see my baby Ollie and touch him again. Thank you so much Wendy.",
    image: "/images/testimonials/author-04.jpg",
    star: 5,
  },
  {
    id: "Helen D.",
    name: "Helen D.",
    content:
      "Love love love!!! Wendy skillfully captured the characteristics of my Luna. When I opened the package, I thought Luna was back because it feels so vivid 😭 The attention to detail is so lifelike, it's worth the wait!",
    image: "/images/testimonials/author-01.jpg",
    star: 5,
  },
  {
    id: "Lucas N.",
    name: "Lucas N.",
    content:
      "My friend's little dog recently passed away, and she has been struggling to come to terms with the loss. So, I bought a portrait frame and a felted ornament as a memorial. My friend was moved to tears when received. Thank you Wendy, for bringing warmth to my friend.",
    image: "/images/testimonials/author-02.jpg",
    star: 5,
  },
  {
    id: "Sarah W.",
    name: "Sarah W.",
    content:
      "Wendy is responsive and professional, answering my questions and even sending me photos during the crafting. I am very satisfied with the final wool felted Ragdoll frame! It is so cute and I put it in my favorite corner in my house 💙",
    image: "/images/testimonials/author-03.jpg",
    star: 5,
  },
];

const Testimonials = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);

  const paginatedData = testimonialData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const onChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  return (
    <section className="relative z-10 py-16 md:py-20 lg:py-28">
      <div className="container">
        <SectionTitle title="Recent pieces of works" paragraph="" center />

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {paginatedData.map((testimonial) => (
            <SingleTestimonial key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
        <div className="mt-4 w-full">
          <Pagination
            className={classes.pagination}
            current={currentPage}
            defaultCurrent={1}
            pageSize={pageSize}
            total={testimonialData.length}
            onChange={onChange}
            prevIcon={<LeftArrowIcon />}
            nextIcon={<RightArrowIcon />}
          />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
