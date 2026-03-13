import { Metadata } from "next";
import { Providers } from "./providers";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import Analytics from "./Analytics";
import "node_modules/react-modal-video/css/modal-video.css";
import "../styles/index.css";

export const metadata: Metadata = {
  title: "Customized Needle Felted Pets to Honor Your Beloved Ones",
  description:
    "Needle felted custom wool animal portrait, key-chain or sculpture. 100% handmade. Best Choice of gifts or for memories.",
  icons: {
    icon: { url: "/images/favicon.svg", type: "image/svg+xml" },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        {/* stripe buy button. More info: https://docs.stripe.com/payment-links/buy-button?client=react */}
        <script async src="https://js.stripe.com/v3/buy-button.js"></script>
      </head>
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
