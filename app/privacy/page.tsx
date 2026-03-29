import { Metadata } from "next";
import Breadcrumb from "@/components/Common/Breadcrumb";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Felt With Love — how we collect, use, and protect your personal information.",
  alternates: {
    canonical: "/privacy",
  },
};

const PrivacyPage = () => {
  return (
    <>
      <Breadcrumb
        items={[
          { name: "Home", href: "/" },
          { name: "Privacy Policy", href: "/privacy" },
        ]}
      />
      <section className="pb-16 pt-8">
        <div className="container">
          <div className="mx-auto max-w-3xl text-base leading-relaxed text-body-color">
            <h2 className="mb-4 text-2xl font-bold text-black dark:text-white">
              Information We Collect
            </h2>
            <p className="mb-3">
              When you place a custom order or contact us, we may collect:
            </p>
            <ul className="mb-8 list-disc space-y-1 pl-6">
              <li>Your name and email address</li>
              <li>Photos of your pet (used solely to create your custom piece)</li>
              <li>Payment information (processed securely through Stripe)</li>
              <li>Shipping address</li>
            </ul>

            <h2 className="mb-4 text-2xl font-bold text-black dark:text-white">
              How We Use Your Information
            </h2>
            <ul className="mb-8 list-disc space-y-1 pl-6">
              <li>To fulfill and deliver your custom order</li>
              <li>To communicate with you about your order</li>
              <li>To improve our website and services</li>
            </ul>

            <h2 className="mb-4 text-2xl font-bold text-black dark:text-white">
              Analytics
            </h2>
            <p className="mb-8">
              We use Google Analytics to understand how visitors interact with
              our website. This service may collect information such as your IP
              address, browser type, pages visited, and time spent on the site.
              This data is aggregated and anonymous — it does not personally
              identify you.
            </p>

            <h2 className="mb-4 text-2xl font-bold text-black dark:text-white">
              Third-Party Services
            </h2>
            <p className="mb-3">We use the following third-party services:</p>
            <ul className="mb-8 list-disc space-y-1 pl-6">
              <li>
                <strong>Stripe</strong> — for secure payment processing. Your
                payment details are handled directly by Stripe and are never
                stored on our servers.
              </li>
              <li>
                <strong>Google Analytics</strong> — for website usage analytics.
              </li>
            </ul>

            <h2 className="mb-4 text-2xl font-bold text-black dark:text-white">
              Data Sharing
            </h2>
            <p className="mb-8">
              We do not sell, trade, or share your personal information with
              third parties, except as necessary to fulfill your order (e.g.,
              shipping carriers) or as required by law.
            </p>

            <h2 className="mb-4 text-2xl font-bold text-black dark:text-white">
              Your Rights
            </h2>
            <p className="mb-8">
              You may request to access, update, or delete your personal data at
              any time by contacting us at{" "}
              <a
                href="mailto:feltwith.love@gmail.com"
                className="text-primary underline"
              >
                feltwith.love@gmail.com
              </a>
              .
            </p>

            <h2 className="mb-4 text-2xl font-bold text-black dark:text-white">
              Changes to This Policy
            </h2>
            <p className="mb-8">
              We may update this Privacy Policy from time to time. Any changes
              will be posted on this page.
            </p>

            <p className="text-sm text-body-color/60">
              Last updated: March 2026
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default PrivacyPage;
