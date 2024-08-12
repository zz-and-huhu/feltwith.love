"use client";
import { Testimonial } from "@/types/testimonial";
import SectionTitle from "../Common/SectionTitle";
import SingleTestimonial from "./SingleTestimonial";
import Pagination from "rc-pagination/lib/Pagination";
import { useState } from "react";
import classes from "./Pagination.module.css";

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
  {
    id: 4,
    name: "Sarah W.",
    content:
      "Wendy is responsive and professional, answering my questions and even sending me photos during the crafting. I am very satisfied with the final wool felted Ragdoll frame! It is so cute and I put it in my favorite corner in my house 💙",
    image: "/images/testimonials/author-03.jpg",
    star: 5,
  },
  {
    id: 5,
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
        <div className="w-full">
          <Pagination
            // className="[&>li]:focus:border-primary-500 [&>li]:hover:bg-primary-500 [&>li]:focus:text-primary-500 flex rounded-md border [&>li>a]:hover:text-white [&>li]:px-3 [&>li]:py-2 [&>li]:transition-colors [&>li]:duration-300 [&>li]:hover:cursor-pointer"
            className={classes.pagination}
            current={currentPage}
            pageSize={pageSize}
            total={testimonialData.length}
            onChange={onChange}
            style={{}}
          />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
