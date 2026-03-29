import { FacebookIcon, InstagramIcon } from "@/public/icons/Index";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const FACEBOOK_LINK =
    "https://www.facebook.com/profile.php?id=100094886432302";
  const INSTAGRAM_LINK =
    "https://www.instagram.com/feltwith.love?igsh=NGUwMTZmYTMyZDlk&utm_source=qr";
  return (
    <footer
      className="wow fadeInUp relative z-10 bg-gray-100 py-10 md:py-12"
      data-wow-delay=".1s"
    >
      <div className="container">
        <div className="flex flex-col items-center gap-6 md:flex-row md:items-start md:justify-between">
          {/* Left: Logo + tagline + socials */}
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" className="mb-3 inline-block">
              <Image
                src="/images/logo/logo-2.svg"
                alt="Felt With Love — custom needle felted pet portraits"
                className="dark:hidden"
                width={100}
                height={100}
              />
              <Image
                src="/images/logo/logo.svg"
                alt="Felt With Love — custom needle felted pet portraits"
                className="hidden dark:block"
                width={100}
                height={100}
              />
            </Link>
            <p className="mb-4 max-w-[300px] text-center text-sm font-medium leading-relaxed text-body-color md:text-left">
              100% Handmade & Customized Felted Pets to Keep Your Loved Ones
              Close
            </p>
            <div className="flex items-center gap-4">
              <a href={FACEBOOK_LINK} aria-label="facebook-link">
                <FacebookIcon />
              </a>
              <a href={INSTAGRAM_LINK} aria-label="Instagram-link">
                <InstagramIcon />
              </a>
            </div>
          </div>

          {/* Right: Links */}
          <div className="flex gap-12 text-center md:text-left">
            <div>
              <h2 className="mb-4 text-lg font-bold text-black dark:text-white">
                Explore
              </h2>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/pricing"
                    className="text-sm font-medium text-body-color hover:text-primary"
                  >
                    Custom Order
                  </a>
                </li>
                <li>
                  <a
                    href="/about"
                    className="text-sm font-medium text-body-color hover:text-primary"
                  >
                    About Me
                  </a>
                </li>
                <li>
                  <a
                    href="/blog"
                    className="text-sm font-medium text-body-color hover:text-primary"
                  >
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-4 text-lg font-bold text-black dark:text-white">
                Legal
              </h2>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/privacy"
                    className="text-sm font-medium text-body-color hover:text-primary"
                  >
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
