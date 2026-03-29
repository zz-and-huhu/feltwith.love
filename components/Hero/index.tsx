import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative flex h-screen items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <Image
        src="/images/hero/hero-bg.jpg"
        alt="Needle felted black cat portrait in frame — handcrafted by Felt With Love"
        fill
        priority
        className="object-cover"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="absolute bottom-10 left-0 right-0 z-10 mx-auto max-w-3xl px-4 text-center sm:bottom-20">
        <h1 className="mb-3 font-serif text-2xl font-light tracking-wide text-white drop-shadow-lg sm:mb-4 sm:text-5xl md:text-6xl">
          Every Stitch Tells Their Story
        </h1>
        <p className="mb-8 text-base font-light tracking-widest uppercase text-white [text-shadow:_0_1px_8px_rgba(0,0,0,0.8)] sm:text-lg md:text-xl">
          Handcrafted Needle Felted Pet Portraits
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/gallery"
            className="border border-white px-8 py-3 text-sm tracking-widest uppercase text-white transition-all duration-300 hover:bg-white hover:text-black"
          >
            View Gallery
          </Link>
          <Link
            href="/pricing"
            className="bg-white px-8 py-3 text-sm tracking-widest uppercase text-black transition-all duration-300 hover:bg-white/90"
          >
            Order Yours
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          className="h-6 w-6 text-white/60"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19 14l-7 7m0 0l-7-7"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
