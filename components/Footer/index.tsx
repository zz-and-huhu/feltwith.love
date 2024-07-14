import { FacebookIcon, InstagramIcon } from "@/public/icons/Index";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const FACEBOOK_LINK =
    "https://www.facebook.com/profile.php?id=100094886432302";
  const INSTAGRAM_LINK =
    "https://www.instagram.com/feltwith.love?igsh=NGUwMTZmYTMyZDlk&utm_source=qr";
  return (
    <>
      <footer
        className="wow fadeInUp relative z-10 bg-primary bg-opacity-5 pt-16 md:pt-20 lg:pt-24"
        data-wow-delay=".1s"
      >
        <div className="container">
          <div className="-mx-4 flex justify-between">
            <div className="w-full px-4 md:w-1/2 lg:w-4/12 xl:w-5/12">
              <div className="mb-12 max-w-[360px] lg:mb-16">
                <Link href="/" className="mb-8 inline-block">
                  <Image
                    src="images/logo/logo-2.svg"
                    alt="logo"
                    className="w-full dark:hidden"
                    width={10}
                    height={10}
                  />
                  <Image
                    src="images/logo/logo.svg"
                    alt="logo"
                    className="hidden w-full dark:block"
                    width={10}
                    height={10}
                  />
                </Link>
                <p className="mb-9 text-base font-medium leading-relaxed text-body-color">
                  100% Handmade & Customized Felted Pets to Keep Your Loved Ones
                  Close
                </p>
                <div className="flex h-4 w-4 items-center">
                  <a
                    href={FACEBOOK_LINK}
                    aria-label="facebook-link"
                    className="mr-6 "
                  >
                    <FacebookIcon />
                  </a>
                  <a
                    href={INSTAGRAM_LINK}
                    aria-label="Instagram-link"
                    className="mr-6"
                  >
                    <InstagramIcon />
                  </a>
                </div>
              </div>
            </div>

            <div className="flex w-full justify-end">
              <div className="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-2/12 xl:w-2/12">
                <div className="mb-12 lg:mb-16">
                  <h2 className="mb-10 text-xl font-bold text-black dark:text-white">
                    Support
                  </h2>
                  <ul>
                    <li>
                      <a
                        href="/pricing"
                        className="mb-4 inline-block text-base font-medium text-body-color hover:text-primary"
                      >
                        Pricing
                      </a>
                    </li>
                    <li>
                      <a
                        href="/about"
                        className="mb-4 inline-block text-base font-medium text-body-color hover:text-primary"
                      >
                        About me
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
