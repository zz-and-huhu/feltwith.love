import Image from "next/image";

const Hero = () => {
  return (
    <>
      <section
        id="home"
        className="bg-red relative z-10 flex-col overflow-hidden pt-[120px] align-middle md:pt-[150px] xl:pt-[180px] 2xl:pt-[210px]"
      >
        <div className="container flex  items-center justify-center">
          <div className="-mx-4 flex flex-wrap items-center">
            <div className="w-full px-4">
              <div
                className="wow fadeInUp mx-auto  max-w-[800px] text-center"
                data-wow-delay=".2s"
              >
                <h1 className="mb-5 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
                  Handmade Felted Pets: A Unique Tribute to Your Furry Friend
                </h1>
                <p className="mb-12 text-base font-medium !leading-relaxed text-body-color dark:text-white dark:opacity-90 sm:text-lg md:text-xl">
                  100% Handmade & Customized Felted Pets to Keep Your Loved Ones
                  Close
                </p>
                <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                  <a
                    href="#pricing"
                    className="rounded-md bg-orange px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-orange/80"
                  >
                    How to Order
                  </a>
                </div>
                <div className="flex justify-end pt-4">
                  <Image
                    src="/images/hero/heroCat.jpg"
                    alt="Custom needle felted orange tabby cat portrait"
                    width={700}
                    height={1000}
                    style={{ objectFit: "cover", objectPosition: "0 100%" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
