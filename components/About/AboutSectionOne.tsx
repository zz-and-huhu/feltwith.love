import Image from "next/image";
import SectionTitle from "../Common/SectionTitle";

const title = "I'M WENDY ZHANG";

const selfIntro =
  "Hi, i am Wendy Zhang, a full time needle felting artist, mother of two. \n As a woman in her mid-forties, I never thought I would discover a new passion in life. But five years ago, I stumbled upon the art of needle felting and my life has been changed. \n At first, it was just a hobby. I would spend hours creating little felt animals and experimenting with different techniques. But soon, I found my daughter loves my work and even sleep with a felted sheep. And my friends and family started to take notice of my creations and began placing orders for their own custom pieces. \n It wasn't long before I realized that I could turn my newfound passion into a career. I started selling my needle felted creations at local craft fairs and online, and the response was overwhelming. People loved the unique and whimsical designs that I created, and I loved the satisfaction of bringing joy to others through my art. \n Now, five years later, I am proud to say that I am a full-time needle felting artist. I pour my heart and soul into every creation, carefully crafting each piece by hand with the utmost care and attention to detail. \n If you're looking for a truly one-of-a-kind gift or decoration for your home, I invite you to explore my collection of needle felted creations. From cute key-chains or framed portraits to cuddly Whole body product, there's something for everyone in my shop. \n Thank you for considering supporting my art and allowing me to continue doing what I love every day.";

const AboutSectionOne = () => {
  return (
    <section id="about" className="pt-16 md:pt-20 lg:pt-28">
      <div className="container">
        <div className="border-b border-body-color/[.15] pb-16 dark:border-white/[.15] md:pb-20 lg:pb-28">
          <div className="-mx-4 flex flex-wrap items-center">
            <div className="w-full px-4 lg:w-1/2">
              <SectionTitle title={title} paragraph="" mb="44px" />
              <p className="mb-5 flex items-center text-lg text-body-color">
                {selfIntro}
              </p>
            </div>

            <div className="w-full px-4 lg:w-1/2">
              <div
                className="wow fadeInUp relative mx-auto aspect-[25/24] max-w-[500px] lg:mr-0"
                data-wow-delay=".2s"
              >
                <Image
                  src="/images/about/about-image.jpg"
                  alt="about-image"
                  fill
                  className="mx-auto max-w-full lg:mr-0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionOne;
