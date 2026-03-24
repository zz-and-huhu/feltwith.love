import { Metadata } from "next";
import { Lora, Nunito } from "next/font/google";
import { Providers } from "./providers";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import Analytics from "./Analytics";
import "node_modules/react-modal-video/css/modal-video.css";
import "../styles/index.css";

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

const siteUrl = "https://feltwith.love";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Customized Needle Felted Pets to Honor Your Beloved Ones",
    template: "%s | Felt With Love",
  },
  description:
    "Needle felted custom wool animal portrait, key-chain or sculpture. 100% handmade. Best Choice of gifts or for memories.",
  icons: {
    icon: { url: "/images/favicon.svg", type: "image/svg+xml" },
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    siteName: "Felt With Love",
    locale: "en_US",
    url: siteUrl,
    title: "Customized Needle Felted Pets to Honor Your Beloved Ones",
    description:
      "Needle felted custom wool animal portrait, key-chain or sculpture. 100% handmade. Best Choice of gifts or for memories.",
    images: [
      {
        url: "/images/hero/heroCat.jpg",
        width: 1200,
        height: 630,
        alt: "Customized needle felted pet portrait by Felt With Love",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Customized Needle Felted Pets to Honor Your Beloved Ones",
    description:
      "Needle felted custom wool animal portrait, key-chain or sculpture. 100% handmade. Best Choice of gifts or for memories.",
    images: ["/images/hero/heroCat.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={`${lora.variable} ${nunito.variable}`}
    >
      <head />
      <body>
        <Analytics />
        <Providers>
          <Header />
          {children}
          <Footer />
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  );
}
