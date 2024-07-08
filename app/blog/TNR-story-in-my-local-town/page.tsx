"use client";
import { ShareButton } from "@/components/ShareButton/Index";
import Image from "next/image";
import { useEffect, useState } from "react";

const BlogSidebarPage = () => {
  const [path, setPath] = useState("");

  useEffect(() => {
    const url = window.location.href;
    setPath(url);
  }, []);

  return (
    <>
      <section className="overflow-hidden pb-[120px] pt-[180px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4 lg:w-8/12">
              <div>
                <h2 className="mb-8 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight">
                  An Inspiring Story of TNR in my local town
                </h2>

                <div>
                  <p className="mb-10 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                    Over the past three months, the number of stray cats living
                    around our office building has grown from 5 to over 30.
                    During my breaks, I often go downstairs to check on the
                    kittens. One day while feeding them, I witnessed a woman
                    capturing the cats. She told me she would be sending them
                    all to be spayed and neutered. I was familiar with the TNR
                    (Trap-Neuter-Return) concept, but had never helped with it
                    before. I asked her if I could get involved, and that's how
                    I get to know Chen.
                  </p>
                  <div className="mb-10 w-full overflow-hidden rounded">
                    <div className="relative aspect-[97/60] w-full sm:aspect-[97/44]">
                      <Image
                        src="/images/blog/blog-details-01.jpg"
                        alt="The kittens' territory - the lawn in the center of office buildings"
                        fill
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <p className="mt-2">
                      The kittens' territory - the lawn in the center of office
                      buildings
                    </p>
                  </div>
                  <p className="mb-8 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                    Within two weeks, Chen trapped 20 cats and had them
                    sterilized. The males were returned to the garden near the
                    building the next day, while the females typically needed
                    2-3 days to recover at the clinic. In addition to the
                    sterilization costs, some cats also required medical
                    treatment. Though the animal hospital offered discounts for
                    strays, it has been a significant expense for Chen, who
                    initially covered 20,000 RMB (about $3,000 USD) herself
                    before fundraising online, to which I also contributed.
                  </p>
                  <div className="mb-10 w-full overflow-hidden rounded">
                    <div className="relative aspect-[97/60] w-full sm:aspect-[97/44]">
                      <Image
                        src="/images/blog/blog-details-01-melody.jpg"
                        alt="Melody, awaiting her neutering"
                        fill
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <p className="mt-2">Melody, awaiting her neutering</p>
                  </div>
                  <p className="mb-10 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                    Chen shared her fundraising strategies with me. She
                    carefully researches crowdfunding platforms to run
                    successful campaigns. She also started an online group and
                    invites anyone she sees feeding the cats to join. Chen has
                    done a lot of research into effective TNR programs in other
                    areas.
                  </p>
                  <p className="mb-10 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                    Chen works in investment banking and has been trying to get
                    her well-off colleagues involved in TNR. At lunchtime, she
                    sometimes helps her colleagues to clean up their used
                    takeout containers, which she then repurposes as food and
                    water bowls for the stray cats. She says she plans to more
                    formally ask for her colleagues' help in the future, but for
                    now, she hopes this gesture will notice them that she's
                    actively working on something. Chen believes you have to
                    provide a service before you can expect others to join your
                    efforts.
                  </p>
                  <p className="mb-10 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                    I find Chen to be remarkably considerate, patient, and
                    ingenious - the kind of person who can truly make a
                    difference. In these chaotic times, when many feel lost and
                    unsure how to change the world, Chen's efforts are an
                    inspiration.
                  </p>
                  <div className="mb-10 w-full overflow-hidden rounded">
                    <div className="relative aspect-[97/160] w-full sm:aspect-[97/144]">
                      <Image
                        src="/images/blog/blog-details-01-spayed.jpg"
                        alt="The kittens in the image were all spayed/neutered in June 2024."
                        fill
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <p className="mt-2">
                      The kittens in the image were all spayed/neutered in June
                      2024.
                    </p>
                  </div>
                  <p className="mb-10 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                    Through our work, female cats in our community no longer
                    have to endure the stress of repeated pregnancy, and the
                    number of stray cats in our community has been brought under
                    control. By addressing the root cause through sterilization,
                    TNR provides a long-term, sustainable solution that is
                    better for the cats and the neighborhood.
                  </p>

                  <p className="mb-10 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                    Starting today, I will be donating 10% of the revenue from
                    each of my wool felt art pieces sold to support TNR program
                    for the stray cats in my community. By purchasing my wool
                    felt art, you'll be supporting the efforts to improve the
                    lives of those feline residents.
                  </p>

                  <div className="justify-end sm:flex">
                    <div className="mb-5">
                      <h5 className="mb-3 text-sm font-medium text-body-color sm:text-right">
                        Share this post:
                      </h5>
                      <div className="flex items-center sm:justify-end">
                        <ShareButton
                          url={path}
                          quote="An Inspiring Story of TNR in my local town"
                          desc="People are improving the lives of these feline residents and benefiting our neighborhood as a whole."
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogSidebarPage;
